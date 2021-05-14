import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import React from "react";
import { useVisualMode } from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW"
const CREATE = "CREATE"


export default function Appointment(props) {
  let { key, id, time, interview, onEdit, onDelete, interviewers, bookInterview } = props;
  let content;

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    console.log("bloop");
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview).then(() => transition(EMPTY));
  }
  console.log("interviewObj: ", interview)
  return (
    <article className="appointment"
    >
      <Header time={time} />
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {
        mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )
      }{
        mode === CREATE && (
          <Form
            name={props.name}
            value={props.value}
            interviewers={interviewers}
            onSave={interview && save(interview.student.name, interview.interviewer)}
            onCancel={() => transition(EMPTY)}
          />
        )
      }
    </article>
  );
}