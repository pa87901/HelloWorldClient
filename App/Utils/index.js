export default {
  time: {
    convert24ToAmPm: (number) => {
      if (number === 0) {
        return '12 AM';
      } else if (number <= 11) {
        return number + ' AM';
      } else if (number === 12) {
        return '12 PM';
      } else {
        return number - 12 + ' PM';
      }
    },
    displayDate: (dateString) => {
      dateString = dateString.split(' ');
      dateString[0] = dateString[0] + ',';
      dateString[2] = dateString[2] + ',';
      dateString = dateString.join(' ');
      return dateString;
    }
  }
};
