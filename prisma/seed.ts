/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function generateRandomTags(tagCount: number, possibleTags: string[]): string {
  const tags: string[] = [];

  // Generate random tags
  for (let i = 0; i < tagCount; i++) {
    const randomIndex = Math.floor(Math.random() * possibleTags.length);
    const randomTag = possibleTags[randomIndex];
    tags.push(randomTag ?? "");
  }

  // Join tags into a comma-separated string
  return tags.join(", ");
}

function getRandomValue(options: any[]): any {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function selectRandomMultipleUsers(userCount: number, users: any[]): any[] {
  const randomUsers: any[] = [];

  // Generate random tags
  for (let i = 0; i < userCount; i++) {
    const randomIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomIndex];
    randomUsers.push(randomUser);
  }

  return randomUsers;
}

const createUser = async () => {
  const hashedPassword = await hash("test@1234", 12);

  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@admin.com",
      hashedPassword,
      Media: {
        connect: {
          id: "6477334f6793154268843862",
        },
      },
    },
  });

  console.log({ user });
};

const updateProduct = async () => {
  const products = await prisma.product.findMany();

  for (const product of products) {
    await prisma.product.update({
      where: { id: product.id },
      data: {
        width: faker.number.float({ min: 10, max: 100, precision: 0.001 }),
        height: faker.number.float({ min: 10, max: 100, precision: 0.001 }),
        length: faker.number.float({ min: 10, max: 100, precision: 0.001 }),
        weight: faker.number.float({ min: 10, max: 100, precision: 0.001 }),
      },
    });
  }
};

async function main() {
  await updateProduct();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
