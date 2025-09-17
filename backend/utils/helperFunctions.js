import { captureScreenshot } from "../config/puppeteerConfig.js";
import dotenv from "dotenv";



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

// Capture Store Thumbnail
export const captureStoreThumbnail = async (storeId) => {
  if (!storeId) {
    throw new Error('storeId is required to capture the store thumbnail');
  }

  //const url = `${CLIENT_URL}/stores/${storeId}`;
  const url = `http://localhost:5173/stores/${storeId}`;
  console.log(url)

  try {
    const screenshotBuffer = await captureScreenshot(url, 1447, 780);
    return screenshotBuffer;
  } catch (error) {
    console.error(`Failed to capture thumbnail for store ${storeId}:`, error);
    throw error;
  }
};


