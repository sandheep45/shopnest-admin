import db from "db"
import { Strategy } from "passport-facebook"
import { OAuth2Strategy } from "passport-google-oauth"
import { api } from "src/blitz-server"

import { passportAuth } from "@blitzjs/auth"

const generateBaseUrl = (suffix: string) => {
  if (process.env.VERCEL_ENV === "preview") return `${process.env.VERCEL_URL}/${suffix}`
  if (process.env.VERCEL_ENV === "production") return `https://shopnest-admin.vercel.app/${suffix}`
  return `http://localhost:3000/${suffix}`
}

export default api(
  passportAuth({
    successRedirectUrl: "/",
    errorRedirectUrl: "/",
    strategies: [
      {
        authenticateOptions: {
          scope:
            "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        },
        strategy: new OAuth2Strategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: generateBaseUrl("api/auth/google/callback"),
          },
          async function (_accessToken, _refreshToken, profile, done) {
            const email = profile.emails![0]?.value
            const user = await db.user.upsert({
              where: { email },
              create: { email: email!, name: profile.displayName },
              update: {},
            })
            done(null, {
              publicData: {
                userId: user.id,
                roles: [user.role],
                imageUrl: profile.photos![0]?.value,
              },
            })
          }
        ), // Provide initialized passport strategy here
      },
      {
        authenticateOptions: {
          scope: ["email", "public_profile"],
        },
        strategy: new Strategy(
          {
            clientID: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
            callbackURL: generateBaseUrl("api/auth/facebook/callback"),
            profileFields: ["id", "email", "name", "photos"],
          },
          async function (_accessToken, _refreshToken, profile, done) {
            const email = profile.emails![0]?.value
            const user = await db.user.upsert({
              where: { email },
              create: { email: email!, name: profile.displayName },
              update: {},
            })
            done(null, {
              publicData: {
                userId: user.id,
                roles: [user.role],
                imageUrl: profile.photos![0]?.value,
              },
            })
          }
        ), // Provide initialized passport strategy here
      },
    ],
  })
)
