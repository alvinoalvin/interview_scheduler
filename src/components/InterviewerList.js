import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import React from "react";

export default function InterviewerList(props) {
  let { interviewers, interviewer, setInterviewer } = props;

  const interviewersList = interviewers.map((mapInterviewer) => {
    return (
      <InterviewerListItem
        id={mapInterviewer.id}
        name={mapInterviewer.name}
        avatar={mapInterviewer.avatar}
        selected={mapInterviewer.id === interviewer}
        setInterviewer={mapInterviewer.setInterviewer}
      />)
  })

  return (
    <section className="interviewers" onclick={() => setInterviewer(interviewer)}>
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">
        {interviewersList}
      </ul>
    </section>


  );
}