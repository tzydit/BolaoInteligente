import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore }                  from 'firebase-admin/firestore'
import nodemailer                        from 'nodemailer'

function initAdmin() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId:   process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    })
  }
  return { db: getFirestore() }
}

function extractEmail(body) {
  return (
    body?.customer?.email                 ||
    body?.data?.customer?.email           ||
    body?.data?.purchase?.customer?.email ||
    body?.subscriber?.email               ||
    body?.buyer?.email                    ||
    body?.email                           ||
    body?.customer_email                  ||
    body?.data?.email                     ||
    body?.data?.buyer_email               ||
    null
  )
}

function classifyEvent(body) {
  const event = (
    body?.event  ||
    body?.type   ||
    body?.status ||
    body?.action ||
    ''
  ).toLowerCase()

  const ACTIVATE = [
    'approved', 'active', 'paid', 'completed',
    'purchase.approved', 'purchase_approved',
    'payment.approved',  'payment_approved',
    'sale.approved',     'sale_approved',
    'order.paid',        'order_paid',
  ]

  const DEACTIVATE = [
    'canceled', 'cancelled', 'refunded', 'chargeback', 'expired',
    'purchase.refunded', 'purchase_refunded',
    'refund.requested',  'refund_requested',
    'payment.failed',    'payment_refused',
  ]

  if (ACTIVATE.some(k   => event.includes(k))) return 'activate'
  if (DEACTIVATE.some(k => event.includes(k))) return 'deactivate'
  return null
}

async function sendWelcomeEmail(email) {
  const gmailPass = process.env.GMAIL_APP_PASSWORD
  if (!gmailPass) {
    console.warn('[webhook] GMAIL_APP_PASSWORD not set — skipping email')
    return
  }

  const siteUrl     = process.env.SITE_URL || 'https://bolao-inteligente.vercel.app'
  const registerUrl = `${siteUrl}?register=${encodeURIComponent(email)}`

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'tazzoyez@gmail.com', pass: gmailPass },
  })

  await transporter.sendMail({
    from: 'Bolão Inteligente <tazzoyez@gmail.com>',
    to: email,
    subject: 'Acesso Liberado — Bolão Inteligente',
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
          Bolão Inteligente · Copa do Mundo 2026<br/>
          Este é um e-mail automático, não responda.
        </p>
      </div>
    `,
  })

  console.log(`[webhook] Email sent to ${email}`)
}

export default async function handler(req, res) {
  // Health check
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, service: 'Bolao Inteligente Webhook' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body

  console.log('[webhook] Payload:', JSON.stringify({
    query: req.query,
    headers: {
      'content-type': req.headers['content-type'],
    },
    body: JSON.stringify(body).slice(0, 800),
  }))

  // Token validation
  const secret    = process.env.CAKTO_WEBHOOK_SECRET
  const sentToken =
    req.query.token                                           ||
    req.headers['x-webhook-token']                           ||
    req.headers['x-cakto-token']                             ||
    req.headers['authorization']?.replace(/^Bearer\s+/i, '') ||
    null

  if (secret && sentToken !== secret) {
    console.warn('[webhook] Invalid token. Received:', sentToken)
    return res.status(401).json({ error: 'Invalid token' })
  }

  // Extract email
  const email = extractEmail(body)
  if (!email) {
    console.error('[webhook] No email found. Keys:', Object.keys(body || {}))
    return res.status(400).json({
      error: 'Email not found in payload',
      received_keys: Object.keys(body || {}),
    })
  }

  // Classify event
  const action   = classifyEvent(body)
  const eventRaw = body?.event || body?.type || body?.status || body?.action || '(no event)'

  if (!action) {
    // Default to activate if no recognizable event (Cakto test might not send status)
    console.log('[webhook] Unknown event, defaulting to activate:', eventRaw)
  }

  const { db } = initAdmin()
  const normalEmail = email.toLowerCase().trim()

  // ACTIVATE
  if (action === 'activate' || !action) {
    const usersRef = db.collection('users')
    const snapshot = await usersRef.where('email', '==', normalEmail).limit(1).get()

    if (!snapshot.empty) {
      await snapshot.docs[0].ref.update({
        paid: true,
        paidAt: new Date().toISOString(),
        paymentSource: 'cakto',
        caktoEvent: eventRaw,
      })
    } else {
      await usersRef.add({
        email: normalEmail,
        paid: true,
        paidAt: new Date().toISOString(),
        paymentSource: 'cakto',
        createdAt: new Date().toISOString(),
        caktoEvent: eventRaw,
      })
    }

    try {
      await sendWelcomeEmail(normalEmail)
    } catch (e) {
      console.error('[webhook] Email error (non-fatal):', e.message)
    }

    console.log(`[webhook] ACTIVATED: ${normalEmail}`)
    return res.status(200).json({ ok: true, action: 'activated', email: normalEmail })
  }

  // DEACTIVATE
  if (action === 'deactivate') {
    const usersRef = db.collection('users')
    const snapshot = await usersRef.where('email', '==', normalEmail).limit(1).get()

    if (!snapshot.empty) {
      await snapshot.docs[0].ref.update({
        paid: false,
        refundedAt: new Date().toISOString(),
        caktoEvent: eventRaw,
      })
    }

    console.log(`[webhook] DEACTIVATED: ${normalEmail}`)
    return res.status(200).json({ ok: true, action: 'deactivated', email: normalEmail })
  }
}
