import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const db = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV === "production") {
    console.error("Refusing to seed non-development database");
    return;
  }

  // get the first user from db
  const user = await db.user.findFirst();

  if (!user) {
    console.error("No user found");
    return;
  }

  console.log("Clearing existing data...");

  await Promise.all([
    db.listing.deleteMany({}),
    db.listingInfo.deleteMany({}),
    db.listingLocation.deleteMany({}),
    db.listingPhotos.deleteMany({}),
  ]);

  console.log("Seeding...");

  const fakeListings = Array.from({ length: 100 }).map(() => {
    const title = `${capitalize(
      faker.word.adjective()
    )} property in ${faker.location.city()}`;
    return {
      title,
      slug: slugify(title, { lower: true }),
      userId: user.id,
      ListingInfo: {
        create: {
          description: faker.lorem.paragraph(),
        },
      },
      ListingLocation: {
        create: {
          lat: faker.location.latitude(),
          lng: faker.location.longitude(),
        },
      },
      ListingPhotos: {
        create: Array.from({ length: 3 }).map(() => {
          return {
            url: faker.image.url(),
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
