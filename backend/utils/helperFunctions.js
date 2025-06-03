export const addMinutes = (date, mins) => new Date(date.getTime() + mins * 60000);

export const timeStringToDate = (baseDate, timeStr) => {
  const [hour, minute] = timeStr.split(':').map(Number);
  const copy = new Date(baseDate);
  copy.setHours(hour, minute, 0, 0);
  return copy;
};

export const formatTime = (date) =>
  date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });