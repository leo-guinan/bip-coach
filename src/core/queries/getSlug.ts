import { Ctx } from "blitz"
import db from "db"

interface GetSlug {
  slug: string
}
export default async function getSlug({ slug }: GetSlug, { session }: Ctx) {
  const searchEngine = await db.searchEngine.findFirst({
    where: { slug },
  })
  if (!searchEngine)
    return {
      title: "This is a default landing page",
      body: "To get something better, find someone who can help you.",
    }

  return {
    title: searchEngine.title,
    body: searchEngine.body,
  }
}
