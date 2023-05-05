import db from "../../../db"
import { Ctx } from "blitz"

export default async function getQueriesForSearchEngine(input: { slug: string }, ctx: Ctx) {
  ctx.session.$authorize()
  const publicData = ctx.session.$publicData

  if (!publicData.userId) return []
  const user = await db.user.findFirst({
    where: { id: publicData.userId },
  })
  if (!user) return []
  const podcastLookupUrl = process.env.API_URL + "/api/search/queries/"
  const results = await fetch(podcastLookupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      search_engine: input.slug,
    }),
  })

  const data = await results.json()
  console.log(data)
  if (!data.response) return []
  const queries = data.response.map((item) => {
    return {
      id: item.id,
      query: item.query,
      createdAt: item.created_at,
    }
  })

  return queries
}
