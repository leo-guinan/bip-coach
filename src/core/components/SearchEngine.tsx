import { useQuery } from "@blitzjs/rpc"
import getSlug from "../queries/getSlug"
import GPT4Search from "./GPT4Search"

const SearchEngine = ({ slug }) => {
  const [searchEngine] = useQuery(getSlug, { slug })
  return (
    <>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {searchEngine.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">{searchEngine.body}</p>
        </div>
        <GPT4Search slug={slug} />
      </div>
    </>
  )
}

export default SearchEngine
