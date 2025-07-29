export const addMinutes = (date, mins) => new Date(date.getTime() + mins * 60000);

export const timeStringToDate = (baseDate, timeStr) => {
  const [hour, minute] = timeStr.split(':').map(Number);
  const copy = new Date(baseDate.getTime()); 
  copy.setUTCHours(hour, minute, 0, 0); 
  return copy;
};

export const formatTime = (date) => {
  const hours = date.getUTCHours(); // Get hours in UTC
  const minutes = date.getUTCMinutes(); // Get minutes in UTC
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`; // Format as HH:mm
};

