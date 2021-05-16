import React, { useState, useEffect } from "react";
const axios = require('axios');

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then((response) => {
      // const appointment = {
      //   ...state.appointments[id],
      //   interview: { ...interview }
      // };
      // const appointments = {
      //   ...state.appointments,
      //   [id]: appointment
      // };
      // setState({
      //   ...state,
      //   appointments
      // });
      return response
    });
  };


  const cancelInterview = (id, interview) => {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`).then((response) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments
      });
      return response
    });
  };
  return {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview
  }
}