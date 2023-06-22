import Image from "next/image";
import { Carousel } from "@material-tailwind/react";
import { getRGBDataURL } from "@/lib/utils";

export default function ImageCarousel({ images }: { images: any[] }) {
  return (
    <Carousel
      className="max-h-[14rem] min-h-[14rem] min-w-[14rem] max-w-[14rem] rounded-lg"
      loop={true}
    >
      {images.map((image) => (
        <Image
          key={image.id}
          className="h-[14rem] w-[14rem] rounded-lg object-cover" //FIXME: really bad hack
          placeholder="blur"
          blurDataURL={getRGBDataURL(209, 209, 209)} // grey
          src={image.url}
          alt={image.alt}
          height={224}
          width={224}
        />
      ))}
    </Carousel>
  );
}
