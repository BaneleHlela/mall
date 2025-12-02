import expressAsyncHandler from "express-async-handler";
import Section from "../models/SectionModel.js";
import { uploadToUploads } from '../config/gcsClient.js';

export const uploadStoreSection = expressAsyncHandler(async (req, res) => {
  try {
    const { name, variation } = req.body;
    const mobileFile = req.files?.mobile?.[0];
    const desktopFile = req.files?.desktop?.[0];


    if (!mobileFile || !desktopFile) {
      return res.status(400).json({ message: "Both mobile and desktop images are required." });
    }

    const mobileFileName = `mobile-${Date.now()}-${mobileFile.originalname}`;
    const desktopFileName = `desktop-${Date.now()}-${desktopFile.originalname}`;

    const mobilePath = `sections/${name}/${mobileFileName}`;
    const desktopPath = `sections/${name}/${desktopFileName}`;

    await uploadToUploads(mobileFile.buffer, mobilePath);
    await uploadToUploads(desktopFile.buffer, desktopPath);

    const mobileUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${mobilePath}`;
    const desktopUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${desktopPath}`;

    const newSection = await Section.create({
      name,
      variation,
      layout,
      images: {
        mobile: mobileUrl,
        desktop: desktopUrl,
      },
    });

    res.status(201).json({
      message: "Section uploaded successfully",
      section: newSection,
    });
  } catch (error) {
    console.error("Upload section error:", error);
    res.status(500).json({ message: "Failed to upload section" });
  }
});


export const getSections = expressAsyncHandler(async (req, res) => {
    try {
      const { name } = req.query;
  
      const filter = {};
  
      if (name) {
        // Case-insensitive exact name match. Use regex for partial match if needed.
        filter.name = { $regex: new RegExp(`^${name}$`, "i") };
      }
  
      const sections = await Section.find(filter);
  
      res.status(200).json({
        message: "Sections fetched successfully",
        sections,
      });
    } catch (error) {
      console.error("Get sections error:", error);
      res.status(500).json({ message: "Failed to fetch sections" });
    }
});