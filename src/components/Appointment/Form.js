import React, { useState } from 'react'
import "components/Appointment/styles.scss";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import { getInterviewer } from "helpers/selectors";

export default function Form(props) {
  let { interviewers, onSave, onCancel } = props;
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    onCancel();
  }
  function formSave() {
    // props.onSave(currentName, currentInterviewer);

    // onSave(name, interviewer);
    onSave(name, getInterviewer(interviewers, interviewer));
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
            data-testid="student-name-input"

          />
        </form>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={event => setInterviewer(event)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onSubmit={event => event.preventDefault()} onClick={formSave}>Save</Button>
        </section>
      </section>
    </main >

  );
}
