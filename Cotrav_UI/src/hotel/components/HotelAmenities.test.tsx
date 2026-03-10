import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import HotelAmenities from './HotelAmenities'

// --------------------------------------------------
// Mock icons from @/index (HOIST SAFE)
// --------------------------------------------------

vi.mock('@/index', () => {
  type IconProps = React.SVGProps<SVGSVGElement>

  const createIconMock =
    (testId: string): React.FC<IconProps> =>
    (props) =>
      <svg data-testid={testId} {...props} />

  return {
    icons: {
      Utensils: createIconMock('icon-utensils'),
      Coffee: createIconMock('icon-coffee'),
      Wifi: createIconMock('icon-wifi'),
      Car: createIconMock('icon-car'),
      Dumbbell: createIconMock('icon-dumbbell'),
      Waves: createIconMock('icon-waves'),
      Sparkles: createIconMock('icon-sparkles'),
      Presentation: createIconMock('icon-presentation'),
      GlassWater: createIconMock('icon-glasswater'),
      Users: createIconMock('icon-users'),
      Building2: createIconMock('icon-building'),
      ChevronRight: createIconMock('icon-chevron-right'),
    },
  }
})

// --------------------------------------------------
// Test setup
// --------------------------------------------------

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

const onShowMoreMock = vi.fn()

// --------------------------------------------------
// Tests
// --------------------------------------------------

describe('HotelAmenities', () => {
  it('returns null when facilities is empty', () => {
    const { container } = render(
      <HotelAmenities facilities={[]} onShowMore={onShowMoreMock} />
    )

    expect(container.firstChild).toBeNull()
  })

 it('renders simple list with checkmarks when facilities ≤ 4', () => {
  render(
    <HotelAmenities
      facilities={['Free Wifi', 'Parking', 'Gym']}
      onShowMore={onShowMoreMock}
    />
  )

  const checkmarks = screen.getAllByText('✓')
  expect(checkmarks).toHaveLength(3)

  expect(screen.getByText('free wifi')).toBeInTheDocument()
  expect(screen.getByText('parking')).toBeInTheDocument()
  expect(screen.getByText('gym')).toBeInTheDocument()
})


  it('deduplicates facilities (trim + lowercase)', () => {
    render(
      <HotelAmenities
        facilities={[
          ' WiFi ',
          'wifi',
          'WIFI',
          ' Parking ',
          'parking',
        ]}
        onShowMore={onShowMoreMock}
      />
    )

    expect(screen.getByText('wifi')).toBeInTheDocument()
    expect(screen.getByText('parking')).toBeInTheDocument()
  })

  it('renders predefined amenities with icons when facilities > 4', () => {
    render(
      <HotelAmenities
        facilities={[
          'Free Wifi',
          'Parking',
          'Restaurant',
          'Gym',
          'Swimming Pool',
          'Spa',
          'Business Center',
        ]}
        onShowMore={onShowMoreMock}
      />
    )

    expect(screen.getByTestId('icon-wifi')).toBeInTheDocument()
    expect(screen.getByTestId('icon-car')).toBeInTheDocument()
    expect(screen.getByTestId('icon-utensils')).toBeInTheDocument()
    expect(screen.getByTestId('icon-dumbbell')).toBeInTheDocument()
    expect(screen.getByTestId('icon-waves')).toBeInTheDocument()
    expect(screen.getByTestId('icon-sparkles')).toBeInTheDocument()
  })

  it('limits displayed amenities and shows "+more" button', () => {
    render(
      <HotelAmenities
        facilities={[
          'Wifi',
          'Parking',
          'Restaurant',
          'Gym',
          'Pool',
          'Spa',
          'Business',
          'Conference',
        ]}
        onShowMore={onShowMoreMock}
      />
    )

    expect(
      screen.getByRole('button', { name: /\+\d+ more/i })
    ).toBeInTheDocument()
  })

  it('calls onShowMore when "+more" button is clicked', () => {
    render(
      <HotelAmenities
        facilities={[
          'Wifi',
          'Parking',
          'Restaurant',
          'Gym',
          'Pool',
          'Spa',
          'Business',
        ]}
        onShowMore={onShowMoreMock}
      />
    )

    fireEvent.click(screen.getByRole('button'))

    expect(onShowMoreMock).toHaveBeenCalledTimes(1)
  })

  it('renders ChevronRight icon inside "+more" button', () => {
    render(
      <HotelAmenities
        facilities={[
          'Wifi',
          'Parking',
          'Restaurant',
          'Gym',
          'Pool',
          'Spa',
          'Business',
        ]}
        onShowMore={onShowMoreMock}
      />
    )

    expect(
      screen.getByTestId('icon-chevron-right')
    ).toBeInTheDocument()
  })
})

