import { useQuery } from "@blitzjs/rpc"
import getSlug from "../queries/getSlug"

const DynamicLandingPage = ({ slug }) => {
  const [landingPage] = useQuery(getSlug, { slug })
  return (
    <>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {landingPage.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">{landingPage.body}</p>
        </div>
      </div>
    </>
  )
}

export default DynamicLandingPage
