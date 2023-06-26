import Image from "next/image";

interface Props {
  photos: Array<any>;
}

export default function ImageGallery({ photos }: Props) {
  return (
    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
        <img
          src={photos[1].url}
          alt={photos[1].alt}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <img
            src={photos[0].url}
            alt={photos[0].alt}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <img
            src={photos[1].url}
            alt={photos[1].alt}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
      <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
        <img
          src={photos[2].url}
          alt={photos[2].alt}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}
