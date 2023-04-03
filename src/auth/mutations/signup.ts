import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Role } from "types"
import { Signup } from "../validations"

export default resolver.pipe(resolver.zod(Signup), async ({ email, password }, ctx) => {
  const backendUrl = process.env.API_URL + "/api/user/add/"

  const hashedPassword = await SecurePassword.hash(password.trim())
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

  const user = await db.user.create({
    data: { email: email.toLowerCase().trim(), hashedPassword, role: "USER", userId },
    select: { id: true, name: true, email: true, role: true },
  })

  await ctx.session.$create({ userId: user.id, role: user.role as Role })
  return user
})
