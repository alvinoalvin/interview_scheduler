import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

const axios = require('axios');

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  const interviewers = getInterviewersForDay(state, state.day);
  const appointmentList = getAppointmentsForDay(state, state.day).map(
    appointment => {
      console.log("appointmentList state: ", state)
      console.log("appointmentList appointment", appointment)
      const interview = getInterview(state, appointment.interview)
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  // const dayAppointments = getAppointmentsForDay(state, state.day);
  // const bookInterview = (id, interview) => {
  //   return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then((response) => {
  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: { ...interview }
  //     };
  //     const appointments = {
  //       ...state.appointments,
  //       [id]: appointment
  //     };
  //     setState({
  //       ...state,
  //       appointments
  //     });
  //     return response
  //   });
  // };
  // const cancelInterview = (id, interview) => {
  //   return axios.delete(`http://localhost:8001/api/appointments/${id}`).then((response) => {
  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: { ...interview }
  //     };
  //     const appointments = {
  //       ...state.appointments,
  //       [id]: appointment
  //     };
  //     setState({
  //       ...state,
  //       appointments
  //     });
  //     return response
  //   });
  // };
  // const appointmentList = dayAppointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);

  //   return (
  //     <Appointment
  //       {...appointment}
  //       key={appointment.id}
  //       interview={interview}
  //       interviewers={interviewers}
  //       bookInterview={bookInterview}
  //       cancelInterview={cancelInterview}
  //     />
  //   );
  // });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
      </section>
    </main>
  );
}