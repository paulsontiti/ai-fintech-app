import prisma from "./src/config/prisma";

async function main() {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      firstName: "Alice",
      lastName: "John",
      password: "123456",
      email: "alice@prisma.io",
      wallets: {
        create: {
          balance: 0,
        },
      },
    },
  });
  console.log("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany();
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    //process.exit(1)
  });
