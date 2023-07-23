import { resolver } from "@blitzjs/rpc"
import { SendMessage } from "../../auth/validations"
import { Ctx } from "blitz"
import db from "../../../db"

export default resolver.pipe(resolver.zod(SendMessage), async ({ message }, ctx: Ctx) => {
  const { userId } = ctx.session

  if (!userId) {
    throw new Error("No user ID")
  }

  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      memberships: {
        include: {
          organization: true,
        },
      },
    },
  })

  if (!user) {
    throw new Error("No user")
  }

  const backendUrl = process.env.API_URL + "/api/coach/chat/"

  const results = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      message,
      session_id: user.memberships[0]?.organization.currentSession,
      user_id: user.userId,
    }),
  })
  return results.json()
})
