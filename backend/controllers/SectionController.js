import expressAsyncHandler from "express-async-handler";
import Section from "../models/SectionModel.js";
import StoreLayout from "../models/StoreLayout.js";
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
      const { name, variation } = req.query;
   
      const filter = {};
   
      if (name) {
        // Case-insensitive exact name match. Use regex for partial match if needed.
        filter.name = { $regex: new RegExp(`^${name}$`, "i") };
      }

      if (variation) {
        // Case-insensitive exact variation match. Use regex for partial match if needed.
        filter.variation = { $regex: new RegExp(`^${variation}$`, "i") };
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

// New function to copy section settings from one layout to another
export const copySectionFromLayout = expressAsyncHandler(async (req, res) => {
  try {
    const { sourceLayoutId, targetLayoutId, sectionName } = req.body;

    if (!sourceLayoutId || !targetLayoutId || !sectionName) {
      return res.status(400).json({
        message: "Source layout ID, target layout ID, and section name are required",
      });
    }

    // 1. Find source layout
    const sourceLayout = await StoreLayout.findById(sourceLayoutId);

    if (!sourceLayout) {
      return res.status(404).json({ message: "Source layout not found" });
    }

    // 2. Extract section config
    const sourceSectionConfig = sourceLayout.sections?.[sectionName];

    if (!sourceSectionConfig) {
      return res.status(404).json({
        message: `Section "${sectionName}" not found in source layout sections`,
      });
    }

    // 3. Update target layout using findByIdAndUpdate
    const updateField = `sections.${sectionName}`;

    // Console log for debugging
    console.log(sourceSectionConfig.variation)

    const updatedTargetLayout = await StoreLayout.findByIdAndUpdate(
      targetLayoutId,
      {
        $set: {
          [updateField]: sourceSectionConfig,
        },
      },
      {
        new: true, // return updated document
        runValidators: true,
      }
    );

    console.log(updatedTargetLayout.sections[sectionName].variation);

    if (!updatedTargetLayout) {
      return res.status(404).json({ message: "Target layout not found" });
    }

    res.status(200).json({
      message: "Section configuration copied successfully",
      sectionName,
      sourceLayoutId,
      targetLayoutId,
      config: sourceSectionConfig,
      layout: updatedTargetLayout, // Return the complete updated layout
    });
  } catch (error) {
    console.error("Copy section error:", error);
    res.status(500).json({ message: "Failed to copy section configuration" });
  }
});

// New function to add section settings from one layout to another (for adding new sections)
export const addSectionFromLayout = expressAsyncHandler(async (req, res) => {
  try {
    const { sourceLayoutId, targetLayoutId, sectionName } = req.body;

    console.log(sectionName);

    if (!sourceLayoutId || !targetLayoutId || !sectionName) {
      return res.status(400).json({
        message: "Source layout ID, target layout ID, and section name are required",
      });
    }

    // 1. Find source layout
    const sourceLayout = await StoreLayout.findById(sourceLayoutId);

    if (!sourceLayout) {
      return res.status(404).json({ message: "Source layout not found" });
    }

    // 2. Extract section config
    const sourceSectionConfig = sourceLayout.sections?.[sectionName];

    if (!sourceSectionConfig) {
      return res.status(404).json({
        message: `Section "${sectionName}" not found in source layout sections`,
      });
    }

    // 3. Update target layout: add section and push to routeOrder
    const updateField = `sections.${sectionName}`;

    const updatedTargetLayout = await StoreLayout.findByIdAndUpdate(
      targetLayoutId,
      {
        $set: {
          [updateField]: sourceSectionConfig,
        },
        $push: {
          'routes.home.contains': sectionName,
        },
      },
      {
        new: true, // return updated document
        runValidators: true,
      }
    );

    if (!updatedTargetLayout) {
      return res.status(404).json({ message: "Target layout not found" });
    }

    res.status(200).json({
      message: "Section configuration added successfully",
      sectionName,
      sourceLayoutId,
      targetLayoutId,
      routes: updatedTargetLayout.routes.home.contains,
      config: sourceSectionConfig,
      layout: updatedTargetLayout, // Return the complete updated layout
    });
  } catch (error) {
    console.error("Add section error:", error);
    res.status(500).json({ message: "Failed to add section configuration" });
  }
});
