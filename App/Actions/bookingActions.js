export function setRequestedGuideBookings(bookings) {
  return {
    type: 'SET_REQUESTED_GUIDE_BOOKINGS_FULFILLED',
    payload: bookings
  }
}

export function setTouristBookings(bookings) {
  return {
    type: 'SET_TOURIST_BOOKINGS',
    payload: bookings
  }
}

export function setGuideBookings(bookings) {
  return {
    type: 'SET_GUIDE_BOOKINGS',
    payload: bookings
  }
}

export function setSelectedRequestedBooking(bookingIndex) {
  return {
    type: 'SET_SELECTED_REQUESTED_BOOKING_FULFILLED',
    payload: bookingIndex
  }
}
