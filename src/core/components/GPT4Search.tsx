import React, { useState } from "react"
import { useMutation } from "@blitzjs/rpc"
import search from "../../search/mutations/search"

type SearchResult = {
  title: string
  link: string
  snippet: string
  description: string
}

type SearchEngineProps = {
  slug: string
}

const GPT4Search: React.FC<SearchEngineProps> = ({ slug }) => {
  const [resultQuery, setResultQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searchMutation] = useMutation(search)
  const handleSearch = async () => {
    // Execute search or API call using resultQuery
    // Example:
    // setSearchResults(API.search(resultQuery))
    const raw = await searchMutation({ query: resultQuery, slug })

    setSearchResults(raw)
  }

  return (
    <div className="p-10">
      <div className="relative flex w-full truncate items-center justify-center">
        <div className="w-full">
          <input
            onChange={(e) => setResultQuery(e.target.value)}
            value={resultQuery}
            type="text"
            className="shadow p-4 text-lg w-full border rounded animate focus:ring-black focus:ring transition ease-in duration-200 focus:outline-none"
            placeholder="Search..."
          />
          <button onClick={handleSearch} className="absolute right-4 top-4 focus:outline-none">
            <i className="material-icons">search</i>
          </button>
        </div>
      </div>
      <div className="px-2 pt-10">
        {searchResults.map((result, index) => (
          <div key={index} className="mb-8">
            <a
              href={result.link}
              className="text-blue-900 font-bold hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {result.title}
            </a>
            <div className="text-green-dark">{result.link}</div>
            {result.description && <p>{result.description}</p>}
            {result.snippet && <p>{result.snippet}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GPT4Search
