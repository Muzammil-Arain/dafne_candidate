import moment from "moment";

export const firebaseformatDate = dateString => {
    const milliseconds =
      dateString._seconds * 1000 + dateString._nanoseconds / 1000000;
    const updateDate = new Date(milliseconds);
    const date = moment(updateDate);
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');

    if (date.isSame(today, 'd')) {
      return 'Today';
    } else if (date.isSame(yesterday, 'd')) {
      return 'Yesterday';
    } else {
      return date.format('MMMM DD, YYYY');
    }
  };