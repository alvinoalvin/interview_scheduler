import React, { useState } from 'react'
import "components/Appointment/styles.scss";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import { getInterviewer } from "helpers/selectors";

export default function Form(props) {
  let { interviewers, onSave, onCancel } = props;
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null || interviewer === undefined) {
      setError("Interviewer is not selected")
      return;
    }
    setError("")
    onSave(name, getInterviewer(interviewers, interviewer));
  }

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    onCancel();
  }



  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={event => { setName(event.target.value) }}
            data-testid="student-name-input"

          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={event => setInterviewer(event)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onSubmit={event => event.preventDefault()} onClick={validate}>Save</Button>
        </section>
      </section>
    </main >

  );
}
