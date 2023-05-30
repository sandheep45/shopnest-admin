import db from "db"
import { Strategy } from "passport-facebook"
import { OAuth2Strategy } from "passport-google-oauth"
import { api } from "src/blitz-server"

import { passportAuth } from "@blitzjs/auth"

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
            callbackURL:
              process.env.NODE_ENV === "production"
                ? `${process.env.VERCEL_URL}/api/auth/google/callback`
                : "http://localhost:3000/api/auth/google/callback",
          },
          async function (_accessToken, _refreshToken, profile, done) {
            const email = profile.emails![0]?.value
            const user = await db.user.upsert({
              where: { email },
              create: { email: email! },
              update: {},
            })
            done(null, {
              publicData: {
                userId: user.id,
                roles: [user.role],
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
            callbackURL:
              process.env.NODE_ENV === "production"
                ? `${process.env.VERCEL_URL}/api/auth/facebook/callback`
                : "http://localhost:3000/api/auth/facebook/callback",
            profileFields: ["id", "email", "name"],
          },
          async function (_accessToken, _refreshToken, profile, done) {
            const email = profile.emails![0]?.value
            const user = await db.user.upsert({
              where: { email },
              create: { email: email! },
              update: {},
            })
            done(null, {
              publicData: {
                userId: user.id,
                roles: [user.role],
              },
            })
          }
        ), // Provide initialized passport strategy here
      },
    ],
  })
)
