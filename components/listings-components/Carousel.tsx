import Image from "next/image";

export default function Carousel({ images }: { images: any[] }) {
  return (
    <Image src={images[0].url} alt={images[0].alt} height={300} width={300} />
  );
}
