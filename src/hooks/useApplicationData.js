import { useState, useEffect } from "react";
const axios = require('axios');

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: 0
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      const days = response[0].data;
      const appointments = response[1].data;
      const interviewers = response[2].data;
      let spots = 0;
      for (const appt in appointments) {
        if (appointments[appt].interview === null) {
          spots++;
        }
      }
      setState(prev => ({ ...prev, days, appointments, interviewers, spots }));
    });
  }, []);

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then((response) => {
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
        appointments,
        spots: state.spots - 1
      });
      // setState({ ...state, spots: state.spots - 1, appointments })
      console.log("spot gone:( ", state.spots)
      return response
    });
  };


  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState({ ...state, spots: state.spots + 1 })
      console.log("spot opened :) ", state.spots)
      return response
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}