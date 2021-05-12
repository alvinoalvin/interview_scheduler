import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import React, { useState } from "react";
import "components/Appointment/styles.scss";

var classnames = require('classnames/dedupe');

export default function Appointment(props) {
  let { time, interview, student, interviewer, onEdit, onDelete } = props;

  let content;
  if (interviewer) {
    content = <Show student={student} interviewer={interviewer} onEdit={onEdit} onDelete={onDelete} />
  }
  else {
    content = <Empty />
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {content}
    </article>
  );
}