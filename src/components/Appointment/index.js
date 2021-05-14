import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import React from "react";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW"

export default function Appointment(props) {
  let { time, student, interview, onEdit, onDelete } = props;
  let content;

  useVisualMode(SHOW)
  if (!interview) {
    content = <Empty />
  }
  else {
    content = <Show student={interview.student} interviewer={interview.interviewer} onEdit={onEdit} onDelete={onDelete} />
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {content}
    </article>
  );
}