import React from "react";
import "components/Appointment/styles.scss";

export default function Empty(props) {
  let { onAdd } = props;

  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
      />
    </main>
  );
}
