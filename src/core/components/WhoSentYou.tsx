import React, { useState } from "react"
import { useRouter } from "next/router"

const WhoSentYou = () => {
  const router = useRouter()

  const [value, setValue] = useState("")
  const handleRoute = (e) => {
    e.preventDefault()
    void router.push(`/${value}`)
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Who sent you?
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
                <button onClick={handleRoute} className="btn">
                  {" "}
                  Go
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default WhoSentYou
