import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";
const axios = require('axios');
const appointments = [{
  id: 1,
  time: "1pm",
  interview: {
    student: "Lydia Miller-Jones",
    interviewer: {
      id: 1,
      name: "Joshua Jones",
      avatar: "https://i.imgur.com/LpaY82x.png",
    }
  }
},
{
  id: 2,
  time: "2pm",
  interview: {
    student: "Lydia Miller-Jones",
    interviewer: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    }
  }
},
{
  id: 3,
  time: "3pm",
},
{
  id: 4,
  time: "4pm",
  interview: {
    student: "Joshua Jacks",
    interviewer: {
      id: 4,
      name: "Bob Ranger",
      avatar: "https://i.imgur.com/LpaY82x.png",
    }
  }
},
{
  id: 5,
  time: "5pm",
  interview: {
    student: "Big Bertha",
    interviewer: {
      id: 5,
      name: "Chelsea Mao",
      avatar: "https://i.imgur.com/LpaY82x.png",
    }
  }
},
{
  id: 6,
  key: "last",
  time: "6pm"
}
];
export default function Application(props) {
  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);
  useEffect(() => {
    axios.get("https://localhost:8001/api/days").then(response => setDay(response.data))
  }, [])


  function selectUserByName(state, name) {
    const filteredNames = state.users.filter(user => user.name === name);
    return filteredNames;
  }


  const appointmentsElem = appointments.map((appointment) => {
    console.log(appointment)
    if (appointment.interview) {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={appointment.interview}
          interviewer={appointment.interview.interviewer}
        />
      )
    } else {
      return (
        < Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
        />
      )
    }
  });
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
            days={days}
            day={day}
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
        {appointmentsElem}
      </section>
    </main>
  );
}
