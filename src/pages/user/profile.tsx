import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Suspense } from "react"
import Profile from "../../users/components/Profile"

const ProfilePage: BlitzPage = () => {
  return (
    <Layout title="User Profile">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">
          <Suspense fallback="Loading...">
            <Profile />
          </Suspense>
        </div>
      </div>
    </Layout>
  )
}

ProfilePage.authenticate = {
  redirectTo: "/login",
}
export default ProfilePage
