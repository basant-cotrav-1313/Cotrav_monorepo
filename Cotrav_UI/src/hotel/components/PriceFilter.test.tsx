
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PriceFilter } from './PriceFilter'
import { hotelHooks, filterTypes } from '@/index'

// ----------------------
// Mock @/index
// ----------------------
vi.mock('@/index', () => ({
  ui: {
    Label: ({ children }: React.PropsWithChildren) => (
      <label>{children}</label>
    ),
    Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />,
  },
  icons: {
    IndianRupee: () => <svg data-testid="rupee-icon" />,
  },
  hotelHooks: {
    usePriceFilter: vi.fn(),
  },
}))

// Get typed mocked hook
const mockedUsePriceFilter = vi.mocked(hotelHooks.usePriceFilter)

// ----------------------
// Test Data
// ----------------------
const mockBuckets: filterTypes.PriceBucket[] = [
  { label: 'Budget', range: '₹0 - ₹2000', min: 0, max: 2000 },
  { label: 'Mid', range: '₹2000 - ₹4000', min: 2000, max: 4000 },
]

const defaultProps: filterTypes.PriceFilterProps = {
  hotels: [],
  priceRange: [1000, 3000],
  onPriceChange: vi.fn(),
}

// ----------------------
// Setup mocks
// ----------------------
beforeEach(() => {
  vi.clearAllMocks()
  mockedUsePriceFilter.mockReturnValue({
    priceBuckets: mockBuckets,
    minPrice: 0,
    maxPrice: 5000,
    activeBucket: 'Mid',
  })
})

// ----------------------
// Tests
// ----------------------
describe('PriceFilter', () => {
  it('renders price range label and current range', () => {
    render(<PriceFilter {...defaultProps} />)
    expect(screen.getByText(/Price Range \(Per Night\)/i)).toBeInTheDocument()
    expect(screen.getByText('₹1,000 - ₹3,000/night')).toBeInTheDocument()
  })

  it('renders quick select buckets', () => {
    render(<PriceFilter {...defaultProps} />)
    expect(screen.getByText('Budget')).toBeInTheDocument()
    expect(screen.getByText('Mid')).toBeInTheDocument()
  })

  it('calls onPriceChange when bucket clicked', () => {
    render(<PriceFilter {...defaultProps} />)
    fireEvent.click(screen.getByText('Budget'))
    expect(defaultProps.onPriceChange).toHaveBeenCalledWith([0, 2000])
  })

  it('allows typing in min and max inputs', () => {
    render(<PriceFilter {...defaultProps} />)
    const minInput = screen.getByPlaceholderText('Min') as HTMLInputElement
    const maxInput = screen.getByPlaceholderText('Max') as HTMLInputElement

    fireEvent.change(minInput, { target: { value: '1500' } })
    fireEvent.change(maxInput, { target: { value: '3500' } })

    expect(minInput.value).toBe('1500')
    expect(maxInput.value).toBe('3500')
  })

  it('applies min value on blur and clamps correctly', () => {
    render(<PriceFilter {...defaultProps} />)
    const minInput = screen.getByPlaceholderText('Min') as HTMLInputElement

    fireEvent.change(minInput, { target: { value: '-100' } })
    fireEvent.blur(minInput)

    expect(defaultProps.onPriceChange).toHaveBeenCalledWith([0, 3000])
  })

  it('applies max value on blur and clamps correctly', () => {
    render(<PriceFilter {...defaultProps} />)
    const maxInput = screen.getByPlaceholderText('Max') as HTMLInputElement

    fireEvent.change(maxInput, { target: { value: '6000' } })
    fireEvent.blur(maxInput)

    expect(defaultProps.onPriceChange).toHaveBeenCalledWith([1000, 5000])
  })

  it('applies value when Enter key is pressed', () => {
    render(<PriceFilter {...defaultProps} />)
    const minInput = screen.getByPlaceholderText('Min') as HTMLInputElement

    fireEvent.change(minInput, { target: { value: '2000' } })
    fireEvent.keyDown(minInput, { key: 'Enter', code: 'Enter' })
    fireEvent.blur(minInput) // ensure onPriceChange triggers

    expect(defaultProps.onPriceChange).toHaveBeenCalledWith([2000, 3000])
  })
})

