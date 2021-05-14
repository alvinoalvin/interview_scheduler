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
  let { time, interview, onEdit, onDelete } = props;
  let content;

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );


  return (
    <article className="appointment">
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
            interviewers={[]}
            onSave
            onCancel={() => transition(EMPTY)}
          />
        )
      }
    </article>
  );
}