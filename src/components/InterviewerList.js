import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import React from "react";
import PropTypes from 'prop-types';

function InterviewerList(props) {
  const interviewersList = props.interviewers.map((mapInterviewer) => {
    return (
      <InterviewerListItem
        key={mapInterviewer.id}
        id={mapInterviewer.id}
        name={mapInterviewer.name}
        avatar={mapInterviewer.avatar}
        selected={mapInterviewer.id === props.value}
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
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
export default InterviewerList