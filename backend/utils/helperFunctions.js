import User from "../models/UserModel.js";
import crypto from "crypto";

// Generate unique username
export const generateUniqueUsername = async (firstName, lastName) => {
  // Create base username: lowercase, alphanumeric only
  const base = `${firstName || "user"}${lastName || ""}`.toLowerCase().replace(/[^a-z0-9]/g, "");

  let username = base;
  let counter = 0;

  // Ensure uniqueness by checking DB and appending number if needed
  while (await User.findOne({ username })) {
    counter++;
    username = `${base}${counter}`;
  }

  return username;
};


import { captureScreenshot } from "../config/puppeteerConfig.js";

// Generate slug from store name
export const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};




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
    const screenshotBuffer = await captureScreenshot(url, 1447, 900);
    return screenshotBuffer;
  } catch (error) {
    console.error(`Failed to capture thumbnail for store ${storeId}:`, error);
    throw error;
  }
};

// Capture StoreCard Thumbnail (1447 x 900 px)
export const captureStoreCardThumbnail = async (storeId) => {
  if (!storeId) {
    throw new Error('storeId is required to capture the storeCard thumbnail');
  }

  const url = `http://localhost:5173/stores/${storeId}`;
  console.log(`Capturing storeCard for: ${url}`);

  try {
    const screenshotBuffer = await captureScreenshot(url, 1447, 900);
    return screenshotBuffer;
  } catch (error) {
    console.error(`Failed to capture storeCard for store ${storeId}:`, error);
    throw error;
  }
};

// Capture Reely Thumbnail (360 x 660 px)
export const captureReelyThumbnail = async (storeId) => {
  if (!storeId) {
    throw new Error('storeId is required to capture the reely thumbnail');
  }

  const url = `http://localhost:5173/stores/${storeId}`;
  console.log(`Capturing reely for: ${url}`);

  try {
    const screenshotBuffer = await captureScreenshot(url, 360, 660);
    return screenshotBuffer;
  } catch (error) {
    console.error(`Failed to capture reely for store ${storeId}:`, error);
    throw error;
  }
};

// Capture Store HomePoster
export const captureStoreHomePoster = async () => {

  //const url = `${CLIENT_URL}/stores/${storeId}`;
  const url = `http://localhost:5173/capture`;
  console.log(url)

  try {
    const screenshotBuffer = await captureScreenshot(url, 926, 1307);
    return screenshotBuffer;
  } catch (error) {
    console.error(`Failed to capture HomePoster:`, error);
    throw error;
  }
};


// Capture Store screenshot layout
export const captureStoreLayoutScreenshot = async (layoutId) => {

  //const url = `${CLIENT_URL}/stores/${storeId}`;
  const url = `http://localhost:5173/layouts/${layoutId}/preview`;

  try {
    const screenshotBuffer = await captureScreenshot(url, 360, 660);
    return screenshotBuffer;
  } catch (error) {
    console.error(`Failed to capture HomePoster:`, error);
    throw error;
  }
};

export const generatePayFastSignature = (data, passPhrase = null) => {
  // Create parameter string
  let pfOutput = "";
  for (let key in data) {
    if(data.hasOwnProperty(key)){
      if (data[key] !== "") {
        pfOutput +=`${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}&`
      }
    }
  }

  // Remove last ampersand
  let getString = pfOutput.slice(0, -1);
  if (passPhrase !== null) {
    getString +=`&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}`;
  }

  return crypto.createHash("md5").update(getString).digest("hex");
}; 

