// @ts-check
const { withBlitz } = require("@blitzjs/next")

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/
const config = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "cloudflare-ipfs.com",
      "loremflickr.com",
      "picsum.photos",
      "via.placeholder.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
    ],
  },
}

module.exports = withBlitz(config)
