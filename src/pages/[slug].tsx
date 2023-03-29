import { useRouter } from "next/router"
import { Suspense } from "react"
import DynamicLandingPage from "../core/components/DynamicLandingPage"

const LandingPage = () => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicLandingPage slug={slug} />
      </Suspense>
    </div>
  )
}

export default LandingPage
