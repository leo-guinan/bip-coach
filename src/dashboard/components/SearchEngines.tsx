import SelectSearchEngine from "./SelectSearchEngine"
import AddSearchEngine from "./AddSearchEngine"
import { useState } from "react"
import ManageSearchEngine from "./ManageSearchEngine"
import Breadcrumbs, { PageHistory } from "./Breadcrumbs"
import { useQuery } from "@blitzjs/rpc"
import getSearchEnginesForUser from "../queries/getSearchEnginesForUser"

const SearchEngines = () => {
  const [searchEngines, { setQueryData }] = useQuery(getSearchEnginesForUser, {})
  const [adding, setAdding] = useState(false)
  const [selectedSearchEngine, setSelectedSearchEngine] = useState<string>("")
  const [pages, setPages] = useState<PageHistory[]>([
    {
      name: "Search Engines",
      href: "#",
      current: true,
    },
  ])

  const handleSetSelectedSearchEngine = (slug: string) => {
    setSelectedSearchEngine(slug)
    setPages([
      {
        name: "Search Engines",
        href: "/dashboard",
        current: false,
      },
      {
        name: slug,
        href: "#",
        current: true,
      },
    ])
  }

  return (
    <>
      <div className="py-4">
        <Breadcrumbs pages={pages} />
      </div>
      {!adding && !selectedSearchEngine && (
        <SelectSearchEngine
          searchEngines={searchEngines}
          setAdding={setAdding}
          adding={adding}
          setSelectedSearchEngine={handleSetSelectedSearchEngine}
        />
      )}
      {adding && (
        <AddSearchEngine
          setAdding={setAdding}
          addSearchEngineQueryData={setQueryData}
          searchEngines={searchEngines}
        />
      )}
      {selectedSearchEngine && <ManageSearchEngine slug={selectedSearchEngine} />}
    </>
  )
}

export default SearchEngines
