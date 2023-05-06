import { resolver } from "@blitzjs/rpc"
import { Ctx } from "blitz"
import db from "db"
import { stripe } from "../../../integrations/stripe"
import { CreateCheckoutSession } from "../../auth/validations"

export default resolver.pipe(
  resolver.zod(CreateCheckoutSession),
  async ({ tierId, period }, ctx: Ctx) => {
    let priceId = -1
    if (tierId === "tier-pro") {
      if (period === "monthly") {
        priceId = 1
      } else if (period === "annual") {
        priceId = 2
      } else {
        priceId = 3 //fallback to lifetime if no period is specified
      }
    } else if (tierId === "tier-life") {
      priceId = 3
    }
    ctx.session.$authorize()
    const publicData = ctx.session.$publicData
    if (!publicData.userId) throw Error("User not found")
    let user = await db.user.findFirst({
      where: { id: publicData.userId },
    })
    if (!user) throw Error("User not found")
    const organization = await db.organization.findFirst({
      where: {
        id: publicData.orgId,
      },
    })
    if (!organization || !organization.stripeCustomerId) throw Error("Organization not found")

    const price = await db.price.findFirst({
      where: { id: priceId },
    })
    if (!price) throw Error("Price not found")
    const session =
      price.type === "recurring"
        ? await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            billing_address_collection: "required",
            customer: organization.stripeCustomerId,
            line_items: [
              {
                price: price.stripeId,
                quantity: 1,
              },
            ],
            mode: "subscription",
            allow_promotion_codes: true,
            subscription_data: {
              trial_from_plan: true,
              metadata: {
                appUserId: user.id,
              },
            },
            success_url: `${process.env.BASE_URL}/dashboard?page=account`,
            cancel_url: `${process.env.BASE_URL}/dashboard?page=account`,
          })
        : await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            billing_address_collection: "required",
            customer: organization.stripeCustomerId,
            line_items: [
              {
                price: price.stripeId,
                quantity: 1,
              },
            ],
            mode: "payment",
            allow_promotion_codes: true,
            payment_intent_data: {
              metadata: {
                appUserId: user.id,
              },
            },
            success_url: `${process.env.BASE_URL}/dashboard?page=account`,
            cancel_url: `${process.env.BASE_URL}/dashboard?page=account`,
          })

    return session.id
  }
)
