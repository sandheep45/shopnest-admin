import { faker } from "@faker-js/faker"

import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateRandomTags(tagCount: number, possibleTags: string[]): string {
  const tags: string[] = []

  // Generate random tags
  for (let i = 0; i < tagCount; i++) {
    const randomIndex = Math.floor(Math.random() * possibleTags.length)
    const randomTag = possibleTags[randomIndex]
    tags.push(randomTag ?? "")
  }

  // Join tags into a comma-separated string
  return tags.join(", ")
}

function getRandomValue(options: any[]): any {
  const randomIndex = Math.floor(Math.random() * options.length)
  return options[randomIndex]
}

function selectRandomMultipleUsers(userCount: number, users: any[]): any[] {
  const randomUsers: any[] = []

  // Generate random tags
  for (let i = 0; i < userCount; i++) {
    const randomIndex = Math.floor(Math.random() * users.length)
    const randomUser = users[randomIndex]
    randomUsers.push(randomUser)
  }

  return randomUsers
}

const seed = async () => {
  //Upadte users to have image
  const users = await db.user.findMany()

  for (const user of users) {
    await db.user.update({
      where: { id: user.id },
      data: {
        Media: {
          create: {
            type: "IMAGE",
            url: faker.image.urlLoremFlickr({ category: "people" }),
          },
        },
      },
    })
  }
}

export default seed
