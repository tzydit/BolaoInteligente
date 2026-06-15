import type { VercelRequest, VercelResponse } from "@vercel/node";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import nodemailer from "nodemailer";

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

const SITE_URL = process.env.SITE_URL || "https://bolaointeligente.vercel.app";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tazzoyez@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendWelcomeEmail(email: string) {
  if (!process.env.GMAIL_APP_PASSWORD) {
    console.warn("GMAIL_APP_PASSWORD not set — skipping email");
    return;
  }

  const registerUrl = `${SITE_URL}?register=${encodeURIComponent(email)}`;

  await transporter.sendMail({
    from: "Bolão Inteligente <tazzoyez@gmail.com>",
    to: email,
    subject: "Acesso Liberado — Bolão Inteligente",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1a12;color:#e8ebe9;padding:40px 30px;border-radius:12px;">
        <div style="text-align:center;margin-bottom:30px;">
          <h1 style="color:#3ecf8e;margin:0;font-size:24px;">Bolão Inteligente</h1>
          <p style="color:#687069;font-size:13px;margin-top:4px;">Copa do Mundo 2026</p>
        </div>

        <h2 style="color:#d4a853;font-size:20px;text-align:center;">Compra Aprovada!</h2>

        <p style="color:#a3ada7;font-size:15px;line-height:1.6;">
          Olá! Seu pagamento foi confirmado com sucesso. Agora é só criar sua conta
          para acessar a plataforma completa com palpites de IA, estatísticas avançadas
          e dados em tempo real.
        </p>

        <div style="text-align:center;margin:30px 0;">
          <a href="${registerUrl}"
             style="background:linear-gradient(to right,#3ecf8e,#2a8f62);color:#0d1a12;padding:14px 32px;border-radius:10px;font-weight:bold;font-size:16px;text-decoration:none;display:inline-block;">
            Criar Minha Conta
          </a>
        </div>

        <p style="color:#687069;font-size:12px;text-align:center;">
          Use o e-mail <strong style="color:#a3ada7;">${email}</strong> no cadastro —
          é com ele que seu acesso está vinculado.
        </p>

        <hr style="border:none;border-top:1px solid #1e3528;margin:30px 0;" />

        <p style="color:#687069;font-size:11px;text-align:center;">
          Bolão Inteligente · Plataforma de estatísticas para Copa do Mundo 2026<br/>
          Este é um e-mail automático, não responda.
        </p>
      </div>
    `,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow GET for health check
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, webhook: "cakto" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Validate secret if configured
  const webhookSecret = process.env.CAKTO_WEBHOOK_SECRET;
  if (webhookSecret) {
    const secret = req.headers["x-cakto-secret"] || req.headers["x-webhook-secret"] || req.query.secret;
    if (secret !== webhookSecret) {
      console.error("Secret mismatch. Received:", secret ? "yes" : "none");
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  try {
    const body = req.body || {};
    console.log("Webhook received:", JSON.stringify(body));

    // Extract email - Cakto may send as email, customer_email, or customer.email
    const email = body.email || body.customer_email || body.customer?.email || body.buyer?.email;
    if (!email) {
      console.error("No email found in payload:", JSON.stringify(body));
      return res.status(400).json({ error: "Email required", received_keys: Object.keys(body) });
    }

    // Extract status - Cakto may use different field names
    const status = body.status || body.payment_status || body.transaction_status || "approved";

    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).limit(1).get();

    // Compra aprovada
    if (["approved", "paid", "completed", "active"].includes(status)) {
      if (!snapshot.empty) {
        await snapshot.docs[0].ref.update({
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

      await sendWelcomeEmail(email);

      return res.status(200).json({ success: true, action: "granted", email });
    }

    // Reembolso — revoga acesso
    if (["refunded", "refund", "chargeback", "cancelled", "canceled", "disputed"].includes(status)) {
      if (!snapshot.empty) {
        await snapshot.docs[0].ref.update({
          paid: false,
          refundedAt: new Date().toISOString(),
        });
      }
      return res.status(200).json({ success: true, action: "revoked", email });
    }

    return res.status(200).json({ success: true, skipped: true, status });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ error: "Internal server error", message: String(err) });
  }
}
