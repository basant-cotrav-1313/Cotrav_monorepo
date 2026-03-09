import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useRoomPriceModal } from './useRoomPriceModal'
import type { hotelTypes} from '@/index'

// -------------------- TEST DATA --------------------
const mockRooms: hotelTypes.SelectedRoom[] = [
  {
    BookingCode: 'R1',
    HotelCode: 'H1',
    HotelName: 'Hotel Alpha',
    CityName: 'Bangalore',
    Address: 'MG Road',
    TotalFare: 1000,
    TotalTax: 100,
    MealType: 'Breakfast',
    Name: 'Deluxe Room',
    CancelPolicies: [],
    Inclusion: '',
  },
  {
    BookingCode: 'R2',
    HotelCode: 'H1',
    HotelName: 'Hotel Alpha',
    CityName: 'Bangalore',
    Address: 'MG Road',
    TotalFare: 2000,
    TotalTax: 200,
    MealType: 'Dinner',
    Name: 'Premium Room',
    CancelPolicies: [],
    Inclusion: '',
  },
]

// -------------------- TESTS --------------------
describe('useRoomPriceModal', () => {
  it('should initialize state correctly', () => {
    const onClose = vi.fn()
    const { result } = renderHook(() => useRoomPriceModal(mockRooms, onClose))

    expect(result.current.expandedRows).toEqual({})
    expect(result.current.expandedPolicies).toEqual({})
    expect(result.current.isClosing).toBe(false)
    expect(result.current.selectedRoomsTotal).toBe(3000)
  })

  it('should toggle row expansion', () => {
    const { result } = renderHook(() => useRoomPriceModal(mockRooms, vi.fn()))

    act(() => result.current.toggleRowExpansion('R1'))
    expect(result.current.expandedRows['R1']).toBe(true)

    act(() => result.current.toggleRowExpansion('R1'))
    expect(result.current.expandedRows['R1']).toBe(false)
  })

  it('should toggle policy expansion', () => {
    const { result } = renderHook(() => useRoomPriceModal(mockRooms, vi.fn()))

    act(() => result.current.togglePolicyExpansion('R2'))
    expect(result.current.expandedPolicies['R2']).toBe(true)

    act(() => result.current.togglePolicyExpansion('R2'))
    expect(result.current.expandedPolicies['R2']).toBe(false)
  })

  it('should calculate selectedRoomsTotal correctly', () => {
    const { result } = renderHook(() => useRoomPriceModal(mockRooms, vi.fn()))
    expect(result.current.selectedRoomsTotal).toBe(3000)
  })

  it('should handle close correctly', () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    const { result } = renderHook(() => useRoomPriceModal(mockRooms, onClose))

    act(() => result.current.handleClose())

    // immediately after call
    expect(result.current.isClosing).toBe(true)
    expect(onClose).not.toHaveBeenCalled()

    // advance timers
    act(() => {
      vi.advanceTimersByTime(150)
    })

    expect(result.current.isClosing).toBe(false)
    expect(onClose).toHaveBeenCalled()

    vi.useRealTimers()
  })
})

