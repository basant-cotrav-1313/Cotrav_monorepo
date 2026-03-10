import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import RoomCard from './RoomCard'
import { hotelTypes, hotelDetailsTypes } from '@/index'

// ----------------------
// Mock Data
// ----------------------
const mockRoom: Partial<hotelTypes.Room> = {
  Name: ['Deluxe Room'],
  MealType: 'Breakfast',
  TotalFare: 5000,
  TotalTax: 500,
  Inclusion: 'Free Wi-Fi',
}



const mockHotel: Partial<hotelDetailsTypes.RoomCardProps['hotel']> = {
  HotelFacilities: [
    'Pool',
    'Gym',
    'Spa',
    'Parking',
    'Restaurant',
    'Bar',
    'Wi-Fi',
  ],
}


const onSelectRoom = vi.fn()
const onShowDetails = vi.fn()

// ----------------------
// Helper
// ----------------------
const renderRoomCard = () =>
  render(
  <RoomCard
    room={mockRoom as hotelTypes.Room}
    hotel={mockHotel as hotelDetailsTypes.RoomCardProps['hotel']}
    index={0}
    onSelectRoom={onSelectRoom}
    onShowDetails={onShowDetails}
  />
)

// ----------------------
// Tests
// ----------------------
describe('RoomCard', () => {
  it('renders room name and meal type', () => {
    renderRoomCard()

    expect(screen.getAllByText(/Deluxe Room/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Meal:/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Breakfast/i).length).toBeGreaterThan(0)
  })

  it('renders hotel facilities (up to 6)', () => {
    renderRoomCard()

    expect(screen.getAllByText('Pool').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Gym').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Spa').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Parking').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Restaurant').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Bar').length).toBeGreaterThan(0)

    // 7th facility should NOT render
    expect(screen.queryByText('Wi-Fi')).not.toBeInTheDocument()
  })

  it('renders inclusion if present', () => {
    renderRoomCard()
    expect(screen.getAllByText(/Free Wi-Fi/i).length).toBeGreaterThan(0)
  })

  it('renders total price and tax', () => {
    renderRoomCard()

    expect(screen.getAllByText('₹').length).toBeGreaterThan(0)
    expect(screen.getAllByText('5,000').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/₹500/i).length).toBeGreaterThan(0)
  })

  it('calls onShowDetails when "View Full Details" clicked', () => {
    renderRoomCard()

    fireEvent.click(screen.getAllByText(/View Full Details/i)[0])
    expect(onShowDetails).toHaveBeenCalled()
  })

  it('calls onSelectRoom when select button clicked', () => {
    renderRoomCard()

    fireEvent.click(screen.getAllByText(/SELECT/i)[0])
    expect(onSelectRoom).toHaveBeenCalledWith(mockRoom)
  })
})

