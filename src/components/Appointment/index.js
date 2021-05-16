import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import React from "react";
import { useVisualMode } from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  let { id, time, interview, interviewers, bookInterview, cancelInterview, value, name } = props;

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    if (name && interviewer) {
      transition(SAVING)
    }
    const interview = {
      student: name,
      interviewer: interviewer.id
    };

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }
  function remove(id) {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment">
      <Header time={time} />
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      { mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {(mode === CREATE || mode === EDIT) && (
        <Form
          name={name}
          value={value}
          interviewers={interviewers}
          onSave={save}
          onCancel={() => transition(EMPTY)}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you'd like to delete?"
          onConfirm={() => remove(id)}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === DELETING && (
        <Status message="Deleting" />
      )}
      {mode === ERROR_SAVE && (
        <Error message="There was an error while creating appointment" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="There was an error while deleting appointment" onClose={back} />
      )}
    </article>
  );
}