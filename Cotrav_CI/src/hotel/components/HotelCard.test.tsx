
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { HotelCard } from './HotelCard'
import type { Hotel, Room } from '../types/hotel'

// ----------------------
// Mock '@/index' module
// ----------------------
vi.mock('@/index', () => ({
  hotelTypes: { HOTEL: 'HOTEL' },
  constants: { facilityIcons: ['wifi', 'car', 'utensils', 'coffee', 'dumbbell'] },
  hotelUtils: {
    getLowestFareRoom: vi.fn((rooms) => rooms[0]),
    getNumberOfNights: vi.fn(() => 4),
    getRoomPricing: vi.fn(() => ({
      totalFare: 4000,
      totalTax: 500,
      totalPrice: 4500,
      perNightFare: 1000,
    })),
    // getAvailableFacilities: vi.fn((facilities) =>
    //   facilities.slice(0, 4).map((f) => ({ label: f, icon: f }))
    // ),
    getAvailableFacilities: vi.fn((facilities: string[]) =>
  facilities.slice(0, 4).map((f: string) => ({
    label: f,
    icon: f,
  }))
),

    getCancellationStatus: vi.fn((room) => {
      if (!room?.CancelPolicies || room.CancelPolicies.length === 0) {
        return { color: 'red', icon: 'X', message: 'Non-Refundable', details: [] }
      }
      return { color: 'green', icon: 'Check', message: 'Free cancellation anytime', details: [] }
    }),
    formatCancellationDate: vi.fn(() => '01 Jan 2025'),
  },
 ui: {
  Card: (props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{props.children}</div>
  ),
  CardContent: (props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{props.children}</div>
  ),
  Badge: (props: React.PropsWithChildren<React.HTMLAttributes<HTMLSpanElement>>) => (
    <span {...props}>{props.children}</span>
  ),
  Button: (props: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => (
    <button {...props}>{props.children}</button>
  ),
  Separator: (props: React.HTMLAttributes<HTMLHRElement>) => <hr {...props} />,
},
  icons: {
    Star: () => <svg role="img" className="lucide-star" />,
    MapPin: () => <svg role="img" />,
    Wifi: () => <svg role="img" className="wifi" />,
    Car: () => <svg role="img" className="car" />,
    Utensils: () => <svg role="img" className="utensils" />,
    Coffee: () => <svg role="img" className="coffee" />,
    Dumbbell: () => <svg role="img" className="dumbbell" />,
    Building2: () => <svg role="img" />,
    Check: () => <svg role="img" />,
    Info: () => <svg role="img" />,
    ChevronLeft: () => <svg role="img" />,
    ChevronRight: () => <svg role="img" />,
    ImageIcon: () => <svg role="img" />,
    X: () => <svg role="img" />,
    AlertCircle: () => <svg role="img" />,
  },
}))

// ----------------------
// Mock props
// ----------------------
const mockRoom: Room = {
  BookingCode: 'R001',
  Name: 'Demo Room',
  TotalFare: 4000,
  TotalTax: 500,
  DayRates: [[{ BasePrice: 1000 }, { BasePrice: 1000 }, { BasePrice: 1000 }, { BasePrice: 1000 }]],
  CancelPolicies: [{ FromDate: '', ToDate: '', ChargeType: 'Fixed', CancellationCharge: 0 }],
}

const mockHotel: Hotel = {
  HotelCode: 'H001',
  HotelName: 'Demo Hotel',
  CityName: 'Demo City',
  HotelRating: 4,
  Rooms: [mockRoom],
  Images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/200'],
  HotelFacilities: ['wifi', 'parking', 'restaurant', 'gym', 'conference'],
  Address: 'Demo Address',
  RateConditions: {},
}

const renderHotelCard = (props = {}) =>
  render(
    <HotelCard
      hotel={mockHotel}
      booknow="1"
      agent_portal="0"
      onViewPrice={vi.fn()}
      onBookNow={vi.fn()}
      onViewImages={vi.fn()}
      extractAttraction={(desc) => desc}
      // formatCancelPolicies={(policies) => policies.map((p) => 'free')}
      formatCancelPolicies={(policies) =>
  policies.map(() => 'free')
}

      {...props}
    />
  )

// ----------------------
// Tests
// ----------------------
describe('HotelCard', () => {
  it('renders hotel name, city, stars, and price', () => {
    renderHotelCard()
    expect(screen.getByText('Demo Hotel')).toBeInTheDocument()
    expect(screen.getByText('Demo City')).toBeInTheDocument()

    const stars = screen.getAllByRole('img', { hidden: true }).filter((el) =>
      el.getAttribute('class')?.includes('lucide-star')
    )
    expect(stars.length).toBeGreaterThanOrEqual(4)
    expect(screen.getByText(/₹1,000/)).toBeInTheDocument()
    expect(screen.getByText(/Total \(4 nights\):/)).toBeInTheDocument()
  })

  it('renders facilities (max 4) correctly', () => {
    renderHotelCard()
    const facilities = screen.getAllByRole('img', { hidden: true }).filter((el) =>
      ['wifi', 'car', 'utensils', 'coffee', 'dumbbell'].some((cls) =>
        (el.getAttribute('class') || '').toLowerCase().includes(cls)
      )
    )
    expect(facilities.length).toBeLessThanOrEqual(4)
  })

  it('carousel next/prev buttons change image', () => {
    renderHotelCard()
    const buttons = screen.getAllByRole('button')
    const prevButton = buttons[0]
    const nextButton = buttons[1]

    const mainImage = screen.getByRole('img', { name: /Demo Hotel/i })
    expect(mainImage).toHaveAttribute('src', 'https://via.placeholder.com/150')

    fireEvent.click(nextButton)
    expect(mainImage).toHaveAttribute('src', 'https://via.placeholder.com/200')

    fireEvent.click(prevButton)
    expect(mainImage).toHaveAttribute('src', 'https://via.placeholder.com/150')
  })

  it('calls onBookNow when Book Now button clicked', () => {
    const onBookNow = vi.fn()
    renderHotelCard({ onBookNow })
    fireEvent.click(screen.getByText('Book Now'))
    expect(onBookNow).toHaveBeenCalled()
  })

  it('calls onViewImages when View All Photos clicked', () => {
    const onViewImages = vi.fn()
    renderHotelCard({ onViewImages })
    fireEvent.click(screen.getByText(/View All 2 Photos/i))
    expect(onViewImages).toHaveBeenCalled()
  })

  it('shows Free Cancellation badge when policies exist', () => {
    renderHotelCard()
    expect(screen.getByText(/Free cancellation anytime/i)).toBeInTheDocument()
  })

  it('shows Non-Refundable badge when no cancellation policies', () => {
    renderHotelCard({ hotel: { ...mockHotel, Rooms: [{ ...mockRoom, CancelPolicies: [] }] } })
    expect(screen.getByText(/Non-Refundable/i)).toBeInTheDocument()
  })

  it('handles hotel with no images gracefully', () => {
  renderHotelCard({ hotel: { ...mockHotel, Images: [] } })
  const placeholder = screen.getByTestId('placeholder-image')
  expect(placeholder).toBeInTheDocument()
})


  it('handles hotel with no facilities', () => {
    renderHotelCard({ hotel: { ...mockHotel, HotelFacilities: [] } })
    const facilities = screen.queryAllByRole('img', { hidden: true }).filter((el) =>
      ['wifi', 'car', 'utensils', 'coffee', 'dumbbell'].some((cls) =>
        (el.getAttribute('class') || '').toLowerCase().includes(cls)
      )
    )
    expect(facilities.length).toBe(0)
  })

  it('renders multiple rooms correctly', () => {
    const multiRooms: Room[] = [
      { ...mockRoom, BookingCode: 'R001', TotalFare: 4000 },
      { ...mockRoom, BookingCode: 'R002', TotalFare: 5000 },
    ]
    renderHotelCard({ hotel: { ...mockHotel, Rooms: multiRooms } })
    expect(screen.getByText(/Total \(4 nights\):/)).toBeInTheDocument()
  })
})

