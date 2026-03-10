import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'
import '@testing-library/jest-dom'

import { MapViewModal } from './MapViewModal'
import type { Hotel } from '@/hotel/types'

/* -------------------------------------------------------
   GLOBAL RUNTIME MOCK: google.maps (NO TYPE OVERRIDE)
------------------------------------------------------- */
beforeAll(() => {
  Object.defineProperty(window, 'google', {
    writable: true,
    value: {
      maps: {
        Size: class {
          constructor(
            public width: number,
            public height: number
          ) {}
          equals() {
            return false
          }
        },
        Point: class {
          constructor(
            public x: number,
            public y: number
          ) {}
          equals() {
            return false
          }
        },
        Animation: {
          DROP: 'DROP',
          BOUNCE: 'BOUNCE',
        },
      },
    },
  })
})

/* -------------------------------------------------------
   MOCK: framer-motion (DOM SAFE)
------------------------------------------------------- */
vi.mock('framer-motion', async () => {
  const React = await import('react')

  return {
    AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
    motion: {
      div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
        const {
          whileHover,
          initial,
          animate,
          exit,
          transition,
          ...rest
        } = props
        return <div {...rest}>{children}</div>
      },
    },
  }
})

/* -------------------------------------------------------
   MOCK: Google Maps React API
------------------------------------------------------- */
vi.mock('@react-google-maps/api', () => ({
  GoogleMap: ({ children }: React.PropsWithChildren) => (
    <div data-testid="google-map">{children}</div>
  ),
  Marker: ({ onClick }: { onClick?: () => void }) => (
    <button data-testid="marker" onClick={onClick}>
      Marker
    </button>
  ),
  InfoWindowF: ({ children }: React.PropsWithChildren) => (
    <div data-testid="info-window">{children}</div>
  ),
  useLoadScript: () => ({ isLoaded: true }),
}))

/* -------------------------------------------------------
   TEST DATA (STRICT Hotel TYPE)
------------------------------------------------------- */
const mockHotels: Hotel[] = [
  {
    HotelCode: 'H1',
    HotelName: 'Test Hotel One',
    HotelRating: 4,
    CityName: 'Goa',
    Address: 'Goa Beach',
    Image: 'image1.jpg',
    Map: '19.0760|72.8777',
    Rooms: [
      {
        BookingCode: 'R1',
        Name: 'Deluxe Room',
        TotalFare: 2500,
        TotalTax: 200,
      },
    ],
    RateConditions: {},
  },
  {
    HotelCode: 'H2',
    HotelName: 'Test Hotel Two',
    HotelRating: 5,
    CityName: 'Mumbai',
    Address: 'Mumbai',
    Image: 'image2.jpg',
    Map: '19.0800|72.8800',
    Rooms: [
      {
        BookingCode: 'R2',
        Name: 'Premium Room',
        TotalFare: 3200,
        TotalTax: 300,
      },
    ],
    RateConditions: {},
  },
]

/* -------------------------------------------------------
   TESTS
------------------------------------------------------- */
describe('MapViewModal', () => {
  const onClose = vi.fn()
  const onSelectHotel = vi.fn()
  const extractAttraction = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('does not render when closed', () => {
    render(
      <MapViewModal
        isOpen={false}
        onClose={onClose}
        hotels={mockHotels}
        extractAttraction={extractAttraction}
        onSelectHotel={onSelectHotel}
      />
    )

    expect(
      screen.queryByText('Explore Hotels on Map')
    ).not.toBeInTheDocument()
  })

  it('renders modal when open', () => {
    render(
      <MapViewModal
        isOpen
        onClose={onClose}
        hotels={mockHotels}
        extractAttraction={extractAttraction}
        onSelectHotel={onSelectHotel}
      />
    )

    expect(screen.getByText('Explore Hotels on Map')).toBeInTheDocument()
  })

  it('renders hotel cards', () => {
    render(
      <MapViewModal
        isOpen
        onClose={onClose}
        hotels={mockHotels}
        extractAttraction={extractAttraction}
        onSelectHotel={onSelectHotel}
      />
    )

    expect(screen.getAllByText('Test Hotel One').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Test Hotel Two').length).toBeGreaterThan(0)
  })

  it('filters hotels via search', () => {
    render(
      <MapViewModal
        isOpen
        onClose={onClose}
        hotels={mockHotels}
        extractAttraction={extractAttraction}
        onSelectHotel={onSelectHotel}
      />
    )

    fireEvent.change(
      screen.getByPlaceholderText(/search hotels/i),
      { target: { value: 'Two' } }
    )

    expect(screen.queryByText('Test Hotel One')).not.toBeInTheDocument()
    expect(screen.getByText('Test Hotel Two')).toBeInTheDocument()
  })

  it('opens info window when marker clicked', () => {
    render(
      <MapViewModal
        isOpen
        onClose={onClose}
        hotels={mockHotels}
        extractAttraction={extractAttraction}
        onSelectHotel={onSelectHotel}
      />
    )

    fireEvent.click(screen.getAllByTestId('marker')[0])

    const infoWindow = screen.getByTestId('info-window')
    expect(infoWindow).toBeInTheDocument()
    expect(infoWindow).toHaveTextContent('Test Hotel One')
  })

  it('calls onSelectHotel when clicking View Details', () => {
    render(
      <MapViewModal
        isOpen
        onClose={onClose}
        hotels={mockHotels}
        extractAttraction={extractAttraction}
        onSelectHotel={onSelectHotel}
      />
    )

    fireEvent.click(screen.getAllByTestId('marker')[0])
    fireEvent.click(
      screen.getByRole('button', { name: /view details/i })
    )

    expect(onSelectHotel).toHaveBeenCalledWith(mockHotels[0])
    expect(onClose).toHaveBeenCalled()
  })
})

