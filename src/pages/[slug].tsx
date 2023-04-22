import { useRouter } from "next/router"
import { Suspense } from "react"
import SearchEngine from "../core/components/SearchEngine"

const LandingPage = () => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchEngine slug={slug} />
      </Suspense>
    </div>
  )
}

export default LandingPage
