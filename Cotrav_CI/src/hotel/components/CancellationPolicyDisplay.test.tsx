// src/hotel/components/CancellationPolicyDisplay.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CancellationPolicyDisplay from './CancellationPolicyDisplay'
import { CancellationPolicy } from '../types/hotel'
// import { formatCancelPolicies } from '../utils/hotel.utils'

// ----------------------
// Mock @/index icons
// ----------------------
vi.mock('@/index', () => ({
  icons: {
    Check: ({ className }: { className?: string }) => (
      <svg data-testid="check-icon" className={className} />
    ),
    X: ({ className }: { className?: string }) => (
      <svg data-testid="x-icon" className={className} />
    ),
  },
}))

// ----------------------
// Mock formatCancelPolicies for predictable output
// ----------------------
vi.mock('../utils/hotel.utils', () => ({
  formatCancelPolicies: (policies: CancellationPolicy[]) =>
    policies.map(
      (p) =>
        `${p.ChargeType === 'Percentage' ? p.CancellationCharge + '%' : '₹' + p.CancellationCharge} from ${p.FromDate} to ${p.ToDate}`
    ),
}))

// ----------------------
// Test data
// ----------------------
const mockPolicies: CancellationPolicy[] = [
  { FromDate: '2026-01-01', ToDate: '2026-01-02', ChargeType: 'Percentage', CancellationCharge: 50 },
  { FromDate: '2026-01-03', ToDate: '2026-01-04', ChargeType: 'Fixed', CancellationCharge: 2000 },
]

const nonCancellablePolicies: CancellationPolicy[] = []

// ----------------------
// Tests
// ----------------------
describe('CancellationPolicyDisplay', () => {
  it('renders formatted policies correctly', () => {
    render(<CancellationPolicyDisplay policies={mockPolicies} />)

    mockPolicies.forEach((policy) => {
      const formatted = `${policy.ChargeType === 'Percentage' ? policy.CancellationCharge + '%' : '₹' + policy.CancellationCharge} from ${policy.FromDate} to ${policy.ToDate}`
      expect(screen.getByText(formatted)).toBeInTheDocument()
    })

    // Check if check icons are rendered
    expect(screen.getAllByTestId('check-icon').length).toBe(mockPolicies.length)
  })

  it('renders "Non Cancellable" message when no policies', () => {
    render(<CancellationPolicyDisplay policies={nonCancellablePolicies} />)

    expect(screen.getByText(/Non Cancellable/i)).toBeInTheDocument()
    expect(screen.getByTestId('x-icon')).toBeInTheDocument()
  })

 it('renders green text for policies', () => {
  render(<CancellationPolicyDisplay policies={mockPolicies} />)
  
  const policySpan = screen.getByText(/50% from 2026-01-01 to 2026-01-02/i)
  expect(policySpan.parentElement?.parentElement).toHaveClass('text-green-700')
})

  it('renders red text for non-cancellable', () => {
    render(<CancellationPolicyDisplay policies={nonCancellablePolicies} />)
    const text = screen.getByText(/Non Cancellable/i)
    expect(text).toHaveClass('text-red-600')
  })
})

