export default function reducer(state = {
  city: '',
  date: '',
  start: '',
  end: '',
  hourlyRate: '',
  intro: '',
  statement: '',
  specialties: {
    sightseeing: false,
    museum: false,
    food: false,
    nightlife: false,
    sports: false,
    music: false,
    history: false,
    politics: false
  }
}, action) {
  if (action.type === 'BECOME_GUIDE_CITY') {
    return {...state, city: action.payload}
  } else if (action.type === 'BECOME_GUIDE_DATE') {
    return {...state, date: action.payload}
  } else if (action.type === 'BECOME_GUIDE_START') {
    return {...state, start: action.payload}
  } else if (action.type === 'BECOME_GUIDE_END') {
    return {...state, end: action.payload}
  } else if (action.type === 'BECOME_GUIDE_RATE') {
    return {...state, hourlyRate: action.payload}
  } else if (action.type === 'BECOME_GUIDE_INTRO') {
    return {...state, intro: action.payload}
  } else if (action.type === 'BECOME_GUIDE_STATEMENT') {
    return {...state, statement: action.payload}
  } else if (action.type === 'BECOME_GUIDE_SPECIALTIES') {
    return {...state, specialties: action.payload}
  }
  return state;
}