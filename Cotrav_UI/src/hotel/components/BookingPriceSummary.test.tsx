// src/hotel/components/BookingPriceSummary.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BookingPriceSummary } from './BookingPriceSummary'
import { bookingTypes} from '@/index'

// ----------------------
// Mock @/index
// ----------------------
vi.mock('@/index', () => ({
  ui: {
    Card: ({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
      <div {...props} data-testid="booking-price-card">{children}</div>
    ),
    CardHeader: ({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
      <div {...props}>{children}</div>
    ),
    CardContent: ({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
      <div {...props}>{children}</div>
    ),
  },
  icons: {
    Calendar: () => <svg data-testid="calendar-icon" />,
    CreditCard: () => <svg data-testid="creditcard-icon" />,
    IndianRupee: () => <svg data-testid="rupee-icon" />,
  },
}))

// ----------------------
// Test data
// ----------------------
const defaultProps: bookingTypes.BookingPriceSummaryProps = {
  basePrice: 1000,
  taxAmount: 200,
  totalAmount: 1200,
  nights: 2,
  showBreakdown: true,
  className: 'test-class',
}

// ----------------------
// Tests
// ----------------------
describe('BookingPriceSummary', () => {
  it('renders base price, tax, and total amount correctly', () => {
    render(<BookingPriceSummary {...defaultProps} />)

    // Nights text may be split, use function matcher
    expect(
      screen.getByText((content) => content.includes(`${defaultProps.nights} Night`))
    ).toBeInTheDocument()

    // Base price
    expect(screen.getByText(defaultProps.basePrice.toFixed(2))).toBeInTheDocument()

    // Tax amount
    expect(screen.getByText(defaultProps.taxAmount.toFixed(2))).toBeInTheDocument()

    // Total amount
    expect(screen.getByText(defaultProps.totalAmount.toFixed(2))).toBeInTheDocument()
  })

  it('renders single night correctly', () => {
    render(<BookingPriceSummary {...defaultProps} nights={1} />)
    expect(screen.getByText((content) => content.includes('1 Night'))).toBeInTheDocument()
  })

  it('hides breakdown if showBreakdown is false', () => {
    render(<BookingPriceSummary {...defaultProps} showBreakdown={false} />)

    // Base price and tax should not be visible
    expect(screen.queryByText(defaultProps.basePrice.toFixed(2))).not.toBeInTheDocument()
    expect(screen.queryByText(defaultProps.taxAmount.toFixed(2))).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<BookingPriceSummary {...defaultProps} />)
    const card = screen.getByTestId('booking-price-card')
    expect(card).toHaveClass('test-class')
  })

  it('renders rupee icons', () => {
    render(<BookingPriceSummary {...defaultProps} />)
    const rupeeIcons = screen.getAllByTestId('rupee-icon')
    expect(rupeeIcons.length).toBeGreaterThanOrEqual(3)
  })

  it('renders calendar and credit card icons', () => {
    render(<BookingPriceSummary {...defaultProps} />)
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument()
    expect(screen.getByTestId('creditcard-icon')).toBeInTheDocument()
  })
})

