import type { VercelRequest, VercelResponse } from "@vercel/node";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = req.headers["x-cakto-secret"] || req.query.secret;
  if (secret && secret !== process.env.CAKTO_WEBHOOK_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { email, status } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    if (status === "approved" || status === "paid" || !status) {
      const usersRef = db.collection("users");
      const snapshot = await usersRef.where("email", "==", email).limit(1).get();

      if (!snapshot.empty) {
        const userDoc = snapshot.docs[0];
        await userDoc.ref.update({
          paid: true,
          paidAt: new Date().toISOString(),
          paymentSource: "cakto",
        });
      } else {
        await usersRef.add({
          email,
          paid: true,
          paidAt: new Date().toISOString(),
          paymentSource: "cakto",
          createdAt: new Date().toISOString(),
        });
      }

      return res.status(200).json({ success: true, email });
    }

    return res.status(200).json({ success: true, skipped: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
