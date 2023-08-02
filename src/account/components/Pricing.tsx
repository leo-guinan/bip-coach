import { CheckIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import { RadioGroup } from "@headlessui/react"
import { classNames } from "../../../utils"
import { getStripe } from "../../../integrations/stripe-client"
import { useMutation } from "@blitzjs/rpc"
import { useCurrentUser } from "../../users/hooks/useCurrentUser"
import createCheckoutSession from "../mutations/createCheckoutSession"

const tiers = [
  {
    name: "Monthly",
    id: "tier-monthly",
    href: "#",
    price: "$5",
    mostPopular: false,
    description: "Get the help you need while building in public",
    features: ["Unlimited chats monthly"],
    type: "Monthly",
    priceId: 5,
  },
  {
    name: "Annual",
    id: "tier-annual",
    href: "#",
    price: "$25",
    mostPopular: true,
    description: "Get the help you need while building in public",
    features: ["Unlimited chats monthly", "Access to private community"],
    type: "Annually",
    priceId: 4,
  },
  {
    name: "Annual + Live Coaching Monthly (limited deal)",
    id: "tier-coaching",
    href: "#",
    price: "$50",
    mostPopular: false,
    description: "Get the help you need while building in public",
    features: [
      "Unlimited chats monthly",
      "Access to private community",
      "monthly 30 minute live coaching session",
    ],
    type: "Annually",
    priceId: 3,
  },
]
const Pricing = () => {
  const [loading, setLoading] = useState(false)
  const user = useCurrentUser()
  const [priceIdLoading, setPriceIdLoading] = useState<string>()
  const [createCheckoutSessionMutation] = useMutation(createCheckoutSession)

  const handleSubscribe = async (tierId) => {
    const priceId = tiers.find((tier) => tier.id === tierId)?.priceId
    if (!priceId) return alert("Invalid Price")
    setLoading(true)

    try {
      const sessionId = await createCheckoutSessionMutation({
        priceId,
      })
      const stripe = await getStripe()
      await stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      return alert((error as Error)?.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <span>Loading....</span>
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Individual coaching at a price you can afford
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Get the help you need while building in public, at a price you can afford. The best
          founders have access to great coaches. Now you can too!
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8",
                tierIdx === 0 ? "lg:rounded-r-none" : "",
                tierIdx === tiers.length - 1 ? "lg:rounded-l-none" : "",
                "flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular ? "text-indigo-600" : "text-gray-900",
                      "text-lg font-semibold leading-8"
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {tier.price}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /{tier.type}
                  </span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                onClick={() => handleSubscribe(tier.id)}
                className={classNames(
                  tier.mostPopular
                    ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                    : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                  "mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                )}
              >
                Buy plan
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pricing
