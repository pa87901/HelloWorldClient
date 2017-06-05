export default function reducer(state = {
  city: '',
  date: '',
  start: '',
  end: '',
  hourlyRate: '',
  intro: '',
  statement: '',
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
  }
  return state;
}