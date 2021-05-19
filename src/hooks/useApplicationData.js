import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    // spots: 0
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
      // let spots = 0;
      // for (const appt in appointments) {
      //   if (appointments[appt].interview === null) {
      //     spots++;
      //   }
      // }
      // console.log("initial spots", spots)
      // setState(prev => ({ ...prev, days, appointments, interviewers, spots }));
      setState(prev => ({ ...prev, days, appointments, interviewers }));

    });
  }, []);

  function getDayIDFromName(name, state) {
    for (const day of state.days) {
      if (day.name === name) {
        return day.id - 1;
      }
    }
  }

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then((response) => {
      const days = [
        ...state.days
      ];
      if (!state.appointments[id].interview) {
        const dayID = getDayIDFromName(state.day, state);
        const day = {
          ...state.days[dayID],
          spots: state.days[dayID].spots - 1
        };

        days[dayID] = day
      }

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
        appointments: appointments,
        days: days,
        // spots: state.spots - 1
      });


      return response;
    });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const dayID = getDayIDFromName(state.day, state);
      const day = {
        ...state.days[dayID],
        spots: state.days[dayID].spots + 1
      };
      const days = [
        ...state.days
      ];

      days[dayID] = day

      setState({
        ...state,
        days: days,
        // spots: state.spots + 1
      });
      
      return response
    })
  };


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}