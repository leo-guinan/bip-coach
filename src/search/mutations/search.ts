import { resolver } from "@blitzjs/rpc"
import { Search } from "../../auth/validations"

export default resolver.pipe(resolver.zod(Search), async ({ query }, ctx) => {
  const podcastLookupUrl = process.env.API_URL + "/api/search/"
  const results = await fetch(podcastLookupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      query,
    }),
  })

  const data = await results.json()
  console.log(data)

  if (data.response) {
    return data.response
  } else {
    return "There was an error. Please try again."
  }
})
