import Layout from "../core/layouts/Layout"
import React, { Suspense } from "react"
import StartSession from "../chat/components/StartSession"
import { BlitzPage } from "@blitzjs/next"

const ErrorPage: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold text-red-600">
            Something went wrong! <br />
          </h1>
        </div>
      </div>
    </Layout>
  )
}

export default ErrorPage
