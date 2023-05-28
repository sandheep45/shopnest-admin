import { api } from "src/blitz-server"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { NextAuthAdapter } from "@blitzjs/auth/next-auth"
import db, { User } from "db"
import { Role } from "types"

// Has to be defined separately for `profile` to be correctly typed below
const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }),
  FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID as string,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
  }),
]

export default api(
  NextAuthAdapter({
    successRedirectUrl: "/",
    errorRedirectUrl: "/error",
    providers,
    callback: async (user, account, profile, session) => {
      let newUser: User
      try {
        newUser = await db.user.findFirstOrThrow({
          where: { name: { equals: user.name } },
        })
      } catch (e) {
        newUser = await db.user.create({
          data: {
            email: user.email!,
            name: user.name ?? "unknown",
            role: "USER",
          },
        })
      }
      await session.$create({
        userId: newUser.id,
        role: newUser.role as Role,
      })
      return { redirectUrl: "/github" }
    },
  })
)
