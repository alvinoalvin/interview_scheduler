import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import React from "react";

export default function InterviewerList(props) {
  let { value, interviewers, interviewer, setInterviewer } = props;

  const interviewersList = interviewers.map((mapInterviewer) => {
    return (
      <InterviewerListItem
        id={mapInterviewer.id}
        name={mapInterviewer.name}
        avatar={mapInterviewer.avatar}
        selected={mapInterviewer.id === value}
        setInterviewer={(event) => props.onChange(mapInterviewer.id)}
      />)
  })

  return (
    <section className="interviewers" >
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">
        {interviewersList}
      </ul>
    </section>


  );
}