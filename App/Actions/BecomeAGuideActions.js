export function becomeGuideCity(city) {
  return {
      type: 'BECOME_GUIDE_CITY',
      payload: city
  };
}

export function becomeGuideDate(date) {
  return {
      type: 'BECOME_GUIDE_DATE',
      payload: date
  };
}

export function becomeGuideStart(startTime) {
  return {
      type: 'BECOME_GUIDE_START',
      payload: startTime
  };
}

export function becomeGuideEnd(endTime) {
  return {
      type: 'BECOME_GUIDE_END',
      payload: endTime
  };
}

export function becomeGuideRate(hourlyRate) {
  return {
      type: 'BECOME_GUIDE_RATE',
      payload: hourlyRate
  };
}

export function becomeGuideIntro(intro) {
  return {
      type: 'BECOME_GUIDE_INTRO',
      payload: intro
  };
}

export function becomeGuideStatement(statement) {
  return {
      type: 'BECOME_GUIDE_STATEMENT',
      payload: statement
  };
}

export function becomeGuideSpecialties(specialties) {
  return {
    type: 'BECOME_GUIDE_SPECIALTIES',
    payload: specialties
  }
}