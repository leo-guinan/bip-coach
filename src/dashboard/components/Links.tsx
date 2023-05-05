import { useState } from "react"
import addLink from "../mutations/addLink"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getLinksForSearchEngine from "../queries/getLinksForSearchEngine"

const Links = ({ slug }) => {
  const [addingLink, setAddingLink] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [url, setUrl] = useState("")
  const [image, setImage] = useState("")
  const [addLinkMutation] = useMutation(addLink)
  const [links, { setQueryData }] = useQuery(getLinksForSearchEngine, { slug })

  const handleAddLink = async (e) => {
    e.preventDefault()
    console.log("adding link")
    try {
      await addLinkMutation({ slug, title, description, url, image })
      await setQueryData((oldData) => [...oldData, { title, description, url, image }], {
        refetch: false,
      })
      setAddingLink(false)
      setTitle("")
      setDescription("")
      setUrl("")
      setImage("")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="">
        {addingLink && (
          <>
            <form>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-indigo-400">New Link</h2>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-6 text-indigo-400"
                      >
                        Title
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="title"
                            id="title"
                            autoComplete="title"
                            onChange={(e) => setTitle(e.target.value)}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-400 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="title of the link"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-indigo-400"
                      >
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          onChange={(e) => setDescription(e.target.value)}
                          className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-indigo-400">Describe this link</p>
                    </div>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-6 text-indigo-400"
                      >
                        URL
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="url"
                            name="url"
                            id="url"
                            autoComplete="url"
                            onChange={(e) => setUrl(e.target.value)}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-400 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="url of the link"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-6 text-indigo-400"
                      >
                        Image Link
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="image"
                            id="image"
                            autoComplete="image"
                            onChange={(e) => setImage(e.target.value)}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-400 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="image url for the link"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-indigo-400">
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleAddLink}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </>
        )}
        <div className="sm:flex sm:items-center py-4">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-400">
              A list of all the links included in your search engine
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            {!addingLink && (
              <button
                type="button"
                onClick={() => setAddingLink(true)}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Link
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
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-indigo-400 sm:pl-0"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-indigo-400"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-indigo-400"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-indigo-400"
                    >
                      URL
                    </th>
                    {/*<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">*/}
                    {/*  <span className="sr-only">Edit</span>*/}
                    {/*</th>*/}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {links.map((link) => (
                    <tr key={link.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-indigo-400 sm:pl-0">
                        {link.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {link.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {link.image}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {link.url}
                      </td>
                      {/*<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>*/}
                      {/*<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">*/}
                      {/*  <a href="#" className="text-indigo-600 hover:text-indigo-900">*/}
                      {/*    Edit<span className="sr-only">, {person.name}</span>*/}
                      {/*  </a>*/}
                      {/*</td>*/}
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

export default Links
