import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { usePriceFilter } from './usePriceFilter'
import { calculatePriceBuckets } from '../utils/filter.utils'
import type { Hotel } from '../types/hotel'

// --------------------------------------------------
// Mock calculatePriceBuckets
// --------------------------------------------------

vi.mock('../utils/filter.utils', () => ({
  calculatePriceBuckets: vi.fn(),
}))

afterEach(() => {
  vi.clearAllMocks()
})

// --------------------------------------------------
// Test data (MATCHES Hotel interface)
// --------------------------------------------------

const mockHotels: Hotel[] = [
  {
    HotelCode: 'H1',
    HotelName: 'Hotel Alpha',
    HotelRating: 4,
    CityName: 'Bangalore',
    Address: 'MG Road',
    RateConditions: {},
  },
  {
    HotelCode: 'H2',
    HotelName: 'Hotel Beta',
    HotelRating: 5,
    CityName: 'Mumbai',
    Address: 'Bandra',
    RateConditions: {},
  },
  {
    HotelCode: 'H3',
    HotelName: 'Hotel Gamma',
    HotelRating: 3,
    CityName: 'Delhi',
    Address: 'CP',
    RateConditions: {},
  },
]

const mockBuckets = [
  {
    label: 'Low',
    min: 0,
    max: 150,
    range: '0-150',
  },
  {
    label: 'Mid',
    min: 151,
    max: 250,
    range: '151-250',
  },
  {
    label: 'High',
    min: 251,
    max: 400,
    range: '251-400',
  },
]

const mockBucketResult = {
  priceBuckets: mockBuckets,
  minPrice: 100,
  maxPrice: 300,
}

// --------------------------------------------------
// Tests
// --------------------------------------------------

describe('usePriceFilter', () => {
  it('calls calculatePriceBuckets with hotels', () => {
    vi.mocked(calculatePriceBuckets).mockReturnValue(mockBucketResult)

    renderHook(() => usePriceFilter(mockHotels, [0, 150]))

    expect(calculatePriceBuckets).toHaveBeenCalledTimes(1)
    expect(calculatePriceBuckets).toHaveBeenCalledWith(mockHotels)
  })

  it('returns priceBuckets, minPrice, and maxPrice', () => {
    vi.mocked(calculatePriceBuckets).mockReturnValue(mockBucketResult)

    const { result } = renderHook(() =>
      usePriceFilter(mockHotels, [0, 150])
    )

    expect(result.current.priceBuckets).toEqual(mockBuckets)
    expect(result.current.minPrice).toBe(100)
    expect(result.current.maxPrice).toBe(300)
  })

  it('returns activeBucket when priceRange matches a bucket', () => {
    vi.mocked(calculatePriceBuckets).mockReturnValue(mockBucketResult)

    const { result } = renderHook(() =>
      usePriceFilter(mockHotels, [151, 250])
    )

    expect(result.current.activeBucket).toBe('Mid')
  })

  it('returns null activeBucket when no bucket matches', () => {
    vi.mocked(calculatePriceBuckets).mockReturnValue(mockBucketResult)

    const { result } = renderHook(() =>
      usePriceFilter(mockHotels, [999, 1999])
    )

    expect(result.current.activeBucket).toBeNull()
  })

  it('updates activeBucket when priceRange changes', () => {
    vi.mocked(calculatePriceBuckets).mockReturnValue(mockBucketResult)

    const { result, rerender } = renderHook(
      ({ range }) => usePriceFilter(mockHotels, range),
      {
        initialProps: { range: [0, 150] as [number, number] },
      }
    )

    expect(result.current.activeBucket).toBe('Low')

    rerender({ range: [251, 400] })

    expect(result.current.activeBucket).toBe('High')
  })
})

