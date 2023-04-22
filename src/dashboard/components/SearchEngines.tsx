import SelectSearchEngine from "./SelectSearchEngine"
import AddSearchEngine from "./AddSearchEngine"
import { useState } from "react"
import ManageSearchEngine from "./ManageSearchEngine"

const SearchEngines = () => {
  const [adding, setAdding] = useState(false)
  const [selectedSearchEngine, setSelectedSearchEngine] = useState(null)
  return (
    <>
      <SelectSearchEngine
        setAdding={setAdding}
        adding={adding}
        setSelectedSearchEngine={setSelectedSearchEngine}
      />
      {adding && <AddSearchEngine setAdding={setAdding} />}
      {selectedSearchEngine && <ManageSearchEngine slug={selectedSearchEngine} />}
    </>
  )
}

export default SearchEngines
