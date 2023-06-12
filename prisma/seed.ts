import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV === "production") {
    console.error("Refusing to seed non-development database");
    return;
  }

  console.log("Seeding...");

  // get the first user from db
  const user = await db.user.findFirst();

  if (!user) {
    console.error("No user found");
    return;
  }

  await db.listing.deleteMany({});

  //create 100 random listings
  await Promise.all(
    Array.from({ length: 100 }).map(async () => {
      return await db.listing.create({
        data: {
          title: `${faker.word.adjective()} property in ${faker.location.city()}`,
          userId: user.id,
        },
      });
    })
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
