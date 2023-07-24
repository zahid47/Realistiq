import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV === "production") {
    console.error("Refusing to seed non-development database");
    return;
  }

  // get the first user from db
  const user = await db.user.findFirst();

  if (!user) {
    console.error("❌ No user found");
    return;
  }

  console.log("Clearing existing data...");

  await Promise.all([
    db.listing.deleteMany({}),
    db.listingDetails.deleteMany({}),
    db.listingPrice.deleteMany({}),
    db.listingLocation.deleteMany({}),
    db.listingPhotos.deleteMany({}),
  ]);

  console.log("Seeding...");

  const fakeListings = Array.from({ length: 200 }).map(() => {
    return {
      user_id: user.id,
      details: {
        create: {
          description: `<p>${faker.lorem.paragraph()}</p>`,
          beds: faker.number.int({ min: 1, max: 5 }),
          baths: faker.number.int({ min: 1, max: 5 }),
          floor_area: faker.number.int({ min: 20, max: 200 }),
        },
      },
      price: {
        create: {
          amount: parseFloat(faker.commerce.price({ min: 99, max: 9999 })),
        },
      },
      location: {
        create: {
          lat: faker.location.latitude({
            min: 33,
            max: 48,
          }),
          lng: faker.location.longitude({
            min: -121,
            max: -76,
          }),
          address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state(
            { abbreviated: true }
          )} ${faker.location.zipCode()}`,
        },
      },
      photos: {
        create: Array.from({ length: 4 }).map(() => {
          return {
            url: faker.image.urlPicsumPhotos(),
            alt: faker.lorem.sentence(),
          };
        }),
      },
    };
  });

  await Promise.all(
    fakeListings.map((fakeListing) => {
      return db.listing.create({
        data: fakeListing,
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
