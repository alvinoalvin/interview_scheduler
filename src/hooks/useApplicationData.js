import { useState, useEffect } from "react";
const axios = require('axios');

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((response) => {
      const days = response[0].data;
      const appointments = response[1].data;
      const interviewers = response[2].data;
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  const bookInterview = (id, interview) => {
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then((response) => {
      return response
    });
  };


  const cancelInterview = (id) => {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`).then((response) => {
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