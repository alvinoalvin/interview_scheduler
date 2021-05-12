import "components/Appointment/index";
import React from "react";
var classnames = require('classnames/dedupe');

export default function Appointment(props) {
  let { id, name, avatar, selected, setInterviewer } = props;

  const AppointmentClass = classnames("appointment", {
    "appointment--selected": selected,
  });

  return (
    <article className="appointment"></article>
  );
}