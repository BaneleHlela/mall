import express from "express";
import crypto from "crypto";
import { generatePayFastSignature } from "../utils/helperFunctions.js";
import Store from "../models/StoreModel.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { orderId, amount, email, paymentType } = req.body;

  const itemNameMap = {
    subscription: "Mall Subscription",
    product: "Product Purchase",
    donation: "Donation",
    package: "Package Payment",
  };

  const paymentData = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY,

    return_url: `${process.env.FRONTEND_PUBLIC_URL}/payment/success` || "https://lula-slakeless-hortatively.ngrok-free.dev/payment/success",
    cancel_url: `${process.env.FRONTEND_PUBLIC_URL}/payment/cancel` ||  "https://lula-slakeless-hortatively.ngrok-free.dev/payment/cancel",
    notify_url: process.env.BACKEND_URL
    ? `${process.env.BACKEND_URL}/api/payments/payfast/itn`
    : "https://lula-slakeless-hortatively.ngrok-free.dev/api/payments/payfast/itn",

    name_first: "Mall",
    name_last: "Hlela",
    email_address: email,

    m_payment_id: orderId,
    amount: Number(amount).toFixed(2),
    item_name: itemNameMap[paymentType] || "The Mall Order",
    custom_str1: paymentType,
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
  console.log("Received ITN:", req.body);
  const data = req.body;

  const receivedSignature = data.signature;
  delete data.signature;

  console.log("Verifying signature...");

  const expectedSignature = generatePayFastSignature(data, process.env.PAYFAST_PASSPHRASE);

  if (receivedSignature !== expectedSignature) {
    return res.status(400).send("Invalid signature");
  }

  console.log("Signature verified.");

  if (data.payment_status === "COMPLETE") {
    const orderId = data.m_payment_id;
    const paymentType = data.custom_str1 || "product"; // optional: send type as custom_str1
    
    switch (paymentType) {
      case "subscription":
        try {
          console.log("Activating subscription for order:", orderId);
          await Store.findByIdAndUpdate(orderId, {
            'subscription.isActive': true,
            'subscription.startDate': new Date(),
            'subscription.plan': 'pre-launch',
            'subscription.amount': parseFloat(data.amount_gross),
          });
        } catch (error) {
          console.error("Error activating subscription:", error);
        }
        break;
      case "product":
        // mark product as paid / update order
        console.log("Product payment processed for order:", orderId);
        break;
      case "donation":
        // log donation
        console.log("Donation received for order:", orderId);
        break;
      case "package":
        // handle package
        console.log("Package payment processed for order:", orderId);
        break;
      default:
        console.log("Unknown payment type:", paymentType);
    }

    console.log(`Payment complete: ${orderId} (${paymentType})`);
  }

  console.log("ITN processing complete");

  res.status(200).send("OK");
});

  

export default router;
