import React, { Fragment, Suspense, useState } from "react"
import Head from "next/head"
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  MicrophoneIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { Dialog, Transition } from "@headlessui/react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import SearchEngines from "../dashboard/components/SearchEngines"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const DashboardPage = () => {
  const [page, setPage] = useState("Search Engines")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigation = [
    {
      name: "Search Engines",
      icon: MagnifyingGlassIcon,
      current: !page || page === "Search Engines",
    },
  ]
  const referralLinks = [
    { id: 1, name: "Why You Recommend CYA", href: "#", initial: "Y", current: false },
    { id: 2, name: "Your Referrals", href: "#", initial: "R", current: false },
  ]

  return (
    <>
      <Head>
        <title>{"Choose Your Algorithm"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback="Loading...">
        <>
          <div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
              <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-900/80" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
                          <button
                            type="button"
                            className="-m-2.5 p-2.5"
                            onClick={() => setSidebarOpen(false)}
                          >
                            <span className="sr-only">Close sidebar</span>
                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                          </button>
                        </div>
                      </Transition.Child>
                      {/* Sidebar component, swap this element with another sidebar if you like */}
                      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-2">
                        <div className="flex h-16 shrink-0 items-center">
                          <img className="h-8 w-auto" src="/logo.png" alt="Choose Your Algorithm" />
                        </div>
                        <nav className="flex flex-1 flex-col">
                          <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                              <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => (
                                  <li key={item.name}>
                                    <a
                                      className={classNames(
                                        item.current
                                          ? "bg-indigo-700 text-white"
                                          : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                      )}
                                      onClick={() => {
                                        setPage(item.name)
                                        setSidebarOpen(false)
                                      }}
                                    >
                                      <item.icon
                                        className={classNames(
                                          item.current
                                            ? "text-white"
                                            : "text-indigo-200 group-hover:text-white",
                                          "h-6 w-6 shrink-0"
                                        )}
                                        aria-hidden="true"
                                      />
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </li>
                            {/*<li>*/}
                            {/*  <div className="text-xs font-semibold leading-6 text-indigo-200">*/}
                            {/*    Referrals*/}
                            {/*  </div>*/}
                            {/*  <ul role="list" className="-mx-2 mt-2 space-y-1">*/}
                            {/*    {referralLinks.map((team) => (*/}
                            {/*      <li key={team.name}>*/}
                            {/*        <a*/}
                            {/*          href={team.href}*/}
                            {/*          className={classNames(*/}
                            {/*            team.current*/}
                            {/*              ? "bg-indigo-700 text-white"*/}
                            {/*              : "text-indigo-200 hover:text-white hover:bg-indigo-700",*/}
                            {/*            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"*/}
                            {/*          )}*/}
                            {/*        >*/}
                            {/*          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">*/}
                            {/*            {team.initial}*/}
                            {/*          </span>*/}
                            {/*          <span className="truncate">{team.name}</span>*/}
                            {/*        </a>*/}
                            {/*      </li>*/}
                            {/*    ))}*/}
                            {/*  </ul>*/}
                            {/*</li>*/}
                          </ul>
                        </nav>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6">
                <div className="flex h-32 shrink-0 items-center mx-auto">
                  <img className="h-16 w-auto" src="./logo.png" alt="Choose Your Algorithm" />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              onClick={() => {
                                setPage(item.name)
                                setSidebarOpen(false)
                              }}
                              className={classNames(
                                item.current
                                  ? "bg-gray-800 text-white"
                                  : "text-indigo-200 hover:text-white hover:bg-gray-800",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  item.current
                                    ? "text-white"
                                    : "text-indigo-200 group-hover:text-white",
                                  "h-6 w-6 shrink-0"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    {/*<li>*/}
                    {/*  <div className="text-xs font-semibold leading-6 text-indigo-200">*/}
                    {/*    Referrals*/}
                    {/*  </div>*/}
                    {/*  /!*<ul role="list" className="-mx-2 mt-2 space-y-1">*!/*/}
                    {/*  /!*  {referralLinks.map((team) => (*!/*/}
                    {/*  /!*    <li key={team.name}>*!/*/}
                    {/*  /!*      <a*!/*/}
                    {/*  /!*        href={team.href}*!/*/}
                    {/*  /!*        className={classNames(*!/*/}
                    {/*  /!*          team.current*!/*/}
                    {/*  /!*            ? "bg-indigo-700 text-white"*!/*/}
                    {/*  /!*            : "text-indigo-200 hover:text-white hover:bg-indigo-700",*!/*/}
                    {/*  /!*          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"*!/*/}
                    {/*  /!*        )}*!/*/}
                    {/*  /!*      >*!/*/}
                    {/*  /!*        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">*!/*/}
                    {/*  /!*          {team.initial}*!/*/}
                    {/*  /!*        </span>*!/*/}
                    {/*  /!*        <span className="truncate">{team.name}</span>*!/*/}
                    {/*  /!*      </a>*!/*/}
                    {/*  /!*    </li>*!/*/}
                    {/*  /!*  ))}*!/*/}
                    {/*  /!*</ul>*!/*/}
                    {/*</li>*/}
                    {/*<li className="-mx-6 mt-auto">*/}
                    {/*  <a*/}
                    {/*    href="#"*/}
                    {/*    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-700"*/}
                    {/*  >*/}
                    {/*    <img*/}
                    {/*      className="h-8 w-8 rounded-full bg-indigo-700"*/}
                    {/*      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
                    {/*      alt=""*/}
                    {/*    />*/}
                    {/*    <span className="sr-only">Your profile</span>*/}
                    {/*    <span aria-hidden="true">Tom Cook</span>*/}
                    {/*  </a>*/}
                    {/*</li>*/}
                  </ul>
                </nav>
              </div>
            </div>

            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-600 py-4 px-4 shadow-sm sm:px-6 lg:hidden">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-indigo-200 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
              {/*<a href="#">*/}
              {/*  <span className="sr-only">Your profile</span>*/}
              {/*  <img*/}
              {/*    className="h-8 w-8 rounded-full bg-indigo-700"*/}
              {/*    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
              {/*    alt=""*/}
              {/*  />*/}
              {/*</a>*/}
            </div>

            <main className="py-10 lg:pl-72">
              <div className="px-4 sm:px-6 lg:px-8">
                {page === "Search Engines" && <SearchEngines />}
              </div>
            </main>
          </div>
        </>
      </Suspense>
    </>
  )
}

DashboardPage.authenticate = { redirectTo: "/" }
export default DashboardPage
