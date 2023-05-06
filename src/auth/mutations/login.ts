import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import { AuthenticationError } from "blitz"
import db from "db"
import { Role } from "types"
import { Login } from "../validations"
import { stripe } from "../../../integrations/stripe"

export const authenticateUser = async (rawEmail: string, rawPassword: string) => {
  const { email, password } = Login.parse({ email: rawEmail, password: rawPassword })
  const user = await db.user.findFirst({ where: { email } })
  if (!user) throw new AuthenticationError()

  const result = await SecurePassword.verify(user.hashedPassword, password)

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    // Upgrade hashed password with a more secure hash
    const improvedHash = await SecurePassword.hash(password)
    await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } })
  }

  if (!user.userId) {
    const backendUrl = process.env.API_URL + "/api/user/add/"
    const results = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Key ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
      }),
    })
    const jsonResults = await results.json()
    const userId = jsonResults.user_id
    await db.user.update({ where: { id: user.id }, data: { userId } })
  }

  const { hashedPassword, ...rest } = user
  return rest
}

export default resolver.pipe(resolver.zod(Login), async ({ email, password }, ctx) => {
  // This throws an error if credentials are invalid
  const user = await authenticateUser(email, password)
  let organization = await db.organization.findFirst({
    where: {
      memberships: {
        some: {
          userId: user.id,
        },
      },
    },
  })
  if (!organization) {
    const customerData: { metadata: { appUserId: number }; email: string } = {
      metadata: {
        appUserId: user.id,
      },
      email: user.email,
    }
    const customer = await stripe.customers.create(customerData)
    organization = await db.organization.create({
      data: {
        name: "",
        stripeCustomerId: customer.id,
        memberships: {
          create: {
            role: "OWNER",
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        },
      },
    })
  }
  await ctx.session.$create({ userId: user.id, role: user.role as Role, orgId: organization.id })

  return user
})
