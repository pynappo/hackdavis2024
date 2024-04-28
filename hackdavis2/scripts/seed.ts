import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Run inside `async` function
async function main() {
  const user = await prisma.item.create({
    data: {
      name: "Alice",
      category: {
        create: {
          name: "Person",
        },
      },
    },
  });
}

await main();
