import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest'
import { useHotelFilters } from './useHotelFilters'
import type { Hotel, CancellationPolicy } from '@/hotel/types/hotel'
import { hotelUtils } from '@/index'

// --------------------------------------------------
// MOCK MODULES
// --------------------------------------------------

vi.mock('@/index', () => ({
  hotelUtils: {
    calculatePerNightPrice: vi.fn(),
  },
  hotelTypes: {},
}))

// --------------------------------------------------
// MOCK SYSTEM TIME
// --------------------------------------------------

beforeAll(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-01-06T12:00:00Z')) // ensures refundable policies are active
})

afterAll(() => {
  vi.useRealTimers()
})

// --------------------------------------------------
// TEST DATA
// --------------------------------------------------

const refundablePolicies: CancellationPolicy[] = [
  {
    FromDate: '2020-01-01T00:00:00Z',
    ToDate: '2099-12-31T23:59:59Z',
    ChargeType: 'Fixed',
    CancellationCharge: 0,
  },
]

const nonRefundablePolicies: CancellationPolicy[] = [
  {
    FromDate: '2020-01-01T00:00:00Z',
    ToDate: '2021-01-01T00:00:00Z',
    ChargeType: 'Percentage',
    CancellationCharge: 100,
  },
]


const mockHotels: Hotel[] = [
  {
    HotelCode: 'H1',
    HotelName: 'Hotel Alpha',
    HotelRating: 4,
    CityName: 'Bangalore',
    Address: 'MG Road',
    HotelFacilities: ['Wifi', 'Pool'],
    Rooms: [
      {
        BookingCode: 'R1',
        Name: 'Deluxe Room',
        MealType: 'Breakfast',
        TotalFare: 3000,
        TotalTax: 300,
        CancelPolicies: refundablePolicies,
      },
    ],
    RateConditions: {},
  },
  {
    HotelCode: 'H2',
    HotelName: 'Hotel Beta',
    HotelRating: 5,
    CityName: 'Mumbai',
    Address: 'Bandra',
    HotelFacilities: ['Wifi'],
    Rooms: [
      {
        BookingCode: 'R2',
        Name: 'Premium Room',
        MealType: 'Dinner',
        TotalFare: 5000,
        TotalTax: 500,
        CancelPolicies: nonRefundablePolicies,
      },
    ],
    RateConditions: {},
  },
]

// --------------------------------------------------
// SETUP
// --------------------------------------------------

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(hotelUtils.calculatePerNightPrice).mockImplementation(
    (hotel: Hotel) => (hotel.HotelCode === 'H1' ? 200 : hotel.HotelCode === 'H2' ? 500 : 0)
  )
})

// --------------------------------------------------
// TESTS
// --------------------------------------------------

describe('useHotelFilters', () => {
  it('extracts allFacilities, allRatings, allMealTypes', () => {
    const { result } = renderHook(() => useHotelFilters(mockHotels))

    expect(result.current.allFacilities.sort()).toEqual(['Pool', 'Wifi'])
    expect(result.current.allRatings).toEqual([5, 4]) // descending by default
    expect(result.current.allMealTypes.sort()).toEqual(['Breakfast', 'Dinner'])
  })

  it('calculates correct priceRange from per-night prices', () => {
    const { result } = renderHook(() => useHotelFilters(mockHotels))
    expect(result.current.priceRange).toEqual({ min: 200, max: 500 })
  })

  it('filters hotels by price', () => {
    const { result } = renderHook(() => useHotelFilters(mockHotels))
    act(() => result.current.handleFilterChange('price', [0, 300]))
    expect(result.current.filteredHotels).toHaveLength(1)
    expect(result.current.filteredHotels[0].HotelCode).toBe('H1')
  })

  it('filters hotels by rating', () => {
    const { result } = renderHook(() => useHotelFilters(mockHotels))
    act(() => result.current.handleFilterChange('rating', 5))
    expect(result.current.filteredHotels).toHaveLength(1)
    expect(result.current.filteredHotels[0].HotelCode).toBe('H2')
  })

  it('filters hotels by facility', () => {
    const { result } = renderHook(() => useHotelFilters(mockHotels))
    act(() => result.current.handleFilterChange('facility', 'Pool'))
    expect(result.current.filteredHotels).toHaveLength(1)
    expect(result.current.filteredHotels[0].HotelCode).toBe('H1')
  })

  it('filters hotels by meal type', () => {
    const { result } = renderHook(() => useHotelFilters(mockHotels))
    act(() => result.current.handleFilterChange('meal', 'Dinner'))
    expect(result.current.filteredHotels).toHaveLength(1)
    expect(result.current.filteredHotels[0].HotelCode).toBe('H2')
  })

  it('filters hotels by refundable', () => {
    // H1 refundable (active policy), H2 non-refundable
    const { result } = renderHook(() => useHotelFilters(mockHotels))
    act(() => result.current.handleFilterChange('refundable', true))
    expect(result.current.filteredHotels).toHaveLength(1)
    expect(result.current.filteredHotels[0].HotelCode).toBe('H1')
  })

  it('filters hotels by search query', () => {
    const { result } = renderHook(() => useHotelFilters(mockHotels))
    act(() => result.current.handleFilterChange('search', 'beta'))
    expect(result.current.filteredHotels).toHaveLength(1)
    expect(result.current.filteredHotels[0].HotelCode).toBe('H2')
  })

  it('resets filters correctly', () => {
    const { result } = renderHook(() => useHotelFilters(mockHotels))
    act(() => result.current.handleFilterChange('rating', 5))
    expect(result.current.filteredHotels).toHaveLength(1)
    act(() => result.current.resetFilters())
    expect(result.current.filteredHotels).toHaveLength(2)
  })
})

