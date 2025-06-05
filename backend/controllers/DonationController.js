import asyncHandler from "express-async-handler";
import Donation from "../models/DonationModel.js"; 

export const createDonation = asyncHandler(async (req, res) => {
  const {
    recipient,
    amount,
    message,
    isAnonymous = false,
    category,
  } = req.body;

  // Ensure donor is logged in and included in req.user
  const donor = req.user?._id;

  if ( !recipient || !amount) {
    res.status(400);
    throw new Error("Missing required fields: donor, recipient, or amount.");
  }

  const donation = await Donation.create({
    donor,
    recipient,
    amount,
    message,
    isAnonymous,
    category,
  });

  res.status(201).json(donation);
});


export const getAllDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find()
    .populate("donor", "name email")         // Fetch donor name/email
    .populate("recipient", "name storeName") // Fetch recipient details

  res.status(200).json(donations);
});


export const getDonationById = asyncHandler(async (req, res) => {
    const donation = await Donation.findById(req.params.id)
      .populate("donor", "name email")
      .populate("recipient", "storeName name");
  
    if (!donation) {
      res.status(404);
      throw new Error("Donation not found");
    }
  
    res.status(200).json(donation);
});


export const getDonationsByDonor = asyncHandler(async (req, res) => {
    const donations = await Donation.find({ donor: req.params.donorId })
      .populate("recipient", "storeName name")
      .sort({ createdAt: -1 }); // newest first
  
    res.status(200).json(donations);
});


export const getDonationsByRecipient = asyncHandler(async (req, res) => {
    const donations = await Donation.find({ recipient: req.params.recipientId })
      .populate("donor", "name email")
      .sort({ createdAt: -1 });
  
    res.status(200).json(donations);
});
  

export const updateDonationStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
  
    const validStatuses = ["Pending", "Completed", "Failed"];
    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error("Invalid status value");
    }
  
    const donation = await Donation.findById(req.params.id);
  
    if (!donation) {
      res.status(404);
      throw new Error("Donation not found");
    }
  
    donation.status = status;
    const updatedDonation = await donation.save();
  
    res.status(200).json(updatedDonation);
});
    

export const deleteDonation = asyncHandler(async (req, res) => {
    const donation = await Donation.findById(req.params.id);
  
    if (!donation) {
      res.status(404);
      throw new Error("Donation not found");
    }
  
    if (donation.status !== "Pending") {
      res.status(400);
      throw new Error("Only pending donations can be deleted");
    }
  
    await donation.deleteOne();
  
    res.status(200).json({ message: "Donation deleted successfully" });
});
  
  
export const filterDonations = asyncHandler(async (req, res) => {
    const { status, category, start, end } = req.query;
  
    const filter = {};
  
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (start || end) {
      filter.createdAt = {};
      if (start) filter.createdAt.$gte = new Date(start);
      if (end) filter.createdAt.$lte = new Date(end);
    }
  
    const donations = await Donation.find(filter)
      .populate("donor", "name email")
      .populate("recipient", "storeName name")
      .sort({ createdAt: -1 });
  
    res.status(200).json(donations);
  });
  