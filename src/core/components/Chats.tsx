import React from "react"
import { useQuery } from "@blitzjs/rpc"
import getChats from "../../users/queries/getChats"
import { classNames } from "../../../utils"
import { useRouter } from "next/router"

const Chats = () => {
  const router = useRouter()
  const [chats] = useQuery(getChats, null)
  return (
    <ul role="list" className="-mx-2 mt-2 space-y-1">
      {chats &&
        chats.map((chat) => (
          <li key={chat.name}>
            <a
              href={`${chat.session_id}`}
              className={classNames(
                chat.session_id === router.query.session_id
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800",
                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
              )}
            >
              <span>{chat.name || chat.session_id}</span>
            </a>
          </li>
        ))}
    </ul>
  )
}

export default Chats
