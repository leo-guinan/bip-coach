import { resolver } from "@blitzjs/rpc"
import { AddSearchEngine } from "../../auth/validations"
import db from "db"
import { Ctx } from "blitz"
export default resolver.pipe(
  resolver.zod(AddSearchEngine),
  async ({ title, description, slug }, ctx: Ctx) => {
    ctx.session.$authorize()
    const publicData = ctx.session.$publicData
    if (!publicData.userId) return []
    const user = await db.user.findFirst({
      where: { id: publicData.userId },
    })
    if (!user) return []
    const searchEngine = await db.searchEngine.create({
      data: {
        title,
        body: description,
        slug,
        creator: {
          connect: { id: publicData.userId },
        },
      },
    })

    const podcastLookupUrl = process.env.API_URL + "/api/search/create/"
    await fetch(podcastLookupUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Key ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        search_engine: slug,
      }),
    })

    return searchEngine
  }
)
