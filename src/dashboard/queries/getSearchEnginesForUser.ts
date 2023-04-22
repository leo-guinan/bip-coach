import db from "../../../db"
import { Ctx } from "blitz"

export default async function getSearchEnginesForUser(_input: {}, ctx: Ctx) {
  ctx.session.$authorize()
  const publicData = ctx.session.$publicData

  if (!publicData.userId) return []
  const user = await db.user.findFirst({
    where: { id: publicData.userId },
  })
  if (!user) return []

  return await db.searchEngine.findMany({
    where: { creatorId: publicData.userId },
  })
}
