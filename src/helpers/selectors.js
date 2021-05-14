export function getAppointmentsForDay(state, day) {
  const results = [];
  const dayObj = state.days.find(filtDay => filtDay.name === day);

  if (!dayObj) {
    return [];
  }

  for (const id of dayObj.appointments) {
    results.push(state.appointments[id]);
  }

  return results;
}
export function getInterviewersForDay(state, day) {
  const results = [];
  const appointments = getAppointmentsForDay(state, day);

  if (appointments.length <= 0) {
    return [];
  }

  for (const appointment in appointments) {
    if (appointments[appointment].interview) {
      results.push(getInterview(state, appointments[appointment].interview).interviewer);
    }
  }

  return results;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  for (const interviewerId in state.interviewers) {
    if (interviewerId == interview.interviewer) {
      return { interviewer: state.interviewers[interviewerId], student: interview.student };
    }
  }
  return null;
}