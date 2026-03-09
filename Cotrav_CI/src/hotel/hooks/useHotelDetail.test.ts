import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useHotelDetail } from './useHotelDetail'
import type { Hotel, Room } from '@/hotel/types/hotel'

// -------------------- MOCK NAVIGATION --------------------
const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

// -------------------- TEST DATA --------------------
const mockHotel: Hotel = {
  HotelCode: '1',
  HotelName: 'Hotel Alpha',
  HotelRating: 4,
  CityName: 'Bangalore',
  Address: 'MG Road',
  HotelFacilities: ['Wifi', 'Pool'],
  Rooms: [
    {
      BookingCode: 'R1',
      Name: ['Deluxe Room'],
      MealType: 'Breakfast',
      TotalFare: 3000,
      TotalTax: 300,
      CancelPolicies: [],
    },
    {
      BookingCode: 'R2',
      Name: ['Premium Room'],
      MealType: 'Dinner',
      TotalFare: 5000,
      TotalTax: 500,
      CancelPolicies: [],
    },
  ],
  RateConditions: [],
  Map: '12.9716|77.5946',
}

const taxivaxiData = {
  hotel_code: '1',
  room_type_name: 'Deluxe',
  meal_plan: 'Breakfast',
}

// -------------------- TESTS --------------------
describe('useHotelDetail', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('should initialize state correctly', () => {
    const { result } = renderHook(() =>
      useHotelDetail({ hotel: mockHotel })
    )

    expect(result.current.showHeader).toBe(false)
    expect(result.current.activeSection).toBe('overview')
    expect(result.current.filteredRooms).toEqual([])
    expect(result.current.hotelRooms).toHaveLength(2)
  })

  it('should filter rooms correctly based on taxivaxi data', () => {
    const { result } = renderHook(() =>
      useHotelDetail({
        hotel: mockHotel,
        taxivaxi: taxivaxiData,
        fromBookNow: false,
      })
    )

    expect(result.current.filteredRooms).toHaveLength(1)
    expect(result.current.filteredRooms[0].BookingCode).toBe('R1')
    expect(result.current.displayRoom?.BookingCode).toBe('R1')
  })

  it('should use first room if fromBookNow is true', () => {
    const { result } = renderHook(() =>
      useHotelDetail({ hotel: mockHotel, fromBookNow: true })
    )

    expect(result.current.displayRoom?.BookingCode).toBe('R1')
  })

  it('should scroll to section', () => {
  const { result } = renderHook(() =>
    useHotelDetail({ hotel: mockHotel })
  )

  const scrollSpy = vi
    .spyOn(window, 'scrollTo')
    .mockImplementation(() => {})

  // attach real DOM element
  const sectionDiv = document.createElement('div')
  Object.defineProperty(sectionDiv, 'offsetTop', {
    value: 200,
    writable: false,
  })

  result.current.roomsRef.current = sectionDiv

  act(() => {
    result.current.scrollToSection('rooms')
  })

  expect(scrollSpy).toHaveBeenCalled()

  scrollSpy.mockRestore()
})


  it('should scroll to map', () => {
    const { result } = renderHook(() =>
      useHotelDetail({ hotel: mockHotel })
    )

    // ✅ real DOM element (TS-safe)
    const div = document.createElement('div')
    const scrollIntoViewSpy = vi.fn()
    div.scrollIntoView = scrollIntoViewSpy

    result.current.mapSectionRef.current = div

    act(() => {
      result.current.scrollToMap()
    })

    expect(scrollIntoViewSpy).toHaveBeenCalled()
  })

  it('should navigate to HotelBooking on select room', () => {
    const { result } = renderHook(() =>
      useHotelDetail({ hotel: mockHotel })
    )

    const room: Room = mockHotel.Rooms![0]

    act(() => {
      result.current.handleSelectRoom(room)
    })

    expect(mockNavigate).toHaveBeenCalledWith(
      '/HotelBooking',
      expect.any(Object)
    )
  })

  it('should navigate to home and search', () => {
    const { result } = renderHook(() =>
      useHotelDetail({ hotel: mockHotel })
    )

    act(() => {
      result.current.handleNavigateHome()
    })
    expect(mockNavigate).toHaveBeenCalledWith('/')

    act(() => {
      result.current.handleNavigateSearch()
    })
    expect(mockNavigate).toHaveBeenCalledWith('/SearchHotel')
  })

  it('should get map center correctly', () => {
    const { result } = renderHook(() =>
      useHotelDetail({ hotel: mockHotel })
    )

    expect(result.current.getMapCenter()).toEqual({
      lat: 12.9716,
      lng: 77.5946,
    })
  })
})

