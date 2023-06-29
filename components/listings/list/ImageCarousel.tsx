import Image from "next/image";
import { Carousel } from "@mantine/carousel";
import { rem } from "@mantine/core";
import { getRGBDataURL } from "@/lib/utils";
import { createStyles, getStylesRef } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { env } from "@/env.mjs";

const largeScreenStyles = createStyles(() => ({
  controls: {
    ref: getStylesRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  indicators: {
    ref: getStylesRef("indicators"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    "&:hover": {
      [`& .${getStylesRef("controls")}`]: {
        opacity: 1,
      },
      [`& .${getStylesRef("indicators")}`]: {
        opacity: 1,
      },
    },
  },
}));

const essentialStyles = {
  indicator: {
    backgroundColor: "#ffffff !important",
    width: rem(12),
    height: rem(4),
    transition: "width 250ms ease",

    "&[data-active]": {
      width: rem(40),
    },
  },
  control: {
    backgroundColor: "#ffffff !important",
  },
};

export default function ImageCarousel({ images }: { images: any[] }) {
  const isSmallScreen = useMediaQuery("(max-width: 1535px)");
  const { classes } = largeScreenStyles();

  return (
    <Carousel
      classNames={!isSmallScreen ? classes : undefined}
      loop
      maw={320} //FIXME: doesn't look very good in certain screen sizes
      mx="auto"
      height={200}
      withIndicators={true}
      styles={essentialStyles}
    >
      {images.map((image) => (
        <Carousel.Slide
          key={image.id}
          className="relative max-h-[320px] w-[200px] overflow-hidden rounded-lg"
        >
          <Image
            key={image.id}
            className="object-cover"
            fill
            src={image.url}
            alt={image.alt}
            placeholder="blur"
            blurDataURL={getRGBDataURL(209, 209, 209)} // grey
            unoptimized={env.NEXT_PUBLIC_NODE_ENV === "development"}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
