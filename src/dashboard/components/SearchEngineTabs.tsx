import { useState } from "react"
import Links from "./Links"
import Queries from "./Queries"

let tabs = [
  { name: "Links", href: "#", current: true },
  { name: "Searches", href: "#", current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const SearchEngineTabs = ({ slug }) => {
  const [currentTab, setCurrentTab] = useState(tabs?.find((tab) => tab.current)?.name)

  const handleSetCurrentTab = (tabName: string) => {
    tabs = tabs.map((tab) => {
      if (tab.name === tabName) {
        tab.current = true
      } else {
        tab.current = false
      }
      return tab
    })
    setCurrentTab(tabName)
  }

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-none bg-white/5 py-2 pl-3 pr-10 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
              defaultValue={tabs?.find((tab) => tab.current)?.name}
              onChange={(event) => handleSetCurrentTab(event.target.value)}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="flex border-b border-white/10 py-4">
              <ul
                role="list"
                className="flex min-w-full flex-none gap-x-6 px-2 text-sm font-semibold leading-6 text-gray-400"
              >
                {tabs.map((tab) => (
                  <li key={tab.name}>
                    <a
                      onClick={() => handleSetCurrentTab(tab.name)}
                      className={tab.current ? "text-indigo-400" : "cursor-pointer"}
                    >
                      {tab.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        {currentTab === "Links" && (
          <>
            <Links slug={slug} />
          </>
        )}
        {currentTab === "Searches" && (
          <>
            <Queries slug={slug} />
          </>
        )}
      </div>
    </div>
  )
}

export default SearchEngineTabs
