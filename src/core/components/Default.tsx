import { useCurrentUser } from "../../users/hooks/useCurrentUser"
import { useEffect } from "react"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"

const Default = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
    if (currentUser && currentUser?.memberships[0]?.organization.currentSession) {
      void router.push(
        Routes.ChatSession({
          session_id: [currentUser?.memberships[0].organization.currentSession],
        })
      )
    }
  }, [router])
  return <></>
}

export default Default
