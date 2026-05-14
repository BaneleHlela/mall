import expressAsyncHandler from "express-async-handler";
import Driver from "../models/DriverModel.js";
import User from "../models/UserModel.js";
import { uploadToUploads } from "../config/gcsClient.js";

// Create a driver account
export const createDriver = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id; // from protectRoute middleware

  // Check if user already has a driver account
  const existingDriver = await Driver.findOne({ userId });
  if (existingDriver) {
    res.status(400);
    throw new Error("User already has a driver account.");
  }

  const {
    vehicleType,
    truckCategory,
    registrationNumber,
    operationTimes,
    alcoholDelivery
  } = req.body;

  // Parse operationTimes if it's a string
  let parsedOperationTimes;
  try {
    parsedOperationTimes = typeof operationTimes === 'string'
      ? JSON.parse(operationTimes)
      : operationTimes;
  } catch (error) {
    res.status(400);
    throw new Error("Invalid operation times format.");
  }

  // Handle vehicle images upload
  let vehicleImages = [];
  if (req.files.vehicleImages && req.files.vehicleImages.length > 0) {
    try {
      const uploadPromises = req.files.vehicleImages.map(async (file) => {
        const fileName = `drivers/${userId}/vehicle/${Date.now()}-${file.originalname}`;
        const imageUrl = await uploadToUploads(file.buffer, fileName, file.mimetype);
        return imageUrl;
      });
      vehicleImages = await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error uploading vehicle images:", error);
      res.status(500);
      throw new Error("Failed to upload vehicle images.");
    }
  }

  // Handle document uploads
  const documents = {};

  const documentFields = ['idOrPassport', 'criminalClearance', 'driversLicence', 'vehicleRegistration'];
  for (const field of documentFields) {
    if (req.files[field] && req.files[field][0]) {
      try {
        const file = req.files[field][0];
        const fileName = `drivers/${userId}/documents/${field}/${Date.now()}-${file.originalname}`;
        const documentUrl = await uploadToUploads(file.buffer, fileName, file.mimetype);
        documents[field] = {
          fileUrl: documentUrl,
          uploadedAt: new Date(),
          verified: false
        };
      } catch (error) {
        console.error(`Error uploading ${field}:`, error);
        res.status(500);
        throw new Error(`Failed to upload ${field}.`);
      }
    }
  }

  // Validate vehicle type
  const validVehicleTypes = ['bicycle', 'motorbike', 'car', 'van', 'truck'];
  if (!validVehicleTypes.includes(vehicleType)) {
    res.status(400);
    throw new Error("Invalid vehicle type.");
  }

  // Validate truck category if vehicle is truck
  if (vehicleType === 'truck') {
    const validTruckCategories = ['sand_and_blocks', 'general', 'both'];
    if (!validTruckCategories.includes(truckCategory)) {
      res.status(400);
      throw new Error("Invalid truck category.");
    }
  }

  // Validate required documents
  if (!documents.idOrPassport) {
    res.status(400);
    throw new Error("ID or Passport document is required.");
  }
  if (!documents.criminalClearance) {
    res.status(400);
    throw new Error("Criminal clearance certificate is required.");
  }
  if (vehicleType !== 'bicycle' && !documents.driversLicence) {
    res.status(400);
    throw new Error("Driver's licence is required for motor vehicles.");
  }
  if (vehicleType !== 'bicycle' && !documents.vehicleRegistration) {
    res.status(400);
    throw new Error("Vehicle registration is required for motor vehicles.");
  }

  // Create driver object
  const driverData = {
    userId,
    vehicle: {
      type: vehicleType,
      images: vehicleImages,
      registrationNumber: registrationNumber || null,
      truckCategory: vehicleType === 'truck' ? truckCategory : null,
    },
    operationTimes: parsedOperationTimes,
    alcoholDelivery: alcoholDelivery === 'true' || alcoholDelivery === true,
    documents: {
      idOrPassport: documents.idOrPassport || null,
      criminalClearance: documents.criminalClearance || null,
      driversLicence: documents.driversLicence || null,
      vehicleRegistration: documents.vehicleRegistration || null,
    },
    // Set default zones (can be updated later by admin or driver)
    collectionZones: [],
    deliveryZones: [],
  };

  const driver = new Driver(driverData);
  await driver.save();

  // Populate user data for response
  await driver.populate('userId', 'firstName lastName email username');

  res.status(201).json({
    success: true,
    message: "Driver account created successfully. Please wait for admin approval.",
    driver: {
      ...driver._doc,
      userId: driver.userId,
    },
  });
});

// Get driver profile
export const getDriverProfile = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const driver = await Driver.findOne({ userId })
    .populate('userId', 'firstName lastName email username');

  if (!driver) {
    res.status(404);
    throw new Error("Driver account not found.");
  }

  res.status(200).json({
    success: true,
    driver,
  });
});

// Update driver profile
export const updateDriverProfile = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const driver = await Driver.findOne({ userId });
  if (!driver) {
    res.status(404);
    throw new Error("Driver account not found.");
  }

  const allowedUpdates = [
    'vehicle.registrationNumber',
    'alcoholDelivery',
    'operationTimes',
    'collectionZones',
    'deliveryZones'
  ];

  const updates = {};
  Object.keys(req.body).forEach(key => {
    if (allowedUpdates.includes(key)) {
      if (key.includes('.')) {
        const [parent, child] = key.split('.');
        if (!updates[parent]) updates[parent] = {};
        updates[parent][child] = req.body[key];
      } else {
        updates[key] = req.body[key];
      }
    }
  });

  Object.assign(driver, updates);
  await driver.save();

  res.status(200).json({
    success: true,
    message: "Driver profile updated successfully.",
    driver,
  });
});

// Upload driver documents
export const uploadDriverDocuments = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { documentType } = req.body;

  const driver = await Driver.findOne({ userId });
  if (!driver) {
    res.status(404);
    throw new Error("Driver account not found.");
  }

  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded.");
  }

  try {
    const fileName = `drivers/${userId}/documents/${documentType}/${Date.now()}-${req.file.originalname}`;
    const documentUrl = await uploadToUploads(req.file.buffer, fileName, req.file.mimetype);

    // Update the appropriate document field
    if (driver.documents[documentType]) {
      driver.documents[documentType].fileUrl = documentUrl;
      driver.documents[documentType].uploadedAt = new Date();
      driver.documents[documentType].verified = false;
    } else {
      driver.documents[documentType] = {
        fileUrl: documentUrl,
        uploadedAt: new Date(),
        verified: false,
      };
    }

    await driver.save();

    res.status(200).json({
      success: true,
      message: `${documentType} document uploaded successfully.`,
      document: driver.documents[documentType],
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500);
    throw new Error("Failed to upload document.");
  }
});