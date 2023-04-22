import { resolver } from "@blitzjs/rpc"
import { AddLink } from "../../auth/validations"
import db from "db"
import { Ctx } from "blitz"
export default resolver.pipe(
  resolver.zod(AddLink),
  async ({ title, description, slug, url, image }, ctx: Ctx) => {
    ctx.session.$authorize()
    const publicData = ctx.session.$publicData
    if (!publicData.userId) return []
    const user = await db.user.findFirst({
      where: { id: publicData.userId },
    })
    if (!user) return []

    const backendUrl = process.env.API_URL + "/api/search/add/"
    await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Key ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        search_engine: slug,
        title: title,
        description: description,
        url: url,
        image: image,
      }),
    })

    return { success: "true" }
  }
)
