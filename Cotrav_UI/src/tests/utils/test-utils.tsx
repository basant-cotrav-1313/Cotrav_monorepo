import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialRoute?: string;
  routeState?: any;
}

// Mock the @/index module
export const mockHotelHooks = {
  useHotelBootstrap: vi.fn(),
  useHotelFilters: vi.fn(),
  useHotelShare: vi.fn(),
};

export const mockComponents = {
  SearchHeader: vi.fn(({ handleSubmitForm }) => (
    <div data-testid="search-header">
      <button onClick={handleSubmitForm}>Search</button>
    </div>
  )),
  FilterSidebar: vi.fn(({ onMapClick, handleFilterChange }) => (
    <div data-testid="filter-sidebar">
      <button onClick={onMapClick}>Open Map</button>
      <button onClick={() => handleFilterChange('rating', [5])}>Filter 5 Stars</button>
    </div>
  )),
  HotelCard: vi.fn(({ hotel, onViewPrice, onBookNow, onViewImages }) => (
    <div data-testid={`hotel-card-${hotel.HotelCode}`}>
      <h3>{hotel.HotelName}</h3>
      <button onClick={() => onViewPrice(hotel)}>View Price</button>
      <button onClick={() => onBookNow(hotel)}>Book Now</button>
      <button onClick={() => onViewImages(hotel.Images)}>View Images</button>
    </div>
  )),
};

export const mockModals = {
  MapViewModal: vi.fn(({ isOpen, onClose }) => 
    isOpen ? <div data-testid="map-modal"><button onClick={onClose}>Close Map</button></div> : null
  ),
  SharePanelModal: vi.fn(({ selectedRooms, onClose, onShare, onRemoveRoom }) => (
    <div data-testid="share-panel-modal">
      <div data-testid="selected-rooms-count">{selectedRooms.length}</div>
      <button onClick={onShare}>Share</button>
      <button onClick={onClose}>Close</button>
      {selectedRooms.map((room: any, idx: number) => (
        <button key={idx} onClick={() => onRemoveRoom(room)}>Remove {idx}</button>
      ))}
    </div>
  )),
  ShareModal: vi.fn(({ isOpen, onClose, onSubmit, handleAddEmail }) => 
    isOpen ? (
      <div data-testid="share-modal">
        <button onClick={handleAddEmail}>Add Email</button>
        <button onClick={onSubmit}>Send Email</button>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
  ),
  RoomPriceModal: vi.fn(({ isOpen, hotel, onClose, onAddRoom }) => 
    isOpen ? (
      <div data-testid="room-price-modal">
        <h3>{hotel?.HotelName}</h3>
        <button onClick={() => onAddRoom({ hotelCode: hotel?.HotelCode })}>Add Room</button>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
  ),
  ImageGalleryModal: vi.fn(({ isOpen, images, onClose, onImageClick }) => 
    isOpen ? (
      <div data-testid="image-gallery-modal">
        {images.map((img: string, idx: number) => (
          <button key={idx} onClick={() => onImageClick(idx)}>Image {idx}</button>
        ))}
        <button onClick={onClose}>Close Gallery</button>
      </div>
    ) : null
  ),
  ImageZoomModal: vi.fn(({ isOpen, onClose, onPrevious, onNext }) => 
    isOpen ? (
      <div data-testid="image-zoom-modal">
        <button onClick={onPrevious}>Previous</button>
        <button onClick={onNext}>Next</button>
        <button onClick={onClose}>Close Zoom</button>
      </div>
    ) : null
  ),
};

// Custom render function with Router
export function renderWithRouter(
  ui: ReactElement,
  { initialRoute = '/', routeState, ...renderOptions }: ExtendedRenderOptions = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={[{ pathname: initialRoute, state: routeState }]}>
      <Routes>
        <Route path="/" element={children} />
        <Route path="/HotelDetail" element={<div data-testid="hotel-detail-page">Hotel Detail</div>} />
      </Routes>
    </MemoryRouter>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// Mock hook factory
export function createMockBootstrapHook(overrides = {}) {
  return {
    company: 'Acme Corp',
    setCompany: vi.fn(),
    companies: [],
    showDropdown: false,
    setShowDropdown: vi.fn(),
    fetchCompanies: vi.fn(),
    loader: false,
    companiesLoading: false,
    city: 'Mumbai',
    setCity: vi.fn(),
    cities: [],
    showDropdown2: false,
    setShowDropdown2: vi.fn(),
    fetchCities: vi.fn(),
    selectedCityCode: 'BOM',
    setSelectedCityCode: vi.fn(),
    citiesLoading: false,
    checkInDate: new Date('2024-02-01'),
    setCheckInDate: vi.fn(),
    isCheckInOpen: false,
    setCheckInIsOpen: vi.fn(),
    checkOutDate: new Date('2024-02-05'),
    setCheckOutDate: vi.fn(),
    isCheckOutOpen: false,
    setCheckOutIsOpen: vi.fn(),
    roomCount: 1,
    roomadultCount: [2],
    roomchildCount: [0],
    childrenAges: [[]],
    isDropdownOpen: false,
    setIsDropdownOpen: vi.fn(),
    errorMessage: '',
    handleSubmitForm: vi.fn(),
    handleSelection: vi.fn(),
    handleChildAgeChange: vi.fn(),
    handleApply: vi.fn(),
    combinedHotels: [],
    searchParams: {
      checkIn: '2024-02-01',
      checkOut: '2024-02-05',
      cityCode: 'BOM',
      rooms: 1,
      adults: [2],
      children: [0],
    },
    bookNow: vi.fn(),
    ...overrides,
  };
}

export function createMockFiltersHook(hotels: any[] = [], overrides = {}) {
  return {
    filters: {
      search: '',
      priceRange: [0, 50000],
      ratings: [],
      facilities: [],
      mealTypes: [],
    },
    allRatings: [5, 4, 3, 2, 1],
    allFacilities: ['Pool', 'Gym', 'Spa', 'Restaurant', 'WiFi', 'Parking'],
    allMealTypes: ['Breakfast', 'Half Board', 'Full Board'],
    priceRange: [0, 50000],
    handleFilterChange: vi.fn(),
    handleSearchChange: vi.fn(),
    filteredHotels: hotels,
    ...overrides,
  };
}

export function createMockShareHook(overrides = {}) {
  return {
    selectedRooms: [],
    isModalOpen: false,
    formData: {
      approverEmail: '',
      subject: '',
      message: '',
    },
    toEmailList: [],
    ccEmailList: [],
    errors: {},
    isLoading: false,
    toEmail: '',
    setToEmail: vi.fn(),
    ccEmail: '',
    setCcEmail: vi.fn(),
    handleSubmit: vi.fn(),
    handleChange: vi.fn(),
    handleAddEmail: vi.fn(),
    handleDeleteEmail: vi.fn(),
    handleApproverEmailBlur: vi.fn(),
    handleCancel: vi.fn(),
    handleShareOptions: vi.fn(),
    addRoom: vi.fn(),
    removeRoom: vi.fn(),
    ...overrides,
  };
}


// ============================================================================
// MOCK DATA GENERATORS
// ============================================================================

export function createMockHotel(overrides: any = {}) {
  return {
    HotelCode: 'HTL001',
    HotelName: 'Test Hotel',
    Description: 'HeadLine : Test Location',
    StarRating: 4,
    Address: '123 Test Street',
    Images: ['img1.jpg', 'img2.jpg'],
    Rooms: [],
    Latitude: 18.9388,
    Longitude: 72.8354,
    Facilities: ['WiFi', 'Pool'],
    HotelRating: 4.2,
    ...overrides,
  };
}

export function createMockRoom(overrides: any = {}) {
  return {
    RoomIndex: 0,
    RoomTypeCode: 'DLX',
    RoomTypeName: 'Deluxe Room',
    RatePlanCode: 'BB',
    RatePlanName: 'Bed & Breakfast',
    Price: {
      PublishedPrice: 15000,
      OfferedPrice: 12000,
      Currency: 'INR',
      RoomPrice: 10000,
      Tax: 2000,
    },
    CancellationPolicies: [],
    Amenities: ['WiFi', 'TV', 'AC'],
    Inclusion: ['Breakfast'],
    LastCancellationDate: '2024-01-10',
    ...overrides,
  };
}