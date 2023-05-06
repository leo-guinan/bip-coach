import db from "db"
import { Ctx } from "blitz"
import { stripe } from "../../../integrations/stripe"

export default async function getCustomerPortalUrl({}, ctx: Ctx) {
  ctx.session.$authorize()
  const publicData = ctx.session.$publicData

  if (!publicData.userId || !publicData.orgId) throw Error("User not found")
  const organization = await db.organization.findFirst({
    where: { id: publicData.orgId },
  })

  if (!organization || !organization.stripeCustomerId) throw Error("Organization not found")
  const { url } = await stripe.billingPortal.sessions.create({
    customer: organization.stripeCustomerId,
    return_url: `${process.env.BASE_URL}/dashboard?page=account`,
  })
  console.log(url)
  return url
}
