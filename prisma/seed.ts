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

  console.log("Searching for seed user...");

  let seedUser = await db.user.findUnique({
    where: {
      id: "seed-user",
    },
  });

  if (!seedUser) {
    console.log("Creating seed user...");

    seedUser = await db.user.create({
      data: {
        id: "seed-user",
        name: "Test User",
        email: "testuser@realistiq.com",
        image: "https://avatars.githubusercontent.com/u/28688883?v=4",
      },
    });
  }

  const user = seedUser;

  console.log("Clearing existing data...");

  await db.listing.deleteMany();

  console.log("Seeding...");

  const fakeListings = Array.from({ length: 25 }).map(() => {
    return {
      location: {
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
      everythingElse: {
        owner_id: user.id,
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
      },
    };
  });

  await Promise.all(
    fakeListings.map((fakeListing) => {
      return db.listing
        .create({
          data: fakeListing.everythingElse,
        })
        .then((listing) => {
          const coords = `POINT(${fakeListing.location.lng} ${fakeListing.location.lat})`;
          const rawQuery = `
            INSERT INTO listing_location (lat, lng, coords, address, listing_id) 
            VALUES (${fakeListing.location.lat}, ${fakeListing.location.lng}, '${coords}', '${fakeListing.location.address}', ${listing.id});
          `;
          return db.$queryRawUnsafe(rawQuery).catch(async () => {
            await db.listing.delete({
              where: {
                id: listing.id,
              },
            });
          });
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
