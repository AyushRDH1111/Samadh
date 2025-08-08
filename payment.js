import express from "express";
import Stripe from "stripe";
import Razorpay from "razorpay";

const router = express.Router();

const stripe = process.env.STRIPE_SECRET ? new Stripe(process.env.STRIPE_SECRET) : null;
const razorpay = (process.env.RAZORPAY_KEY && process.env.RAZORPAY_SECRET) ? new Razorpay({ key_id: process.env.RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET }) : null;

router.post("/stripe", async (req, res) => {
  try {
    if (!stripe) return res.status(400).json({ message: "Stripe not configured" });
    const { amount, currency } = req.body;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{
        price_data: { currency: currency || "usd", product_data: { name: "Yoga Class" }, unit_amount: Math.round(amount * 100) },
        quantity: 1
      }],
      success_url: `${process.env.FRONTEND_URL}/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-failed`
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/razorpay", async (req, res) => {
  try {
    if (!razorpay) return res.status(400).json({ message: "Razorpay not configured" });
    const { amount, currency } = req.body;
    const order = await razorpay.orders.create({ amount: Math.round(amount * 100), currency: currency || "INR", receipt: "yoga_" + Date.now() });
    res.json(order);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
