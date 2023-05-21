module.exports.getStartDateFunction = function(date, day) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const startDate = new Date(date);
  startDate.setDate(startDate.getDate() - day);
  startDate.setUTCHours(0, 0, 0, 0);

  if (startDate.getTime() < today.getTime()) {
    return today;
  }

  return startDate;
};
