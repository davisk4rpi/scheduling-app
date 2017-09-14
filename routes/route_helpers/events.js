module.exports = values => {
  let {
    description,
    duration,
    durationUnit,
    name,
    startTimeDate,
    startTimeTime,
    calendarCheck
  } = values;
  let startTime;
  if (startTimeDate) {
    const startDate = Date.parse(startTimeDate);
    startTimeTime = new Date(startTimeTime);
    const time =
      (startTimeTime.getHours() * 60 + startTimeTime.getMinutes()) * 60 * 1000;
    startTime = startDate + time;
  } else {
    startTime = Date.now();
  }
  duration *= durationUnit === 'hours' ? 60 : 1;
  return {
    description,
    duration,
    name,
    startTime,
    calendarCheck
  };
};
