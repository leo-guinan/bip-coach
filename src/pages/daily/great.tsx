import React, { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import StartSession from "../../chat/components/StartSession"

const DailyGreatPage: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">
          <Suspense fallback="Loading...">
            <StartSession chatType="daily_great" />
          </Suspense>
        </div>
      </div>
    </Layout>
  )
}

export default DailyGreatPage
