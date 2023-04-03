import React, { useState } from "react"
import { useMutation } from "@blitzjs/rpc"
import addRecommendation from "../mutations/addRecommendation"

const RecommendationForm = () => {
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [recommendation, setRecommendation] = useState("")
  const [addRecommendationMutation] = useMutation(addRecommendation)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission logic here
    await addRecommendationMutation({ url, title, recommendation })
    setRecommendation("")
    setUrl("")
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
          URL:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="url"
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Recommendation Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paragraph">
          Recommendation Text:
        </label>
        <textarea
          className="shadow ap0pearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="paragraph"
          placeholder="Recommendation Paragraph"
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value)}
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit Recommendation
      </button>
    </form>
  )
}

export default RecommendationForm
