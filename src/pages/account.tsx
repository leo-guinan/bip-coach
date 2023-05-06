import { Suspense } from "react"
import AccountData from "../account/components/AccountData"

export default function Account() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountData />
    </Suspense>
  )
}
