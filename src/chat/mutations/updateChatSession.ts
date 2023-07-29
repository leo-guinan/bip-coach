import { resolver } from "@blitzjs/rpc"
import { ChatSession, SendMessage } from "../../auth/validations"
import { Ctx } from "blitz"
import db from "../../../db"

export default resolver.pipe(resolver.zod(ChatSession), async ({ sessionId }, ctx: Ctx) => {
  const { userId } = ctx.session

  if (!userId) {
    throw new Error("No user ID")
  }

  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      memberships: {
        include: {
          organization: true,
        },
      },
    },
  })

  if (!user || !user.memberships[0]?.organization) {
    throw new Error("No user")
  }

  await db.organization.update({
    where: {
      id: user.memberships[0].organization.id,
    },
    data: {
      currentSession: sessionId,
    },
  })
})
