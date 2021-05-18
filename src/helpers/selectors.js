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
  let interviewers = [];

  for (const stateDay of state.days) {
    if (stateDay.name === day) {
      interviewers = stateDay.interviewers;
    }
  }
  if (interviewers === undefined || interviewers.length <= 0 || !day || !state) {
    return [];
  }

  for (const interviewer in state.interviewers) {
    for (const dayInterviewer of interviewers) {
      if (interviewer == dayInterviewer) {
        results.push(state.interviewers[interviewer]);
      }
    }
  }

  return results;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    interviewer: state.interviewers[interview.interviewer],
    student: interview.student
  };

}

export function getInterviewer(interviewers, interviewerID) {
  for (let interviewer of interviewers) {
    if (interviewer.id == interviewerID) {
      return interviewer;
    }
  }
}