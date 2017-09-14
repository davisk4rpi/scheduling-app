export default (time, date) => {
  // this function takes the input from the time and date pickers
  // and merges them into one Date object
  let startTime;
  if (date) {
    const startDate = Date.parse(date);
    time = new Date(time);
    const timeDif = (time.getHours() * 60 + time.getMinutes()) * 60 * 1000;
    startTime = startDate + timeDif;
  } else {
    startTime = Date.now();
  }
  return startTime;
};
