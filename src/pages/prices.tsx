import Pricing from "../account/components/Pricing"
import React, { Suspense } from "react"
import Chat from "../core/components/Router"
import Layout from "../core/layouts/Layout"

const Prices = () => {
  return (
    <Layout title="Home">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">
          <Suspense fallback="Loading...">
            <Pricing />
          </Suspense>
        </div>
      </div>
    </Layout>
  )
}

export default Prices
