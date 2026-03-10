
import React, {useState, useCallback, useMemo, useEffect,useRef, useTransition   } from 'react';
import { hotelHooks, components, modals, hotelTypes, responsive, loader } from '@/index';
import { useNavigate, useLocation } from 'react-router-dom';
import EmailPreviewModal  from '../components/modals/EmailPreviewModal';
import { MarkupConfirmationModal } from '../components/modals/MarkupConfirmationModal';


// Updated SkeletonLoader component
const SkeletonLoader = () => {
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center m-auto bg-gray-200">
      {/* Skeleton Content */}
      <div className="yield-content w-full max-w-7xl mx-auto px-4">
        <div className="flex gap-4 mb-4">
          {/* Skeleton Sidebar */}
          <div className="hidden md:block bg-white rounded-lg w-1/3 p-4 sticky h-screen top-0 overflow-hidden">
            {/* Map Preview Skeleton */}
            <div className="mb-4">
              <div className="w-full bg-gray-300 shadow-lg rounded-lg border-2 border-gray-200 overflow-hidden animate-pulse">
                <div className="relative h-[150px] bg-gray-300"></div>
              </div>
            </div>

            {/* Filters Card Skeleton */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden animate-pulse">
              {/* Header */}
              <div className="bg-linear-to-r from-gray-400 to-gray-500 h-12"></div>
              
              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Search */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-28"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>

                <div className="h-px bg-gray-200"></div>

                {/* Applied Filters Skeleton */}
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-7 bg-gray-300 rounded-full w-20"></div>
                    <div className="h-7 bg-gray-300 rounded-full w-24"></div>
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>

                <div className="h-px bg-gray-200"></div>

                {/* Star Rating */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-gray-200"></div>

                {/* Facilities */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skeleton Hotel Cards */}
          <div className="w-full bg-white rounded-md px-4 flex flex-col">
            <div className="py-4 px-4">
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-4 animate-pulse"></div>
            </div>

            {/* Multiple Hotel Card Skeletons */}
            {[1, 2, 3, 4].map((index) => (
              <loader.HotelCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const HotelSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { taxivaxi } = location.state || {};

  const bootstrap = hotelHooks.useHotelBootstrap();
  const filters = hotelHooks.useHotelFilters(bootstrap.combinedHotels);
  const share = hotelHooks.useHotelShare(bootstrap.searchParams);
   const memoizedFilteredHotels = useMemo(() => filters.filteredHotels, [filters.filteredHotels]);

  //  const [isNavigating, setIsNavigating] = useState(false);




  // NEW: Local loading state for initial render
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  // const [isFilterLoading, setIsFilterLoading] = useState(false);
const [isPending, startTransition] = useTransition();
const [displayedHotels, setDisplayedHotels] = useState<hotelTypes.Hotel[]>([]);
const isInitialMount = useRef(true);

  const [activeHotel, setActiveHotel] = React.useState<hotelTypes.Hotel | null>(null);
  const [isRoomPriceOpen, setIsRoomPriceOpen] = React.useState(false);
  const [isImageGalleryOpen, setIsImageGalleryOpen] = React.useState(false);
  const [isImageZoomOpen, setIsImageZoomOpen] = React.useState(false);
  const [galleryImages, setGalleryImages] = React.useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const [isMapOpen, setIsMapOpen] = React.useState(false);



  // const [isClientPriceModalOpen, setIsClientPriceModalOpen] = useState(false);
  // const [selectedHotelForPricing, setSelectedHotelForPricing] =
  //   useState<hotelTypes.Hotel | null>(null);



  const [isSharePanelOpen, setIsSharePanelOpen] = useState(false);

    const [isHotelDetailsOpen, setIsHotelDetailsOpen] = useState(false);
  const [selectedHotelForDetails, setSelectedHotelForDetails] = useState<hotelTypes.Hotel | null>(null);


  // ✅ NEW: Effect to hide skeleton after data is ready and component is mounted
  useEffect(() => {
    if (bootstrap.combinedHotels.length > 0) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [bootstrap.combinedHotels.length]);

  // ## -> OLD FLOW
  // const handleBookNow = useCallback((hotel: hotelTypes.Hotel) => {
  //   setSelectedHotelForPricing(hotel);
  //   setIsClientPriceModalOpen(true);
  // }, []);


  const handleBookNow = useCallback((hotel: hotelTypes.Hotel) => {
  navigate('/HotelDetail', {
    state: {
      hotel: hotel,
      fromBookNow: false,
      pricing: null,  // No pricing yet, will be set in HotelDetailPage
      taxivaxi: taxivaxi || {
        checkindate: bootstrap.searchParams?.checkIn,
        checkoutdate: bootstrap.searchParams?.checkOut,
      },
    },
  });
}, [navigate, taxivaxi, bootstrap.searchParams]);

  // const handleClientPriceConfirm = useCallback(
  //   (pricingData: {
  //     clientPrice: number;
  //     totalFare: number;
  //     nights: number;
  //     markupPerNight: number;
  //     totalMarkup: number;
  //   }) => {
  //     if (!selectedHotelForPricing) return;

  //     setIsClientPriceModalOpen(false);

  //     navigate('/HotelDetail', {
  //       state: {
  //         hotel: selectedHotelForPricing,
  //         fromBookNow: true,
  //         pricing: pricingData,
  //         taxivaxi: taxivaxi || {
  //           checkindate: bootstrap.searchParams?.checkIn,
  //           checkoutdate: bootstrap.searchParams?.checkOut,
  //         },
  //       },
  //     });
  //   },
  //   [navigate, selectedHotelForPricing, taxivaxi, bootstrap.searchParams]
  // );

//   const handleClientPriceConfirm = useCallback(
//   (pricingData: {
//     clientPrice: number;
//     totalFare: number;
//     nights: number;
//     markupPerNight: number;
//     totalMarkup: number;
//   }) => {
//     if (!selectedHotelForPricing) return;

//     // ✅ Show loader
//     setIsNavigating(true);
//     setIsClientPriceModalOpen(false);

//     // ✅ Artificial delay for better UX (1.5 seconds)
//     setTimeout(() => {
//       navigate('/HotelDetail', {
//         state: {
//           hotel: selectedHotelForPricing,
//           fromBookNow: false,
//           pricing: pricingData,
//           taxivaxi: taxivaxi || {
//             checkindate: bootstrap.searchParams?.checkIn,
//             checkoutdate: bootstrap.searchParams?.checkOut,
//           },
//         },
//       });
      
//       setIsNavigating(false);
//     }, 1500); // ✅ 1.5 second delay
//   },
//   [navigate, selectedHotelForPricing, taxivaxi, bootstrap.searchParams]
// );


  // ✅ Show skeleton when filters change
// ✅ Production-grade filter transition with debouncing

useEffect(() => {
  if (isInitialMount.current) {
    isInitialMount.current = false;
    // ✅ Defer initial state update to avoid synchronous setState
    const initialTimer = setTimeout(() => {
      setDisplayedHotels(memoizedFilteredHotels);
    }, 0);
    return () => clearTimeout(initialTimer);
  }

  // Debounce rapid filter changes
  const debounceTimer = setTimeout(() => {
    startTransition(() => {
      setDisplayedHotels(memoizedFilteredHotels);
    });
  }, 100);

  return () => clearTimeout(debounceTimer);
}, [memoizedFilteredHotels]);

  const extractAttraction = useCallback((description: string) => {
    if (!description || typeof description !== 'string') {
      return 'No Location Available';
    }
    const match = description.match(/HeadLine\s*:\s*([^<]+)/);
    return match ? match[1].trim() : 'No Location Available';
  }, []);

  const handleViewPrice = useCallback((hotel: hotelTypes.Hotel) => {
    setActiveHotel(hotel);
    setIsRoomPriceOpen(true);
  }, []);

  const handleViewImages = useCallback((images: string[]) => {
    setGalleryImages(images || []);
    setActiveImageIndex(0);
    setIsImageGalleryOpen(true);
  }, []);


   const handleViewDetails = useCallback((hotel: hotelTypes.Hotel) => {
    setSelectedHotelForDetails(hotel);
    setIsHotelDetailsOpen(true);
  }, []);

  const formatCancelPolicies = useCallback((policies: hotelTypes.CancellationPolicy[]) => {
    return policies.map(
      (p) =>
        `${p.ChargeType} ${p.CancellationCharge}${p.ChargeType === 'Percentage' ? '%' : ''}`
    );
  }, []);

  const handleMapOpen = useCallback(() => setIsMapOpen(true), []);
  const handleMapClose = useCallback(() => setIsMapOpen(false), []);
  
  const handleRoomPriceClose = useCallback(() => {
    setIsRoomPriceOpen(false);
  }, []);

  const handleAddToShare = useCallback(() => {
    setIsRoomPriceOpen(false);
    setIsSharePanelOpen(true);
  }, []);

  const handleSharePanelClose = useCallback(() => {
    setIsSharePanelOpen(false);
  }, []);

  const handleImageGalleryClose = useCallback(() => {
    setIsImageGalleryOpen(false);
    setIsImageZoomOpen(false);
  }, []);
  
  const handleImageClick = useCallback((index: number) => {
    setActiveImageIndex(index);
    setIsImageZoomOpen(true);
  }, []);
  
  const handleImageZoomClose = useCallback(() => setIsImageZoomOpen(false), []);
  
  const handleImagePrevious = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  }, [galleryImages.length]);
  
  const handleImageNext = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  }, [galleryImages.length]);
  
  const handleThumbnailClick = useCallback((index: number) => {
    setActiveImageIndex(index);
  }, []);

   const handleHotelDetailsClose = useCallback(() => {
    setIsHotelDetailsOpen(false);
  }, []);

 

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.filters.selectedRatings.length > 0) count++;
    if (filters.filters.selectedFacilities.length > 0) count++;
    if (filters.filters.selectedMealTypes.length > 0) count++;
    // if (filters.filters.mealType) count++;
    if (filters.filters.refundable !== null) count++;
    if (filters.filters.searchQuery) count++;
    return count;
  }, [filters.filters]);

  // ✅ Show skeleton loader during initial load OR when bootstrap.loader is true
  if (isInitialLoading || bootstrap.loader) {
    return (
      <div className="container max-w-full flex flex-col gap-2 items-center justify-center m-auto bg-gray-200">
        <components.SearchHeader
          company={bootstrap.company}
          setCompany={bootstrap.setCompany}
          companies={bootstrap.companies}
          showDropdown={bootstrap.showDropdown}
          setShowDropdown={bootstrap.setShowDropdown}
          fetchCompanies={bootstrap.fetchCompanies}
          loading={bootstrap.loader}
          companiesLoading={bootstrap.companiesLoading}
          city={bootstrap.city}
          setCity={bootstrap.setCity}
          cities={bootstrap.cities}
          showDropdown2={bootstrap.showDropdown2}
          setShowDropdown2={bootstrap.setShowDropdown2}
          fetchCities={bootstrap.fetchCities}
          selectedCityCode={bootstrap.selectedCityCode || ''}
          setSelectedCityCode={bootstrap.setSelectedCityCode}
          citiesLoading={bootstrap.citiesLoading}
          checkInDate={bootstrap.checkInDate}
          setCheckInDate={bootstrap.setCheckInDate}
          isCheckInOpen={bootstrap.isCheckInOpen}
          setCheckInIsOpen={bootstrap.setCheckInIsOpen}
          checkOutDate={bootstrap.checkOutDate}
          setCheckOutDate={bootstrap.setCheckOutDate}
          isCheckOutOpen={bootstrap.isCheckOutOpen}
          setCheckOutIsOpen={bootstrap.setCheckOutIsOpen}
          roomCount={bootstrap.roomCount}
          roomadultCount={bootstrap.roomadultCount}
          roomchildCount={bootstrap.roomchildCount}
          childrenAges={bootstrap.childrenAges}
          isDropdownOpen={bootstrap.isDropdownOpen}
          setIsDropdownOpen={bootstrap.setIsDropdownOpen}
          errorMessage={bootstrap.errorMessage}
          handleSubmitForm={bootstrap.handleSubmitForm}
          handleSelection={bootstrap.handleSelection}
          handleChildAgeChange={bootstrap.handleChildAgeChange}
          handleApply={bootstrap.handleApply}
          disabled={true}
        />
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="container max-w-full flex flex-col gap-2 items-center m-auto bg-gray-200">
      <components.SearchHeader
        company={bootstrap.company}
        setCompany={bootstrap.setCompany}
        companies={bootstrap.companies}
        showDropdown={bootstrap.showDropdown}
        setShowDropdown={bootstrap.setShowDropdown}
        fetchCompanies={bootstrap.fetchCompanies}
        loading={bootstrap.loader}
        companiesLoading={bootstrap.companiesLoading}
        city={bootstrap.city}
        setCity={bootstrap.setCity}
        cities={bootstrap.cities}
        showDropdown2={bootstrap.showDropdown2}
        setShowDropdown2={bootstrap.setShowDropdown2}
        fetchCities={bootstrap.fetchCities}
        selectedCityCode={bootstrap.selectedCityCode || ''}
        setSelectedCityCode={bootstrap.setSelectedCityCode}
        citiesLoading={bootstrap.citiesLoading}
        checkInDate={bootstrap.checkInDate}
        setCheckInDate={bootstrap.setCheckInDate}
        isCheckInOpen={bootstrap.isCheckInOpen}
        setCheckInIsOpen={bootstrap.setCheckInIsOpen}
        checkOutDate={bootstrap.checkOutDate}
        setCheckOutDate={bootstrap.setCheckOutDate}
        isCheckOutOpen={bootstrap.isCheckOutOpen}
        setCheckOutIsOpen={bootstrap.setCheckOutIsOpen}
        roomCount={bootstrap.roomCount}
        roomadultCount={bootstrap.roomadultCount}
        roomchildCount={bootstrap.roomchildCount}
        childrenAges={bootstrap.childrenAges}
        isDropdownOpen={bootstrap.isDropdownOpen}
        setIsDropdownOpen={bootstrap.setIsDropdownOpen}
        errorMessage={bootstrap.errorMessage}
        handleSubmitForm={bootstrap.handleSubmitForm}
        handleSelection={bootstrap.handleSelection}
        handleChildAgeChange={bootstrap.handleChildAgeChange}
        handleApply={bootstrap.handleApply}
        disabled={true}
      />

      <div className="yield-content">
        <div className="flex gap-4 container max-w-7xl mb-4">
          <components.FilterSidebar
            filters={filters.filters}
            allRatings={filters.allRatings}
            allFacilities={filters.allFacilities}
            allMealTypes={filters.allMealTypes}
            ratingCounts={filters.ratingCounts}
            facilityCounts={filters.facilityCounts}    
            mealTypeCounts={filters.mealTypeCounts}  
            priceRange={filters.priceRange}
            handleFilterChange={filters.handleFilterChange}
            handleSearchChange={filters.handleSearchChange}
            hotels={memoizedFilteredHotels}
            allHotels={bootstrap.combinedHotels}
            onMapClick={handleMapOpen}
            onClearAll={filters.resetFilters}
             minPrice={filters.priceRange.min}  // ADD THIS
  maxPrice={filters.priceRange.max}  // ADD THIS
  onRemoveFilter={filters.removeSpecificFilter}   
          />


          <div className="w-full bg-white rounded-md px-4 flex flex-col">
            {/* <p className="py-4 px-4 text-2xl font-semibold mb-0">
              {bootstrap.combinedHotels.length} Properties in {bootstrap.city || "Selected City"}
            </p> */}

            {/* <p className="py-4 px-4 text-2xl font-semibold mb-0">
  {memoizedFilteredHotels.length} {memoizedFilteredHotels.length === 1 ? 'Property' : 'Properties'} in {bootstrap.city || "Selected City"}
  {memoizedFilteredHotels.length !== bootstrap.combinedHotels.length && (
    <span className="text-sm text-gray-500 font-normal ml-2">
      (of {bootstrap.combinedHotels.length} total)
    </span>
  )}
</p> */}

<p className="py-4 px-4 text-2xl font-semibold mb-0">
  {displayedHotels.length} {displayedHotels.length === 1 ? 'Property' : 'Properties'} in {bootstrap.city || "Selected City"}
  {displayedHotels.length !== bootstrap.combinedHotels.length && (
    <span className="text-sm text-gray-500 font-normal ml-2">
      (of {bootstrap.combinedHotels.length} total)
    </span>
  )}
</p>

            {/* {memoizedFilteredHotels.length > 0 ? (
              memoizedFilteredHotels.map((hotel) => (
                

                <components.HotelCard
                  key={hotel.HotelCode}
                  hotel={{
                    ...hotel,
                    Description: hotel.Description ?? "",
                    Images: hotel.Images ?? [],
                    Rooms: hotel.Rooms ?? [],
                  }}
                  booknow={bootstrap.bookNow}
                  agent_portal="0"
                  onViewPrice={handleViewPrice}
                  onBookNow={handleBookNow}
                  onViewImages={handleViewImages}
                  onViewDetails={handleViewDetails}
                  extractAttraction={extractAttraction}
                  formatCancelPolicies={formatCancelPolicies}
                />
              ))
            ) : (
              <div className="flex flex-1 justify-center items-start my-28">
                <img alt="Result Not Found" src="/img/ResultNot.png" />
              </div>
            )} */}


            {/* Remove isFilterLoading and use isPending instead */}
{isPending ? (
  // ✅ Show skeleton during transition
  <div className="space-y-4">
    {[1, 2, 3].map((index) => (
    

      <loader.HotelCardSkeleton key={index} />
    ))}
  </div>
) : displayedHotels.length > 0 ? (
  displayedHotels.map((hotel) => (
    <components.HotelCard
      key={hotel.HotelCode}
      hotel={{
        ...hotel,
        Description: hotel.Description ?? "",
        Images: hotel.Images ?? [],
        Rooms: hotel.Rooms ?? [],
      }}
      booknow={bootstrap.bookNow}
      agent_portal="0"
      onViewPrice={handleViewPrice}
      onBookNow={handleBookNow}
      onViewImages={handleViewImages}
      onViewDetails={handleViewDetails}
      extractAttraction={extractAttraction}
      formatCancelPolicies={formatCancelPolicies}
    />
  ))
) : (
  <div className="flex flex-1 justify-center items-start my-28">
    <img alt="Result Not Found" src="/img/ResultNot.png" />
  </div>
)}
          </div>
          
        </div>


      </div>

      {/* ========== NAVIGATION LOADER ========== */}
      
{/* {isNavigating && (
  <div 
    className="fixed inset-0 flex items-center justify-center z-[100] p-4"
    style={{ 
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)' // For Safari support
    }}
  >
    <div className="bg-white rounded-2xl shadow-xl p-12 flex flex-col items-center gap-6 max-w-sm w-full">
      <img
        src="/gifs/cotravloader.gif"
        alt="Loading"
        className="w-24 h-24 object-contain"
      />
      <div className="text-center space-y-2">
        <p className="text-gray-900 text-xl font-semibold">
          Loading Hotel Details
        </p>
        <p className="text-gray-500 text-sm">Please wait a moment</p>
      </div>
    </div>
  </div>
)} */}



      {/* ========== ALL MODALS ========== */}

       {isHotelDetailsOpen && selectedHotelForDetails && (
        <modals.HotelDetailsModal
          isOpen={isHotelDetailsOpen}
          hotel={selectedHotelForDetails}
          onClose={handleHotelDetailsClose}
          onViewImages={handleViewImages}
        />
      )}

      {isMapOpen && (
        <modals.MapViewModal
          isOpen={isMapOpen}
          onClose={handleMapClose}
          hotels={memoizedFilteredHotels}
          extractAttraction={extractAttraction}
          onSelectHotel={handleMapClose}
        />
      )}

      {share.selectedRooms.length > 0 && isSharePanelOpen && (
        <modals.SharePanelModal
          selectedRooms={share.selectedRooms}
          onClose={handleSharePanelClose}
          onShare={share.handleShareOptions}
          onRemoveRoom={share.removeRoom}
          extractAttraction={extractAttraction}
        />
      )}

      {share.isModalOpen && (
        <modals.ShareModal
          isOpen={share.isModalOpen}
          onClose={share.handleCancel}
          formData={share.formData}
          toEmailList={share.toEmailList}
          ccEmailList={share.ccEmailList}
          errors={share.errors}
          isLoading={share.isLoading}
          onSubmit={share.handleSubmit}
          handleChange={share.handleChange}
          handleAddEmail={share.handleAddEmail}
          handleDeleteEmail={share.handleDeleteEmail}
          handleApproverEmailBlur={share.handleApproverEmailBlur}
          toEmail={share.toEmail}
          setToEmail={share.setToEmail}
          ccEmail={share.ccEmail}
          setCcEmail={share.setCcEmail}
        />
      )}

      {share.showMarkupWarning && (
        <MarkupConfirmationModal
          isOpen={share.showMarkupWarning}
          onClose={share.handleMarkupCancel}
          onConfirm={share.handleMarkupConfirm}
          priceData={share.markupWarningData}
        />
      )}

      {share.isPreviewModalOpen && (
        <EmailPreviewModal
          isOpen={share.isPreviewModalOpen}
          htmlContent={share.emailHtmlContent}
          emailPreviewData={share.emailPreviewData}
          onClose={share.handleClosePreview}
          onConfirmSend={share.handleConfirmAndSendEmail}
        />
      )}

      {isRoomPriceOpen && activeHotel && (
        <modals.RoomPriceModal
          isOpen={isRoomPriceOpen}
          hotel={activeHotel}
          selectedRooms={share.selectedRooms}
          onClose={handleRoomPriceClose}
          onAddRoom={share.addRoom}
          onRemoveRoom={share.removeRoom}
          onShare={handleAddToShare}
        />
      )}

      {isImageGalleryOpen && (
        <modals.ImageGalleryModal
          isOpen={isImageGalleryOpen}
          images={galleryImages}
          onClose={handleImageGalleryClose}
          onImageClick={handleImageClick}
        />
      )}

      {isImageZoomOpen && (
        <modals.ImageZoomModal
          isOpen={isImageZoomOpen}
          images={galleryImages}
          currentIndex={activeImageIndex}
          onClose={handleImageZoomClose}
          onPrevious={handleImagePrevious}
          onNext={handleImageNext}
          onThumbnailClick={handleThumbnailClick}
        />
      )}

      {/* {isClientPriceModalOpen && selectedHotelForPricing && (
        <modals.ClientPriceModal
          isOpen={isClientPriceModalOpen}
          hotel={selectedHotelForPricing}
          onClose={() => setIsClientPriceModalOpen(false)}
          onConfirm={handleClientPriceConfirm}
        />
      )} */}

      <responsive.MobileFilterButton
        onClick={() => setIsMobileFilterOpen(true)}
        activeFilterCount={activeFilterCount}
      />

      <responsive.MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters.filters}
        allRatings={filters.allRatings}
        allFacilities={filters.allFacilities}
        allMealTypes={filters.allMealTypes}
         priceRange={filters.priceRange}                    
  ratingCounts={filters.ratingCounts}                
  facilityCounts={filters.facilityCounts}            
  mealTypeCounts={filters.mealTypeCounts}            
        handleFilterChange={filters.handleFilterChange}
        handleSearchChange={filters.handleSearchChange}
        hotels={memoizedFilteredHotels}
        allHotels={bootstrap.combinedHotels}
        onMapClick={() => {}}
        activeFilterCount={activeFilterCount}
        minPrice={filters.priceRange.min}                  
  maxPrice={filters.priceRange.max}                  
  onClearAll={filters.resetFilters}                  
  onRemoveFilter={filters.removeSpecificFilter}      
      />
    </div>
  );
};

export default HotelSearchPage;

