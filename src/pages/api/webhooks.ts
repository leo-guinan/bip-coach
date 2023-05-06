import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import { Readable } from "node:stream"
import { stripe } from "../../../integrations/stripe"
import db, { Level } from "db"

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

async function buffer(readable: Readable) {
  const chunks: Uint8Array[] = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
])

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req)
    const sig = req.headers["stripe-signature"]
    const webhookSecret =
      process.env.STRIPE_WEBHOOK_SECRET_LIVE ?? process.env.STRIPE_WEBHOOK_SECRET
    let event: Stripe.Event

    try {
      console.log("🔔 Webhook received!")
      if (!sig || !webhookSecret) return
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`)
      return res.status(400).json(`Webhook Error: ${err.message}`)
    }

    console.log("🔔 Webhook received!", event.type)

    if (relevantEvents.has(event.type)) {
      try {
        switch (event.type) {
          case "customer.subscription.created":
          case "customer.subscription.updated":
          case "customer.subscription.deleted":
            const subscription = event.data.object as Stripe.Subscription
            const priceId = subscription?.items?.data[0]?.price.id
            const price = await db.price.findFirst({
              where: {
                stripeId: priceId,
              },
            })
            await db.organization.update({
              where: { stripeCustomerId: subscription.customer as string },
              data: {
                subscriptionStatus: subscription.status,
                price: {
                  connect: {
                    id: price?.id,
                  },
                },
                subscriptionId: subscription?.items?.data[0]?.id,
                level: Level.PRO,
              },
            })
            break
          case "checkout.session.completed":
            const checkoutSession = event.data.object as Stripe.Checkout.Session
            console.log(checkoutSession)
            if (checkoutSession.mode === "subscription") {
              const subscriptionId = checkoutSession.subscription
              console.log("Subscription created!")
              await db.organization.update({
                where: { stripeCustomerId: checkoutSession.customer as string },
                data: {
                  subscriptionStatus: "active",
                },
              })
            } else {
              await db.organization.update({
                where: { stripeCustomerId: checkoutSession.customer as string },
                data: {
                  level: Level.LIFER,
                },
              })
            }
            break
          default:
            throw new Error("Unhandled relevant event!")
        }
      } catch (error) {
        console.log(error)
        return res.status(400).json('Webhook error: "Webhook handler failed. View logs."')
      }
    }

    res.status(200).json({ received: true })
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}

export default webhookHandler
