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
    name: "Pro",
    id: "tier-pro",
    href: "#",
    price: "$50",
    description: "Build all the search engines you need!",
    features: [
      "Unlimited Search Engines",
      " Unlimited monthly searches",
      "View searched queries",
      "View clicked links",
    ],
    type: "recurring",
    priceId: 1,
  },
  {
    name: "Lifetime (limited deal)",
    id: "tier-life",
    href: "#",
    price: "$5000",
    description: "Unlimited lifetime access to all features and monthly consulting sessions",
    features: [
      "Unlimited Search Engines",
      "Unlimited monthly searches",
      "View searched queries",
      "View clicked links",
      "Monthly consulting sessions",
      "We will populate all of your links for you",
    ],
    type: "lifetime",
    priceId: 2,
  },
]
const frequencies: {
  value: "monthly" | "annual"
  label: string
  priceSuffix: string
  price: number
}[] = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month", price: 50 },
  { value: "annual", label: "Annually", priceSuffix: "/year", price: 500 },
]
const Pricing = () => {
  const [frequency, setFrequency] = useState(frequencies[0])
  const [loading, setLoading] = useState(false)
  const user = useCurrentUser()
  const [priceIdLoading, setPriceIdLoading] = useState<string>()
  const [createCheckoutSessionMutation] = useMutation(createCheckoutSession)

  const handleSubscribe = async (tierId) => {
    const priceId = tiers.find((tier) => tier.id === tierId)?.priceId
    if (!priceId) return alert("Invalid Price")
    setLoading(true)
    // if (!user) {
    //   return router.push('/signin');
    // }
    // if (subscription) {
    //   return router.push('/account');
    // }

    try {
      const sessionId = await createCheckoutSessionMutation({
        tierId,
        period: frequency?.value,
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
    <div className="isolate overflow-hidden bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            The right price for you, <br className="hidden sm:inline lg:hidden" />
            whoever you are
          </p>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-lg leading-8 text-white/60">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos
            odit doloribus molestiae voluptatum.
          </p>
          <svg
            viewBox="0 0 1208 1024"
            className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
          >
            <ellipse
              cx={604}
              cy={512}
              fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)"
              rx={604}
              ry={512}
            />
            <defs>
              <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flow-root bg-white pb-24 sm:pb-32">
        <div className="-mt-80">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
                >
                  {tier.type !== "lifetime" && (
                    <div className="flex justify-center">
                      <RadioGroup
                        value={frequency}
                        onChange={setFrequency}
                        className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
                      >
                        <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
                        {frequencies.map((option) => (
                          <RadioGroup.Option
                            key={option.value}
                            value={option}
                            className={({ checked }) =>
                              classNames(
                                checked ? "bg-indigo-600 text-white" : "text-gray-500",
                                "cursor-pointer rounded-full px-2.5 py-1"
                              )
                            }
                          >
                            <span>{option.label}</span>
                          </RadioGroup.Option>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
                  <div>
                    <h3 id={tier.id} className="text-base font-semibold leading-7 text-indigo-600">
                      {tier.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        {tier.type === "lifetime" ? tier.price : frequency?.price}
                      </span>
                      <span className="text-base font-semibold leading-7 text-gray-600">
                        {tier.type !== "lifetime" && frequency?.priceSuffix}
                      </span>
                    </div>
                    <p className="mt-6 text-base leading-7 text-gray-600">{tier.description}</p>
                    <ul role="list" className="mt-10 space-y-4 text-sm leading-6 text-gray-600">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon
                            className="h-6 w-5 flex-none text-indigo-600"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {user && (
                    <a
                      href={tier.href}
                      aria-describedby={tier.id}
                      onClick={() => handleSubscribe(tier.id)}
                      className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Get started today
                    </a>
                  )}
                  {!user && (
                    <a
                      href="/signup"
                      aria-describedby={tier.id}
                      className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Start for free
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing
