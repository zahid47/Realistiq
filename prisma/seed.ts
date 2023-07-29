import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const generateDescription = () => {
  return `<h2>Home for <em>rent </em>with a <strong><u>${faker.commerce
    .productAdjective()
    .toLowerCase()}</u></strong><u> </u>${faker.word.noun()}!</h2><p><i>(This is an auto generated demo listing)</i>
 </p>
 <p>
   ${faker.lorem.paragraph({
     min: 5,
     max: 8,
   })}
 </p>
 <p></p>
 <h2><strong>${faker.lorem.words({ min: 2, max: 3 })}:</strong></h2>
 <ol>
    ${Array.from({
      length: faker.number.int({
        min: 5,
        max: 12,
      }),
    })
      .map(() => {
        return `<li><p>${faker.lorem.sentence()}</p></li>`;
      })
      .join("")}
 </ol>
 <p></p>
 <p>${faker.lorem.lines({
   min: 2,
   max: 4,
 })}</p>`.replace(/\n/g, "");
};

async function main() {
  if (process.env.NODE_ENV === "production") {
    console.error("Refusing to seed non-development database");
    return;
  }

  // get the first user from db
  const user = await db.user.findFirst();

  if (!user) {
    throw new Error("❌ No user found");
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

  const fakeListings = Array.from({ length: 50 }).map(() => {
    return {
      user_id: user.id,
      details: {
        create: {
          description: generateDescription(),
          beds: faker.number.int({ min: 1, max: 9 }),
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
          address: `${faker.location.city()}, ${faker.location.streetAddress()}, United States`,
        },
      },
      photos: {
        create: Array.from({
          length: faker.number.int({
            min: 6,
            max: 20,
          }),
        }).map(() => {
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
