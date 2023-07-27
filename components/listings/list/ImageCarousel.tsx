// TODO: add lightbox to Image comp

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
// import { env } from "@/env.mjs";
import { Carousel } from "@mantine/carousel";
import { createStyles, getStylesRef } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ListingPhotos } from "@prisma/client";
import FsLightbox from "fslightbox-react";
import { getRGBDataURL } from "@/lib/utils";
import ListingBookMark from "./ListingBookMark";

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
  const [isHovering, setIsHovering] = useState(false);
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  function openLightboxOnSlide(slide: number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: slide,
    });
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => {}} // this is needed to prevent the propagation when clicking on the image (which is a link)
    >
      <FsLightbox
        toggler={lightboxController.toggler}
        type="image"
        sources={photos.map((photo) => photo.url)}
        slide={lightboxController.slide}
      />
      <Carousel
        classNames={!isSmallScreen ? classes : undefined}
        loop
        maw={isSmallScreen ? 280 : 320} //FIXME: doesn't look very good in certain screen sizes
        height={200}
        styles={essentialStyles}
        onSlideChange={(index) => setCurrentSlide(index + 1)}
      >
        {photos.map((photo, index) => (
          <Carousel.Slide
            key={photo.id}
            className="relative max-h-[320px] w-[200px] cursor-zoom-in overflow-hidden rounded-lg"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                openLightboxOnSlide(index + 1);
              }}
            >
              <Image
                key={photo.id}
                className="object-cover"
                fill
                src={photo.url}
                alt={photo.alt}
                placeholder="blur"
                blurDataURL={getRGBDataURL(209, 209, 209)} // grey
                // unoptimized={env.NEXT_PUBLIC_NODE_ENV === "development"}
                unoptimized={true} // TODO: remove this
              />
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
      <ListingBookMark listingId={listingId} isSaved={isSaved} />
      {photos.length > 1 && isHovering && (
        <div className="absolute bottom-2 left-2 rounded-full bg-black bg-opacity-50">
          <p className="mx-2 my-1 text-xs tracking-wider text-white">
            {currentSlide}/{photos.length}
          </p>
        </div>
      )}
    </div>
  );
}
