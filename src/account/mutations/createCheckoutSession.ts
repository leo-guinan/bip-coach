import { resolver } from "@blitzjs/rpc"
import { Ctx } from "blitz"
import db from "db"
import { stripe } from "../../../integrations/stripe"
import { CreateCheckoutSession } from "../../auth/validations"

export default resolver.pipe(resolver.zod(CreateCheckoutSession), async ({ priceId }, ctx: Ctx) => {
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
  const session = await stripe.checkout.sessions.create({
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
    success_url: `${process.env.BASE_URL}/`,
    cancel_url: `${process.env.BASE_URL}/`,
  })

  return session.id
})
