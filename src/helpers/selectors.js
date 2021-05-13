function getAppointmentsForDay(state, day) {
  let dayAppoints = []
  let filteredDay = state.days.filter(filtDay => { return filtDay.name === day });

  filteredDay.appointments.map(appt => {
    dayAppoints.push(state.appointments[appt])
  })
  return dayAppoints
}