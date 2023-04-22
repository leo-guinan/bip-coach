import { useQuery } from "@blitzjs/rpc"
import getSearchEnginesForUser from "../queries/getSearchEnginesForUser"

const SelectSearchEngine = ({ adding, setAdding, setSelectedSearchEngine }) => {
  const [searchEngines] = useQuery(getSearchEnginesForUser, {})
  const handleSelectSearchEngine = (e) => {
    e.preventDefault()
    console.log(e.target.dataset.slug)
    setSelectedSearchEngine(e.target.dataset.slug)
  }
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Search Engines</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the search engines you are currently managing.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            {!adding && (
              <button
                type="button"
                onClick={() => setAdding(true)}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add search engine
              </button>
            )}
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>
                    {/*<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">*/}
                    {/*  Title*/}
                    {/*</th>*/}
                    {/*<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">*/}
                    {/*  Email*/}
                    {/*</th>*/}
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Select</span>
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {searchEngines.map((searchEngine) => (
                    <tr key={searchEngine.slug}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {searchEngine.title}
                      </td>
                      {/*<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{searchEngine.title}</td>*/}
                      {/*<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>*/}
                      {/*<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>*/}
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                          data-slug={searchEngine.slug}
                          onClick={handleSelectSearchEngine}
                        >
                          Select<span className="sr-only">, {searchEngine.title}</span>
                        </a>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {searchEngine.title}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SelectSearchEngine
