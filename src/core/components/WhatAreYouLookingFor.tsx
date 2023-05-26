import React, { useState } from "react"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import search from "../../search/mutations/search"

type SearchResult = {
  title: string
  link: string
  snippet: string
  description: string
}
const WhatAreYouLookingFor = () => {
  const router = useRouter()
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searchMutation] = useMutation(search)

  const [value, setValue] = useState("")
  const handleSearch = async (e) => {
    e.preventDefault()
    const raw = await searchMutation({ query: value, slug: "global" })

    setSearchResults(raw)
  }
  return (
    <>
      {searchResults.length === 0 && (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                What are you looking for?
              </h2>
              <form className="flex flex-col items-center flex-grow w-4/5">
                <div className="flex w-full mt-5 hover:shadow-lg focus-within:shadow-lg max-w-md rounded-full border border-gray-200 px-5 py-3 items-center sm:max-w-xl lg:max-w-2xl">
                  <input
                    type="text"
                    className="flex-grow  focus:outline-none border-none overflow-hidden"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col w-1/2 space-y-2 justify-center mt-8 sm:space-y-0 sm:flex-row sm:space-x-4">
                  <button onClick={handleSearch} className="btn">
                    {" "}
                    Go
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {searchResults && (
        <div className="p-10">
          <div className="relative flex w-full truncate items-center justify-center">
            <div className="w-full">
              <input
                onChange={(e) => setValue(e.target.value)}
                value={value}
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
      )}
    </>
  )
}

export default WhatAreYouLookingFor
