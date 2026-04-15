// backend/controllers/BillingController.js
import Billing from '../models/BillingModel.js';
import mongoose from 'mongoose';

export const getStoreBills = async (req, res) => {
  try {
    const { storeId } = req.params;
    const bills = await Billing.find({ store: storeId }).sort({ date: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markBillPaid = async (req, res) => {
  try {
    const { billId } = req.params;
    await Billing.updateOne({ _id: billId }, { status: 'paid' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBillingStats = async (req, res) => {
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

    // Aggregate unsettled bills for current period
    const currentUnsettled = await Billing.aggregate([
      {
        $match: {
          store: new mongoose.Types.ObjectId(storeId),
          date: { $gte: startDate },
          status: { $ne: 'paid' }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    const currentAmount = currentUnsettled.length > 0 ? currentUnsettled[0].total / 100 : 0; // Convert cents to rands

    // Aggregate unsettled bills for previous period
    const prevUnsettled = await Billing.aggregate([
      {
        $match: {
          store: new mongoose.Types.ObjectId(storeId),
          date: { $gte: prevStartDate, $lte: prevEndDate },
          status: { $ne: 'paid' }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    const prevAmount = prevUnsettled.length > 0 ? prevUnsettled[0].total / 100 : 0;

    // Calculate percentage change
    let percentage = 0;
    if (prevAmount > 0) {
      percentage = ((currentAmount - prevAmount) / prevAmount) * 100;
    } else if (currentAmount > 0) {
      percentage = 100;
    }

    res.json({
      amount: currentAmount,
      percentage: Math.round(percentage * 100) / 100,
      timeframe
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};