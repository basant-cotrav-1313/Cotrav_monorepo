
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PriceBreakdown from './PriceBreakdown';
import type { Room } from '../types/hotel';

// ----------------------
// Mock Room Data
// ----------------------
const mockRoom: Room = {
  BookingCode: 'R001',
  Name: 'Demo Room',
  TotalFare: 4000,
  TotalTax: 500,
  DayRates: [
    [
      { BasePrice: 1000 },
      { BasePrice: 1000 },
      { BasePrice: 1000 },
      { BasePrice: 1000 },
    ],
    [
      { BasePrice: 1200 },
      { BasePrice: 1300 },
    ],
  ],
  CancelPolicies: [],
};

// ----------------------
// Tests
// ----------------------
describe('PriceBreakdown', () => {
  it('renders nothing if show is false', () => {
    const { container } = render(<PriceBreakdown room={mockRoom} show={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing if room.DayRates is undefined', () => {
    const { container } = render(
      <PriceBreakdown room={{ ...mockRoom, DayRates: undefined }} show={true} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders all day rates correctly', () => {
    render(<PriceBreakdown room={mockRoom} show={true} />);

    // Room 1
    expect(screen.getByText(/Room 1 price × 4 Days/i)).toBeInTheDocument();
    expect(screen.getByText(/₹ 4000.00/i)).toBeInTheDocument();

    // Room 2
    expect(screen.getByText(/Room 2 price × 2 Days/i)).toBeInTheDocument();
    expect(screen.getByText(/₹ 2500.00/i)).toBeInTheDocument();
  });

  it('renders correct number of room price rows', () => {
    render(<PriceBreakdown room={mockRoom} show={true} />);
    const rows = screen.getAllByText(/Room \d+ price × \d+ Days/i);
    expect(rows.length).toBe(mockRoom.DayRates!.length);
  });
});

