import React, { Suspense, useEffect } from "react"
import PodcastRecommendations from "./PodcastRecommendations"
import Facts from "./Facts"
import { useCurrentUser } from "../../users/hooks/useCurrentUser"
import AddRecommendation from "./AddRecommendation"

const Admin = () => {
  const currentUser = useCurrentUser()

  useEffect(() => {
    if (currentUser) {
      console.log("currentUser role", currentUser.role)
    }
  }, [currentUser])

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {currentUser && currentUser.role === "admin" && (
          <>
            <h1>This is an admin page</h1>
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                <AddRecommendation />
              </Suspense>
            </div>
          </>
        )}
      </Suspense>
      {(!currentUser || currentUser.role !== "admin") && (
        <>
          <h1>You are not an admin</h1>
        </>
      )}
    </>
  )
}

export default Admin
