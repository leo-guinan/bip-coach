import { resolver } from "@blitzjs/rpc"
import { AddRecommendation } from "../../auth/validations"
import db from "db"

export default resolver.pipe(
  resolver.zod(AddRecommendation),
  async ({ title, url, recommendation }, ctx) => {
    if (!ctx.session.userId) throw new Error("Not authenticated")
    const user = await db.user.findFirst({ where: { id: ctx.session.userId } })
    if (!user) throw new Error("Not authenticated")

    const backendUrl = process.env.API_URL + "/api/search/add/"
    const results = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Key ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        user_id: user.userId,
        url,
        title,
        recommendation,
      }),
    })

    const data = await results.json()
    return { status: data.status }
  }
)
