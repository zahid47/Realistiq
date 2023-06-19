import Image from "next/image";
import { Carousel } from "@material-tailwind/react";
import ClientOnly from "../providers/ClientOnly";

export default function ImageCarousel({ images }: { images: any[] }) {
  return (
    <ClientOnly>
      <Carousel
        className="max-h-[14rem] min-h-[14rem] min-w-[14rem] max-w-[14rem] rounded-lg"
        loop={true}
      >
        {images.map((image) => (
          <Image
            key={image.id}
            className="h-[14rem] w-[14rem] rounded-lg object-cover" //FIXME: really bad hack
            src={image.url}
            alt={image.alt}
            height={300}
            width={300}
          />
        ))}
      </Carousel>
    </ClientOnly>
  );
}
