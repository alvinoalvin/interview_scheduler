import "components/Appointment/Header";
import React from "react";
var classnames = require('classnames/dedupe');

export default function Header(props) {
  let { time } = props;

  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{time}</h4>
      <hr className="appointment__separator" />
    </header>

  );
}