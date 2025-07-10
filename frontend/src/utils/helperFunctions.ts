
export const getSetting = (key: string, settings: any, objectPath: string) => {
  try {
    const path = [
      ...((objectPath && objectPath.length > 0) ? objectPath.split(".") : []),
      ...((key && key.length > 0) ? key.split(".") : [])
    ];

    return path.reduce((current, prop) => current?.[prop], settings);
  } catch {
    return undefined;
  }
};


export const convertTo12HourFormat = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "pm" : "am";
  const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
  return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export const validateContact = (phone: string, email: string) => {
  const phoneValid = /^[0-9]{10}$/.test(phone); 
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return {
    phoneValid,
    emailValid
  };
};



