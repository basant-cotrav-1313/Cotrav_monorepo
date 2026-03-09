import { http, HttpResponse, delay } from 'msw';
import type { Hotel, HotelSearchParams, Room, CancellationPolicy } from '@/hotel/types/hotel';

const mockCancellationPolicies: CancellationPolicy[] = [
  {
    ChargeType: 'Percentage',
    CancellationCharge: 10,
    FromDate: '2024-01-01',
    ToDate: '2024-01-15',
  },
];

const mockRooms: Room[] = [
  {
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
    CancellationPolicies: mockCancellationPolicies,
    Amenities: ['WiFi', 'TV', 'AC'],
    Inclusion: ['Breakfast'],
    LastCancellationDate: '2024-01-10',
  },
  {
    RoomIndex: 1,
    RoomTypeCode: 'STE',
    RoomTypeName: 'Suite',
    RatePlanCode: 'HB',
    RatePlanName: 'Half Board',
    Price: {
      PublishedPrice: 25000,
      OfferedPrice: 20000,
      Currency: 'INR',
      RoomPrice: 18000,
      Tax: 2000,
    },
    CancellationPolicies: mockCancellationPolicies,
    Amenities: ['WiFi', 'TV', 'AC', 'Minibar'],
    Inclusion: ['Breakfast', 'Dinner'],
    LastCancellationDate: '2024-01-10',
  },
];

const mockHotels: Hotel[] = [
  {
    HotelCode: 'HTL001',
    HotelName: 'Grand Plaza Hotel',
    Description: 'HeadLine : Downtown Mumbai - Luxury 5-star hotel with panoramic city views',
    StarRating: 5,
    Address: '123 Marine Drive, Mumbai',
    Images: [
      'https://example.com/hotel1-img1.jpg',
      'https://example.com/hotel1-img2.jpg',
      'https://example.com/hotel1-img3.jpg',
    ],
    Rooms: mockRooms,
    Latitude: 18.9388,
    Longitude: 72.8354,
    Facilities: ['Pool', 'Gym', 'Spa', 'Restaurant'],
    HotelRating: 4.5,
  },
  {
    HotelCode: 'HTL002',
    HotelName: 'Seaside Resort',
    Description: 'HeadLine : Beachfront Property - Relaxing resort by the sea',
    StarRating: 4,
    Address: '456 Beach Road, Mumbai',
    Images: [
      'https://example.com/hotel2-img1.jpg',
      'https://example.com/hotel2-img2.jpg',
    ],
    Rooms: mockRooms.map(room => ({
      ...room,
      Price: {
        ...room.Price,
        OfferedPrice: room.Price.OfferedPrice * 0.8,
      },
    })),
    Latitude: 18.9750,
    Longitude: 72.8258,
    Facilities: ['Pool', 'Beach Access', 'Restaurant'],
    HotelRating: 4.2,
  },
  {
    HotelCode: 'HTL003',
    HotelName: 'Budget Inn',
    Description: 'HeadLine : Airport Area - Comfortable budget accommodation',
    StarRating: 3,
    Address: '789 Airport Road, Mumbai',
    Images: ['https://example.com/hotel3-img1.jpg'],
    Rooms: mockRooms.map(room => ({
      ...room,
      Price: {
        ...room.Price,
        OfferedPrice: room.Price.OfferedPrice * 0.5,
      },
    })),
    Latitude: 19.0896,
    Longitude: 72.8656,
    Facilities: ['WiFi', 'Parking'],
    HotelRating: 3.8,
  },
];

const mockCompanies = [
  { CompanyCode: 'COMP001', CompanyName: 'Acme Corp' },
  { CompanyCode: 'COMP002', CompanyName: 'TechCo Ltd' },
];

const mockCities = [
  { CityCode: 'BOM', CityName: 'Mumbai', CountryCode: 'IN' },
  { CityCode: 'DEL', CityName: 'Delhi', CountryCode: 'IN' },
  { CityCode: 'BLR', CityName: 'Bangalore', CountryCode: 'IN' },
];

export const handlers = [
  // Hotel Search API
  http.post('/api/hotel/search', async ({ request }) => {
    await delay(100); // Simulate network delay
    const body = await request.json();
    
    return HttpResponse.json({
      success: true,
      data: {
        hotels: mockHotels,
        searchId: 'SEARCH_123456',
      },
    });
  }),

  // Company Search API
  http.get('/api/companies', async ({ request }) => {
    const url = new URL(request.url);
    const query = url.HotelSearchParams.get('q')?.toLowerCase() || '';
    
    await delay(50);
    
    const filtered = mockCompanies.filter(c => 
      c.CompanyName.toLowerCase().includes(query)
    );
    
    return HttpResponse.json({
      success: true,
      data: filtered,
    });
  }),

  // City Search API
  http.get('/api/cities', async ({ request }) => {
    const url = new URL(request.url);
    const query = url.HotelSearchParams.get('q')?.toLowerCase() || '';
    
    await delay(50);
    
    const filtered = mockCities.filter(c => 
      c.CityName.toLowerCase().includes(query)
    );
    
    return HttpResponse.json({
      success: true,
      data: filtered,
    });
  }),

  // Share Hotel API
  http.post('/api/hotel/share', async ({ request }) => {
    await delay(100);
    const body = await request.json();
    
    return HttpResponse.json({
      success: true,
      message: 'Hotels shared successfully',
      data: { emailsSent: body.toEmails?.length || 0 },
    });
  }),

  // Hotel Details API
  http.get('/api/hotel/:hotelCode', async ({ params }) => {
    await delay(100);
    const hotel = mockHotels.find(h => h.HotelCode === params.hotelCode);
    
    if (!hotel) {
      return HttpResponse.json(
        { success: false, error: 'Hotel not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json({
      success: true,
      data: hotel,
    });
  }),
];

// Error handlers for testing error scenarios
export const errorHandlers = {
  networkError: http.post('/api/hotel/search', () => {
    return HttpResponse.error();
  }),
  
  serverError: http.post('/api/hotel/search', () => {
    return HttpResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }),
  
  emptyResults: http.post('/api/hotel/search', async () => {
    await delay(100);
    return HttpResponse.json({
      success: true,
      data: { hotels: [], searchId: 'SEARCH_EMPTY' },
    });
  }),
};