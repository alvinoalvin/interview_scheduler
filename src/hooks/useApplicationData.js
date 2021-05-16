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
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
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
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then((response) => {
      setState({ ...state, spots: state.spots - 1 })
      console.log("spot gone:( ", state.spots)
      return response
    });
  };


  const cancelInterview = (id) => {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`).then((response) => {
      setState({ ...state, spots: state.spots + 1 })
      console.log("spot opened :) ", state.spots)
      return response
    });
  };

  // const updateSpots = (id) => {
  //   return axios.delete(`http://localhost:8001/api/appointments/${id}`).then((response) => {
  //     return response
  //   });
  // };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}