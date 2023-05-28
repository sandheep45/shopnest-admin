import db from "./index"
import { faker } from "@faker-js/faker"

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

const seed = async () => {
  const products = await db.product.findMany()

  for (const product of products) {
    await db.product.update({
      where: { id: product.id },
      data: {
        Variant: {
          create: {
            price: parseInt(faker.commerce.price()),
            sku: getRandomInt(1000000000, 9999999999),
            description: faker.commerce.productDescription(),
            inWareHouseQuantity: getRandomInt(0, 100),
            onSelfQuantity: getRandomInt(0, 100),
            taxPercent: getRandomInt(0, 100),
            barcode: getRandomInt(1000000000000, 9999999999999),
          },
        },
      },
    })
  }
}

export default seed
