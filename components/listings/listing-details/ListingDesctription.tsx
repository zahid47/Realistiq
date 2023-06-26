interface Props {
  listing: any;
}

export default function ListingDesctription({ listing }: Props) {
  return (
    <>
      <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {listing.title}
        </h1>
      </div>

      <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
        <div>
          <h3 className="sr-only">Description</h3>

          <div className="space-y-6">
            <p className="text-base text-gray-900">
              {listing.ListingInfo.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
