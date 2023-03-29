import { Ctx } from "blitz"
import db from "db"

interface GetSlug {
  slug: string
}
export default async function getSlug({ slug }: GetSlug, { session }: Ctx) {
  const landingPage = await db.landingPage.findFirst({
    where: { slug },
  })
  if (!landingPage)
    return {
      title: "This is a default landing page",
      body: "To get something better, find someone who can help you.",
    }

  return {
    title: landingPage.title,
    body: landingPage.body,
  }
}
