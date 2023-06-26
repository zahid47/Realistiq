const fakeAmenities = [
  "Smart",
  "Elevator",
  "Pets",
  "Pool",
  "Balcony",
  "Garden",
  "Solar",
  "Terrace",
];

export default function ListingAmenities() {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Amenities</h3>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
          {fakeAmenities.map((amenity) => (
            <div
              key={amenity}
              className="group relative flex items-center justify-center rounded-md border bg-white px-4 py-3 text-center text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
            >
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
