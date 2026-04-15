import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import VisitLog from "../models/VisitLogModel.js";
import Store from "../models/StoreModel.js"
import Billing from '../models/BillingModel.js';

export const getVisitStats = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { timeframe = 'today' } = req.query;

    // Calculate date ranges
    const now = new Date();
    let startDate, prevStartDate, prevEndDate;

    if (timeframe === 'today') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      prevStartDate = new Date(startDate.getTime() - 24 * 60 * 60 * 1000);
      prevEndDate = new Date(startDate.getTime() - 1);
    } else if (timeframe === 'week') {
      const dayOfWeek = now.getDay();
      startDate = new Date(now.getTime() - dayOfWeek * 24 * 60 * 60 * 1000);
      startDate.setHours(0, 0, 0, 0);
      prevStartDate = new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      prevEndDate = new Date(startDate.getTime() - 1);
    } else if (timeframe === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      prevStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      prevEndDate = new Date(startDate.getTime() - 1);
    }

    // Count visits for current period
    const currentCount = await VisitLog.countDocuments({
      storeId: storeId,
      timestamp: { $gte: startDate }
    });

    // Count visits for previous period
    const prevCount = await VisitLog.countDocuments({
      storeId: storeId,
      timestamp: { $gte: prevStartDate, $lte: prevEndDate }
    });

    // Calculate percentage change
    let percentage = 0;
    if (prevCount > 0) {
      percentage = ((currentCount - prevCount) / prevCount) * 100;
    } else if (currentCount > 0) {
      percentage = 100;
    }

    res.json({
      count: currentCount,
      percentage: Math.round(percentage * 100) / 100,
      timeframe
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const trackVisit = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.body;

  console.log(storeId)

  if (!storeId || !mongoose.Types.ObjectId.isValid(storeId)) {
    return res.status(400).json({ message: "Invalid storeId" });
  }

  const visitorId = req.visitorId; // from middleware
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  try {
    // 🔍 Ensure store exists (light check)
    const storeExists = await Store.exists({ _id: storeId });
    console.log(storeExists)

    if (!storeExists) {
      return res.status(404).json({ message: "Store not found" });
    }

    // 🚨 Atomic visit tracking (prevents duplicates)
    const visit = await VisitLog.findOneAndUpdate(
      {
        storeId,
        visitorId,
        timestamp: { $gte: oneHourAgo }, // 1 visit per hour
      },
      {
        $setOnInsert: {
          storeId,
          visitorId,
          ip: req.ip,
          userAgent: req.get("User-Agent"),
          referrer: req.get("Referer"),
          timestamp: new Date(),
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    // ✅ Only increment if NEW visit
    const isNewVisit =
      visit.createdAt &&
      visit.updatedAt &&
      visit.createdAt.getTime() === visit.updatedAt.getTime();

    if (isNewVisit) {
      await Store.updateOne(
        { _id: storeId },
        { $inc: { visits: 1 } }
      );

      // 🆕 Check subscription status to determine if billing applies
      const store = await Store.findById(storeId).select('subscription');
      const isFreePlan = store.subscription.isActive && store.subscription.plan === 'pre-launch';

      if (!isFreePlan) {
        // Create billing entry for the visit (1 cent)
        try {
          await Billing.create({
            store: storeId,
            amount: 1, // 1 cent per visit
            type: 'visit',
            description: 'Visit fee for new visitor',
            date: new Date(),
            status: 'pending', // Or 'billed' if you want to mark immediately
          });

          // Update Store bill.total (increment by 1 cent)
          await Store.updateOne(
            { _id: storeId },
            { $inc: { 'bill.total': 1 } }
          );
        } catch (billingError) {
          console.error('Failed to create visit billing:', billingError.message);
          // Don't fail the request; log and continue
        }
      }
    }

    return res.status(200).json({
      success: true,
      counted: isNewVisit, // 🔥 useful for analytics/debugging
    });

  } catch (error) {
    console.error("Track visit error:", error.message);

    // ❗ Never break frontend because of tracking
    return res.status(200).json({
      success: false,
      counted: false,
    });
  }
});