import { Ctx } from "blitz"
import db from "db"
import { SecurePassword } from "@blitzjs/auth"

interface GetChatResponse {
  message: string
  slug: string
}
export default async function getChatResponse(
  { message, slug }: GetChatResponse,
  { session }: Ctx
) {
  const searchEngine = await db.searchEngine.findFirst({
    where: { slug },
  })
  if (!searchEngine) return { message: "I don't know how to respond to that." }

  const backendUrl = process.env.API_URL + "/api/search/chat/"

  const results = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      search_engine: slug,
      message,
      history: [],
    }),
  })
  const jsonResults = await results.json()

  return {
    message: jsonResults.message,
  }
}
