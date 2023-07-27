import { useState } from "react";
// import { env } from "@/env.mjs";
import Image from "next/image";
import { ListingPhotos } from "@prisma/client";
import FsLightbox from "fslightbox-react";
import { getRGBDataURL } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  photos: Array<ListingPhotos>;
}

export default function Photos({ photos }: Props) {
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
    <ScrollArea>
      <FsLightbox
        toggler={lightboxController.toggler}
        type="image"
        sources={photos.map((photo) => photo.url)}
        slide={lightboxController.slide}
      />
      <div className="columns-1 gap-2 sm:columns-2">
        {photos.map((photo, index) => (
          <div
            className="after:content after:shadow-highlight group relative mb-2 block w-full cursor-zoom-in overflow-hidden rounded-lg after:pointer-events-none after:absolute after:inset-0 after:rounded-lg"
            key={photo.id}
            onClick={() => openLightboxOnSlide(index + 1)}
          >
            <Image
              alt={photo.alt}
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: "translate3d(0, 0, 0)" }}
              src={photo.url}
              width={720}
              height={480}
              placeholder="blur"
              blurDataURL={getRGBDataURL(209, 209, 209)} // grey
              // unoptimized={env.NEXT_PUBLIC_NODE_ENV === "development"}
              unoptimized={true} // TODO: remove this
              sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
            />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
