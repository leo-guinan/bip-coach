import { BlitzPage } from "@blitzjs/next"
import { Suspense } from "react"
import Admin from "../admin/components/Admin"

const AdminPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Admin />
    </Suspense>
  )
}

export default AdminPage
