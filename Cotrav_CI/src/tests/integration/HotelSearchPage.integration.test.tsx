
// src/tests/integration/HotelSearchPage.integration.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import type { Mock } from 'vitest';

// ============================================================================
// STEP 1: Hoist variables that will be used in vi.mock()
// ============================================================================

vi.mock('@/hotel/components/HotelCard', () => ({
  HotelCard: vi.fn(() => null),
}));
const { mockNavigate, mockUseLocation } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
  mockUseLocation: vi.fn(() => ({ state: {} })),
}));

// ============================================================================
// STEP 2: Define ALL mocks (after hoisted variables)
// ============================================================================

// Mock @/index module with inline definitions
vi.mock('@/index', () => ({
  hotelHooks: {
    useHotelBootstrap: vi.fn(),
    useHotelFilters: vi.fn(),
    useHotelShare: vi.fn(),
  },
  components: {
    SearchHeader: vi.fn(() => <div data-testid="search-header">Search Header</div>),
    FilterSidebar: vi.fn(({ onMapClick }) => (
      <div data-testid="filter-sidebar">
        <button onClick={onMapClick}>Open Map</button>
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
  },
  modals: {
    MapViewModal: vi.fn(({ isOpen, onClose }) => 
      isOpen ? (
        <div data-testid="map-modal">
          <button onClick={onClose}>Close Map</button>
        </div>
      ) : null
    ),
    SharePanelModal: vi.fn(({ selectedRooms, onClose, onShare, onRemoveRoom }) =>
      selectedRooms.length > 0 ? (
        <div data-testid="share-panel-modal">
          <div data-testid="selected-rooms-count">{selectedRooms.length}</div>
          <button onClick={onShare}>Share</button>
          <button onClick={onClose}>Close</button>
          {selectedRooms.map((room: any, idx: number) => (
            <button key={idx} onClick={() => onRemoveRoom(room)}>
              Remove {idx}
            </button>
          ))}
        </div>
      ) : null
    ),
    ShareModal: vi.fn(({ isOpen, onClose, onSubmit }) => 
      isOpen ? (
        <div data-testid="share-modal">
          <button onClick={onSubmit}>Send Email</button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null
    ),
    RoomPriceModal: vi.fn(({ isOpen, hotel, onClose, onAddRoom }) => 
      isOpen && hotel ? (
        <div data-testid="room-price-modal">
          <h3>{hotel.HotelName}</h3>
          <button onClick={() => onAddRoom({ hotelCode: hotel.HotelCode })}>
            Add Room
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null
    ),
    ImageGalleryModal: vi.fn(({ isOpen, images, onClose, onImageClick }) => 
      isOpen ? (
        <div data-testid="image-gallery-modal">
          {images.map((img: string, idx: number) => (
            <button key={idx} onClick={() => onImageClick(idx)}>
              Image {idx}
            </button>
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
  },
  hotelTypes: {},
}));

// Mock layouts
vi.mock('@/Layouts/header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock('@/Layouts/footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

// Mock react-router-dom using hoisted variables
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: mockUseLocation,
  };
});

// ============================================================================
// STEP 3: Import after mocks are defined
// ============================================================================

import HotelSearchPage from '@/hotel/pages/HotelSearchPage';
import { hotelHooks, components } from '@/index';
import { renderWithRouter } from '../utils/test-utils';
import {
  createMockBootstrapHook,
  createMockFiltersHook,
  createMockShareHook,
} from '../utils/test-utils';

// ============================================================================
// STEP 4: Type-safe mock helpers
// ============================================================================

// Helper to get properly typed mocks
const getHookMocks = () => ({
  useHotelBootstrap: hotelHooks.useHotelBootstrap as Mock,
  useHotelFilters: hotelHooks.useHotelFilters as Mock,
  useHotelShare: hotelHooks.useHotelShare as Mock,
});

const getComponentMocks = () => ({
  SearchHeader: components.SearchHeader as Mock,
  FilterSidebar: components.FilterSidebar as Mock,
  // HotelCard: components.HotelCard as Mock,
});

// ============================================================================
// TESTS
// ============================================================================

describe('HotelSearchPage - Integration Tests', () => {
  let user: ReturnType<typeof userEvent.setup>;
  let hooks: ReturnType<typeof getHookMocks>;
  let comps: ReturnType<typeof getComponentMocks>;

  beforeEach(() => {
    user = userEvent.setup();
    hooks = getHookMocks();
    comps = getComponentMocks();
    
    vi.clearAllMocks();
    mockNavigate.mockClear();
    mockUseLocation.mockReturnValue({ state: {} });
  });

  describe('Initial Render & Page Structure', () => {
    it('should render all main sections of the page', () => {
      const mockBootstrap = createMockBootstrapHook({ combinedHotels: [] });
      const mockFilters = createMockFiltersHook([]);
      const mockShare = createMockShareHook();

      hooks.useHotelBootstrap.mockReturnValue(mockBootstrap);
      hooks.useHotelFilters.mockReturnValue(mockFilters);
      hooks.useHotelShare.mockReturnValue(mockShare);

      renderWithRouter(<HotelSearchPage />);

      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('search-header')).toBeInTheDocument();
      expect(screen.getByTestId('filter-sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('should display city name in header', () => {
      const mockBootstrap = createMockBootstrapHook({ 
        city: 'Mumbai',
        combinedHotels: []
      });
      const mockFilters = createMockFiltersHook([]);
      const mockShare = createMockShareHook();

      hooks.useHotelBootstrap.mockReturnValue(mockBootstrap);
      hooks.useHotelFilters.mockReturnValue(mockFilters);
      hooks.useHotelShare.mockReturnValue(mockShare);

      renderWithRouter(<HotelSearchPage />);

      expect(screen.getByText(/Showing Properties in Mumbai/i)).toBeInTheDocument();
    });

    it('should display "Selected City" when city is not provided', () => {
      const mockBootstrap = createMockBootstrapHook({ 
        city: '',
        combinedHotels: []
      });
      const mockFilters = createMockFiltersHook([]);
      const mockShare = createMockShareHook();

      hooks.useHotelBootstrap.mockReturnValue(mockBootstrap);
      hooks.useHotelFilters.mockReturnValue(mockFilters);
      hooks.useHotelShare.mockReturnValue(mockShare);

      renderWithRouter(<HotelSearchPage />);

      expect(screen.getByText(/Showing Properties in Selected City/i)).toBeInTheDocument();
    });
  });

  describe('Hotel Display & Filtering', () => {
    it('should render hotel cards when hotels are available', () => {
      const mockHotels = [
        {
          HotelCode: 'HTL001',
          HotelName: 'Grand Plaza Hotel',
          Description: 'HeadLine : Downtown',
          Images: ['img1.jpg'],
          Rooms: [],
        },
        {
          HotelCode: 'HTL002',
          HotelName: 'Seaside Resort',
          Description: 'HeadLine : Beachfront',
          Images: ['img2.jpg'],
          Rooms: [],
        },
      ];

      const mockBootstrap = createMockBootstrapHook({ combinedHotels: mockHotels });
      const mockFilters = createMockFiltersHook(mockHotels);
      const mockShare = createMockShareHook();

      hooks.useHotelBootstrap.mockReturnValue(mockBootstrap);
      hooks.useHotelFilters.mockReturnValue(mockFilters);
      hooks.useHotelShare.mockReturnValue(mockShare);

      renderWithRouter(<HotelSearchPage />);

      expect(screen.getByTestId('hotel-card-HTL001')).toBeInTheDocument();
      expect(screen.getByTestId('hotel-card-HTL002')).toBeInTheDocument();
      expect(screen.getByText('Grand Plaza Hotel')).toBeInTheDocument();
      expect(screen.getByText('Seaside Resort')).toBeInTheDocument();
    });

    it('should display "Result Not Found" image when no hotels available', () => {
      const mockBootstrap = createMockBootstrapHook({ combinedHotels: [] });
      const mockFilters = createMockFiltersHook([]);
      const mockShare = createMockShareHook();

      hooks.useHotelBootstrap.mockReturnValue(mockBootstrap);
      hooks.useHotelFilters.mockReturnValue(mockFilters);
      hooks.useHotelShare.mockReturnValue(mockShare);

      renderWithRouter(<HotelSearchPage />);

      const noResultImage = screen.getByAltText('Result Not Found');
      expect(noResultImage).toBeInTheDocument();
      expect(noResultImage).toHaveAttribute('src', '/img/ResultNot.png');
    });

    it('should pass correct props to FilterSidebar component', () => {
      const mockBootstrap = createMockBootstrapHook({ combinedHotels: [] });
      const mockFilters = createMockFiltersHook([]);
      const mockShare = createMockShareHook();

      hooks.useHotelBootstrap.mockReturnValue(mockBootstrap);
      hooks.useHotelFilters.mockReturnValue(mockFilters);
      hooks.useHotelShare.mockReturnValue(mockShare);

      renderWithRouter(<HotelSearchPage />);

      // Check that FilterSidebar was called with correct props
      const callArgs = comps.FilterSidebar.mock.calls[0][0];
      
      expect(callArgs.filters).toEqual(mockFilters.filters);
      expect(callArgs.allRatings).toEqual(mockFilters.allRatings);
      expect(callArgs.allFacilities).toEqual(mockFilters.allFacilities);
      expect(callArgs.allMealTypes).toEqual(mockFilters.allMealTypes);
      expect(callArgs.priceRange).toEqual(mockFilters.priceRange);
      expect(callArgs.handleFilterChange).toBe(mockFilters.handleFilterChange);
      expect(callArgs.handleSearchChange).toBe(mockFilters.handleSearchChange);
      expect(callArgs.hotels).toEqual(mockFilters.filteredHotels);
      expect(callArgs.allHotels).toEqual(mockBootstrap.combinedHotels);
    });
  });

  describe('Hotel Card Interactions', () => {
    it('should handle "View Price" button click', async () => {
      const mockHotel = {
        HotelCode: 'HTL001',
        HotelName: 'Grand Plaza Hotel',
        Description: 'HeadLine : Downtown',
        Images: ['img1.jpg'],
        Rooms: [],
      };

      const mockBootstrap = createMockBootstrapHook({ combinedHotels: [mockHotel] });
      const mockFilters = createMockFiltersHook([mockHotel]);
      const mockShare = createMockShareHook();

      hooks.useHotelBootstrap.mockReturnValue(mockBootstrap);
      hooks.useHotelFilters.mockReturnValue(mockFilters);
      hooks.useHotelShare.mockReturnValue(mockShare);

      renderWithRouter(<HotelSearchPage />);

      const viewPriceButton = screen.getByRole('button', { name: /view price/i });
      await user.click(viewPriceButton);

      await waitFor(() => {
        expect(screen.getByTestId('room-price-modal')).toBeInTheDocument();
      });
    });

    it('should handle "Book Now" button click and navigate correctly', async () => {
      const mockHotel = {
        HotelCode: 'HTL001',
        HotelName: 'Grand Plaza Hotel',
        Description: 'HeadLine : Downtown',
        Images: ['img1.jpg'],
        Rooms: [],
      };

      const mockBootstrap = createMockBootstrapHook({ 
        combinedHotels: [mockHotel],
        searchParams: {
          checkIn: '2024-02-01',
          checkOut: '2024-02-05',
        },
      });
      const mockFilters = createMockFiltersHook([mockHotel]);
      const mockShare = createMockShareHook();

      hooks.useHotelBootstrap.mockReturnValue(mockBootstrap);
      hooks.useHotelFilters.mockReturnValue(mockFilters);
      hooks.useHotelShare.mockReturnValue(mockShare);

      renderWithRouter(<HotelSearchPage />);

      const bookNowButton = screen.getByRole('button', { name: /book now/i });
      await user.click(bookNowButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/HotelDetail', {
          state: {
            hotel: mockHotel,
            fromBookNow: true,
            taxivaxi: {
              checkindate: '2024-02-01',
              checkoutdate: '2024-02-05',
            },
          },
        });
      });
    });

    it('should not navigate when searchParams is not available', async () => {
      const mockHotel = {
        HotelCode: 'HTL001',
        HotelName: 'Grand Plaza Hotel',
        Description: 'HeadLine : Downtown',
        Images: ['img1.jpg'],
        Rooms: [],
      };

      const mockBootstrap = createMockBootstrapHook({ 
        combinedHotels: [mockHotel],
        searchParams: null,
      });
      const mockFilters = createMockFiltersHook([mockHotel]);
      const mockShare = createMockShareHook();

      hooks.useHotelBootstrap.mockReturnValue(mockBootstrap);
      hooks.useHotelFilters.mockReturnValue(mockFilters);
      hooks.useHotelShare.mockReturnValue(mockShare);

      renderWithRouter(<HotelSearchPage />);

      const bookNowButton = screen.getByRole('button', { name: /book now/i });
      await user.click(bookNowButton);

      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should handle "View Images" button click', async () => {
      const mockImages = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
      const mockHotel = {
        HotelCode: 'HTL001',
        HotelName: 'Grand Plaza Hotel',
        Description: 'HeadLine : Downtown',
        Images: mockImages,
        Rooms: [],
      };

      const mockBootstrap = createMockBootstrapHook({ combinedHotels: [mockHotel] });
      const mockFilters = createMockFiltersHook([mockHotel]);
      const mockShare = createMockShareHook();

      hooks.useHotelBootstrap.mockReturnValue(mockBootstrap);
      hooks.useHotelFilters.mockReturnValue(mockFilters);
      hooks.useHotelShare.mockReturnValue(mockShare);

      renderWithRouter(<HotelSearchPage />);

      const viewImagesButton = screen.getByRole('button', { name: /view images/i });
      await user.click(viewImagesButton);

      await waitFor(() => {
        expect(screen.getByTestId('image-gallery-modal')).toBeInTheDocument();
      });
    });
  });

  describe('Modal Interactions', () => {
    it('should open and close Map modal', async () => {
      const mockBootstrap = createMockBootstrapHook({ combinedHotels: [] });
      const mockFilters = createMockFiltersHook([]);
      const mockShare = createMockShareHook();

      hooks.useHotelBootstrap.mockReturnValue(mockBootstrap);
      hooks.useHotelFilters.mockReturnValue(mockFilters);
      hooks.useHotelShare.mockReturnValue(mockShare);

      renderWithRouter(<HotelSearchPage />);

      const openMapButton = screen.getByRole('button', { name: /open map/i });
      await user.click(openMapButton);

      await waitFor(() => {
        expect(screen.getByTestId('map-modal')).toBeInTheDocument();
      });

      const closeMapButton = screen.getByRole('button', { name: /close map/i });
      await user.click(closeMapButton);

      await waitFor(() => {
        expect(screen.queryByTestId('map-modal')).not.toBeInTheDocument();
      });
    });

    it('should open and close Room Price modal', async () => {
      const mockHotel = {
        HotelCode: 'HTL001',
        HotelName: 'Grand Plaza Hotel',
        Description: 'HeadLine : Downtown',
        Images: ['img1.jpg'],
        Rooms: [],
      };

      const mockBootstrap = createMockBootstrapHook({ combinedHotels: [mockHotel] });
      const mockFilters = createMockFiltersHook([mockHotel]);
      const mockShare = createMockShareHook();

      hooks.useHotelBootstrap.mockReturnValue(mockBootstrap);
      hooks.useHotelFilters.mockReturnValue(mockFilters);
      hooks.useHotelShare.mockReturnValue(mockShare);

      renderWithRouter(<HotelSearchPage />);

      const viewPriceButton = screen.getByRole('button', { name: /view price/i });
      await user.click(viewPriceButton);

      await waitFor(() => {
        expect(screen.getByTestId('room-price-modal')).toBeInTheDocument();
      });

      // Use within() to scope the query to the modal only
      const modal = screen.getByTestId('room-price-modal');
      expect(within(modal).getByText('Grand Plaza Hotel')).toBeInTheDocument();

      const closeButton = within(modal).getByRole('button', { name: /close/i });
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByTestId('room-price-modal')).not.toBeInTheDocument();
      });
    });

    it('should navigate through image gallery and zoom', async () => {
      const mockImages = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
      const mockHotel = {
        HotelCode: 'HTL001',
        HotelName: 'Grand Plaza Hotel',
        Description: 'HeadLine : Downtown',
        Images: mockImages,
        Rooms: [],
      };

      const mockBootstrap = createMockBootstrapHook({ combinedHotels: [mockHotel] });
      const mockFilters = createMockFiltersHook([mockHotel]);
      const mockShare = createMockShareHook();

      hooks.useHotelBootstrap.mockReturnValue(mockBootstrap);
      hooks.useHotelFilters.mockReturnValue(mockFilters);
      hooks.useHotelShare.mockReturnValue(mockShare);

      renderWithRouter(<HotelSearchPage />);

      const viewImagesButton = screen.getByRole('button', { name: /view images/i });
      await user.click(viewImagesButton);

      await waitFor(() => {
        expect(screen.getByTestId('image-gallery-modal')).toBeInTheDocument();
      });

      const imageButton = screen.getByRole('button', { name: /image 1/i });
      await user.click(imageButton);

      await waitFor(() => {
        expect(screen.getByTestId('image-zoom-modal')).toBeInTheDocument();
      });

      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      const previousButton = screen.getByRole('button', { name: /previous/i });
      await user.click(previousButton);

      const closeZoomButton = screen.getByRole('button', { name: /close zoom/i });
      await user.click(closeZoomButton);

      await waitFor(() => {
        expect(screen.queryByTestId('image-zoom-modal')).not.toBeInTheDocument();
      });
    });
  });

  describe('Share Functionality', () => {
    it('should display SharePanelModal when rooms are selected', () => {
      const mockSelectedRooms = [
        { hotelCode: 'HTL001', roomIndex: 0 },
        { hotelCode: 'HTL001', roomIndex: 1 },
      ];

      const mockBootstrap = createMockBootstrapHook({ combinedHotels: [] });
      const mockFilters = createMockFiltersHook([]);
      const mockShare = createMockShareHook({ selectedRooms: mockSelectedRooms });

      hooks.useHotelBootstrap.mockReturnValue(mockBootstrap);
      hooks.useHotelFilters.mockReturnValue(mockFilters);
      hooks.useHotelShare.mockReturnValue(mockShare);

      renderWithRouter(<HotelSearchPage />);

      expect(screen.getByTestId('share-panel-modal')).toBeInTheDocument();
      expect(screen.getByTestId('selected-rooms-count')).toHaveTextContent('2');
    });

    it('should handle room addition from Room Price modal', async () => {
      const mockHotel = {
        HotelCode: 'HTL001',
        HotelName: 'Grand Plaza Hotel',
        Description: 'HeadLine : Downtown',
        Images: ['img1.jpg'],
        Rooms: [],
      };

      const mockAddRoom = vi.fn();
      const mockBootstrap = createMockBootstrapHook({ combinedHotels: [mockHotel] });
      const mockFilters = createMockFiltersHook([mockHotel]);
      const mockShare = createMockShareHook({ addRoom: mockAddRoom });

      hooks.useHotelBootstrap.mockReturnValue(mockBootstrap);
      hooks.useHotelFilters.mockReturnValue(mockFilters);
      hooks.useHotelShare.mockReturnValue(mockShare);

      renderWithRouter(<HotelSearchPage />);

      const viewPriceButton = screen.getByRole('button', { name: /view price/i });
      await user.click(viewPriceButton);

      await waitFor(() => {
        expect(screen.getByTestId('room-price-modal')).toBeInTheDocument();
      });

      const addRoomButton = screen.getByRole('button', { name: /add room/i });
      await user.click(addRoomButton);

      expect(mockAddRoom).toHaveBeenCalledWith({ hotelCode: 'HTL001' });
    });
  });

  describe('Edge Cases', () => {
    it('should handle hotels with missing optional fields', () => {
      const mockHotel = {
        HotelCode: 'HTL001',
        HotelName: 'Test Hotel',
      };

      const mockBootstrap = createMockBootstrapHook({ combinedHotels: [mockHotel] });
      const mockFilters = createMockFiltersHook([mockHotel]);
      const mockShare = createMockShareHook();

      hooks.useHotelBootstrap.mockReturnValue(mockBootstrap);
      hooks.useHotelFilters.mockReturnValue(mockFilters);
      hooks.useHotelShare.mockReturnValue(mockShare);

      renderWithRouter(<HotelSearchPage />);

      // Check that HotelCard was called with the hotel having default values
      const callArgs = comps.HotelCard.mock.calls[0][0];
      
      expect(callArgs.hotel.HotelCode).toBe('HTL001');
      expect(callArgs.hotel.HotelName).toBe('Test Hotel');
      expect(callArgs.hotel.Description).toBe('');
      expect(callArgs.hotel.Images).toEqual([]);
      expect(callArgs.hotel.Rooms).toEqual([]);
    });
  });
});