// TODO: add lightbox to Image comp

import Image from "next/image";
import { Carousel } from "@mantine/carousel";
import { getRGBDataURL } from "@/lib/utils";
import { createStyles, getStylesRef } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { env } from "@/env.mjs";
import { ListingPhotos } from "@prisma/client";
import ListingBookMark from "./ListingBookMark";
import { useState } from "react";

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

interface Props {
  photos: Array<ListingPhotos>;
  listingId: number;
  isSaved: boolean;
}

export default function ImageCarousel({ photos, listingId, isSaved }: Props) {
  const isSmallScreen = useMediaQuery("(max-width: 1535px)");
  const { classes } = largeScreenStyles();
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <div className="relative">
      <Carousel
        classNames={!isSmallScreen ? classes : undefined}
        loop
        maw={320} //FIXME: doesn't look very good in certain screen sizes
        height={200}
        styles={essentialStyles}
        onSlideChange={(index) => setCurrentSlide(index + 1)}
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
      <ListingBookMark listingId={listingId} isSaved={isSaved} />
      <div className="absolute bottom-2 left-2 rounded-full bg-black bg-opacity-50">
        <p className="mx-2 my-1 text-xs text-white">
          {currentSlide}/{photos.length}
        </p>
      </div>
    </div>
  );
}
