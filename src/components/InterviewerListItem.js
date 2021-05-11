import "components/InterviewerListItem.scss";
import React from "react";
var classnames = require('classnames/dedupe');

export default function InterviewerListItem(props) {
  let { id, name, avatar, selected, setInterviewer } = props;

  const InterviewerItemClass = classnames("interviewers__item", {
    "interviewers__item--selected": selected,
  });
  let liName = "";
  if (selected) {
    liName = name;
  }

  return (
    <li className={InterviewerItemClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      <span className={InterviewerItemClass}>
        {liName}
      </span>
    </li>
  );
}
