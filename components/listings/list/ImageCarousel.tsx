// TODO: add counter for images
// TODO: add lightbox to Image comp

import Image from "next/image";
import { Carousel } from "@mantine/carousel";
import { rem } from "@mantine/core";
import { getRGBDataURL } from "@/lib/utils";
import { createStyles, getStylesRef } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { env } from "@/env.mjs";
import { ListingPhotos } from "@prisma/client";

const largeScreenStyles = createStyles(() => ({
  controls: {
    ref: getStylesRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    "&:hover": {
      [`& .${getStylesRef("controls")}`]: {
        opacity: 1,
      },
    },
  },
}));

const essentialStyles = {
  control: {
    backgroundColor: "#ffffff !important",
  },
};

export default function ImageCarousel({
  photos,
}: {
  photos: Array<ListingPhotos>;
}) {
  const isSmallScreen = useMediaQuery("(max-width: 1535px)");
  const { classes } = largeScreenStyles();

  return (
    <Carousel
      classNames={!isSmallScreen ? classes : undefined}
      loop
      maw={320} //FIXME: doesn't look very good in certain screen sizes
      mx="auto"
      height={200}
      styles={essentialStyles}
    >
      {photos.map((photo) => (
        <Carousel.Slide
          key={photo.id}
          className="relative max-h-[320px] w-[200px] overflow-hidden rounded-lg"
        >
          <Image
            key={photo.id}
            className="object-cover"
            fill
            src={photo.url}
            alt={photo.alt}
            placeholder="blur"
            blurDataURL={getRGBDataURL(209, 209, 209)} // grey
            unoptimized={env.NEXT_PUBLIC_NODE_ENV === "development"}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
