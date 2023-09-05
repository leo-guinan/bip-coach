import { Switch } from "@headlessui/react"
import { Fragment, useState } from "react"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getPreferences from "../queries/getPreferences"
import setPreferencesMutation from "../mutations/setPreferencesMutation"
import { classNames } from "../../../utils"

const Profile = () => {
  const [preferences, { setQueryData }] = useQuery(getPreferences, null)
  const [setPreferences] = useMutation(setPreferencesMutation)
  const [dailyCheckin, setDailyCheckin] = useState(preferences?.daily_checkin)

  const handleChangeDailyCheckin = async () => {
    await setPreferences({
      preferences: { daily_checkin: true },
    })
    await setQueryData({ preferences: { daily_checkin: dailyCheckin } }, { refetch: false })
  }

  return (
    <>
      {/* Settings forms */}
      <div className="divide-y divide-white/5">
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-white">Account Settings</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">Manage your account</p>
          </div>

          <Switch.Group as="div" className="flex items-center justify-between">
            <span className="flex flex-grow flex-col">
              <Switch.Label as="span" className="text-sm font-medium leading-6 text-white" passive>
                Daily Check-in Email
              </Switch.Label>
              <Switch.Description as="span" className="text-sm text-gray-500">
                Do you want to receive a daily check-in email?
              </Switch.Description>
            </span>
            <Switch
              checked={preferences?.daily_checkin}
              onChange={handleChangeDailyCheckin}
              className={classNames(
                preferences?.daily_checkin ? "bg-indigo-600" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  preferences?.daily_checkin ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
          </Switch.Group>
        </div>
      </div>
    </>
  )
}

export default Profile
