import "components/InterviewerListItem.scss";
import React from "react";
const classnames = require('classnames/dedupe');

export default function InterviewerListItem(props) {
  let { name, avatar, selected, setInterviewer } = props;

  const InterviewerItemClass = classnames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  const imgItemClass = classnames("interviewers__item-image", {
    "interviewers__item--selected-image": selected,
  });

  return (
    <li className={InterviewerItemClass} onClick={setInterviewer}>
      <img
        className={imgItemClass}
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}
