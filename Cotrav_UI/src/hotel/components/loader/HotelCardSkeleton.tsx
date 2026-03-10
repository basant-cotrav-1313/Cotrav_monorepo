const HotelCardSkeleton = () => {
  return (
    <div className="w-full mb-3">
      <div className="overflow-hidden py-0 border-2 border-[#0B5CAD]/20 rounded-lg bg-white animate-pulse">
        <div className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Image Skeleton */}
            <div className="lg:w-80 aspect-4/3 relative shrink-0 self-stretch overflow-hidden bg-gray-300">
              {/* Rating Badge */}
              <div className="absolute top-3 left-3 h-6 w-16 bg-gray-400 rounded-md"></div>
              {/* Image Counter */}
              <div className="absolute top-3 right-3 h-6 w-12 bg-gray-400 rounded"></div>
              {/* View All Photos Button */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 h-8 w-36 bg-gray-400 rounded"></div>
              {/* Image Indicators */}
              <div className="absolute bottom-3 left-3 flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-1.5 w-1.5 bg-white/60 rounded-full"></div>
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col lg:flex-row">
              {/* Main Content */}
              <div className="flex-1 p-3">
                {/* Header */}
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex-1">
                    {/* Hotel Name and Stars */}
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="h-6 bg-gray-300 rounded w-2/3"></div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-3.5 h-3.5 bg-gray-300 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                    {/* Location */}
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3.5 h-3.5 bg-gray-300 rounded-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-32"></div>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-6 bg-gray-200 rounded-full w-24"></div>
                  ))}
                </div>

                {/* Attractions Section */}
                <div className="mt-2">
                  {/* Nearby Label */}
                  <div className="flex items-center gap-1 mb-1.5">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                  {/* Attraction Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-5 bg-gray-200 rounded w-20"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="lg:w-56 bg-gradient-to-br from-[#0B5CAD]/5 to-[#094B8A]/5 p-3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l-2 border-[#0B5CAD]/20 shrink-0">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-right mb-3">
                    {/* Per Night Label */}
                    <div className="h-3 bg-gray-300 rounded w-24 mb-1.5 ml-auto"></div>
                    {/* Price */}
                    <div className="flex items-baseline justify-end gap-2 mb-1.5">
                      <div className="h-8 bg-gray-400 rounded w-32"></div>
                    </div>
                    {/* Excluding taxes text */}
                    <div className="h-3 bg-gray-300 rounded w-32 ml-auto"></div>

                    {/* Total Badge */}
                    <div className="mt-2 bg-gray-300 rounded-xl h-14 w-full"></div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-1.5">
                  <div className="h-10 bg-gray-300 rounded w-full"></div>
                  {/* Room count */}
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <div className="w-3.5 h-3.5 bg-gray-300 rounded-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-28"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCardSkeleton;
