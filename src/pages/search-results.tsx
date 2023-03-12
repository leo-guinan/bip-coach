import { BlitzPage } from "@blitzjs/next"
import { useRouter } from "next/router"
import React, { Suspense, useEffect } from "react"
import SearchResults from "../core/components/SearchResults"
import { useQuery } from "@blitzjs/rpc"
import getSearchResults from "../search/queries/getSearchResults"
import Header from "../core/components/Header"

const SearchResultsPage: BlitzPage = () => {
  const router = useRouter()
  const [results] = useQuery(getSearchResults, { query: router.query.term as string })

  useEffect(() => {
    console.log(router.query.term)
  }, [router.query.term])

  return (
    <div>
      {/*  Header */}

      <Header />
      <Suspense fallback="Loading...">
        {/* Search Results */}
        <SearchResults results={results} />
      </Suspense>
    </div>
  )
}

export default SearchResultsPage