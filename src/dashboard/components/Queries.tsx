import { useQuery } from "@blitzjs/rpc"
import getQueriesForSearchEngine from "../queries/getQueriesForSearchEngine"

const Queries = ({ slug }) => {
  const [queries] = useQuery(getQueriesForSearchEngine, { slug })

  return (
    <>
      <div className="">
        <div className="sm:flex sm:items-center py-4">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-400">
              A list of all the queries people searched for on your search engine
            </p>
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
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-indigo-400 sm:pl-0"
                    >
                      Query
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-indigo-400"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {queries.map((query) => (
                    <tr key={query.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-indigo-400 sm:pl-0">
                        {query.query}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {query.createdAt}
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

export default Queries
