import { resolver } from "@blitzjs/rpc"
import { StartSession } from "../../auth/validations"
import { Ctx } from "blitz"
import db from "db"

type Response = { session_id: string }

export default resolver.pipe(
  resolver.zod(StartSession),
  async ({ sessionType }, ctx: Ctx): Promise<Response> => {
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
    const backendUrl = process.env.API_URL + "/api/coach/start_daily/"

    const results = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Key ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        user_id: user.userId,
        chat_type: sessionType,
      }),
    })
    return results.json()
  }
)
