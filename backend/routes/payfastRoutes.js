import express from "express";
import crypto from "crypto";
import { generatePayFastSignature } from "../utils/helperFunctions.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { orderId, amount, email } = req.body;

  const paymentData = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY,

    return_url:  "https://lula-slakeless-hortatively.ngrok-free.dev/payment/success",
    cancel_url:  "https://lula-slakeless-hortatively.ngrok-free.dev/payment/cancel",
    notify_url: process.env.BACKEND_URL
    ? `${process.env.BACKEND_URL}/api/payments/payfast/itn`
    : "https://lula-slakeless-hortatively.ngrok-free.dev/api/payments/payfast/itn",

    name_first: "Mall",
    name_last: "Hlela",
    email_address: email,

    m_payment_id: orderId,
    amount: Number(amount).toFixed(2),
    item_name: "The Mall Order",
  };

  const signature = generatePayFastSignature(
    paymentData,
    process.env.PAYFAST_PASSPHRASE
  );



  res.json({
    paymentUrl: process.env.PAYFAST_URL,
    paymentData: {
      ...paymentData,
      signature,
    },
  });
});

router.post("/itn", express.urlencoded({ extended: false }), async (req, res) => {
    const data = req.body;
  
    // 1. Validate signature
    const receivedSignature = data.signature;
    delete data.signature;
  
    const queryString = Object.entries(data)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join("&");
  
    const expectedSignature = generatePayFastSignature(
      data,
      process.env.PAYFAST_PASSPHRASE
    );
  
    if (receivedSignature !== expectedSignature) {
      return res.status(400).send("Invalid signature");
    }
  
    // 2. Check payment status
    if (data.payment_status === "COMPLETE") {
      const orderId = data.m_payment_id;
  
      // ✅ Mark order as paid
      // ✅ Credit vendor wallet
      // ✅ Log transaction
  
      console.log("Payment complete:", orderId);
    }
  
    res.status(200).send("OK");
});
  

export default router;
