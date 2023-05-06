import { ReactNode, useState } from "react"
import { useCurrentUser } from "../../users/hooks/useCurrentUser"
import { useQuery } from "@blitzjs/rpc"
import Pricing from "./Pricing"
import getCustomerPortalUrl from "../queries/getCustomerPortalUrl"

interface Props {
  title: string
  description?: string
  footer?: ReactNode
  children: ReactNode
}

function Card({ title, description, footer, children }: Props) {
  return (
    <div className="border border-zinc-700	max-w-3xl w-full p rounded-md m-auto my-8">
      <div className="px-5 py-4">
        <h3 className="text-2xl mb-1 font-medium">{title}</h3>
        <p className="text-zinc-300">{description}</p>
        {children}
      </div>
      <div className="border-t border-zinc-700 bg-zinc-900 p-4 text-zinc-500 rounded-b-md">
        {footer}
      </div>
    </div>
  )
}

const AccountData = () => {
  const [loading, setLoading] = useState(false)
  const user = useCurrentUser()
  const [customerPortalUrl] = useQuery(getCustomerPortalUrl, {})
  const subscribed =
    user?.memberships[0]?.organization.level === "LIFER" ||
    user?.memberships[0]?.organization.subscriptionStatus === "active"

  const redirectToCustomerPortal = async () => {
    setLoading(true)
    window.location.assign(customerPortalUrl)
    setLoading(false)
  }

  return (
    <>
      {!subscribed && <Pricing />}
      {subscribed && (
        <Card
          title="You are subscribed!"
          description="You can manage your subscription from your account."
          footer={
            <button
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-500 font-semibold py-2 px-4 rounded-md"
              onClick={redirectToCustomerPortal}
              disabled={loading}
            >
              Manage Subscription
            </button>
          }
        >
          <div className="flex items-center justify-between">Your subscription is active!</div>
        </Card>
      )}
    </>
  )
}

export default AccountData
