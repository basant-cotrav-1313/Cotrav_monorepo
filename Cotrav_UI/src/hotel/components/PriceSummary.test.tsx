// src/hotel/components/PriceSummary.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PriceSummary from './PriceSummary';

// ----------------------
// Mock @/index UI and icons
// ----------------------
vi.mock('@/index', () => ({
  ui: {
    Card: ({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
      <div {...props}>{children}</div>
    ),
    CardHeader: ({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
      <div {...props}>{children}</div>
    ),
    CardContent: ({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
      <div {...props}>{children}</div>
    ),
    TooltipProvider: (props: React.PropsWithChildren) => <div>{props.children}</div>,
Tooltip: (props: React.PropsWithChildren) => <div>{props.children}</div>,
TooltipTrigger: (props: React.PropsWithChildren) => <div>{props.children}</div>,
TooltipContent: (props: React.PropsWithChildren) => <div>{props.children}</div>,

  },
  icons: {
    Calendar: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="calendar-icon" {...props} />,
    IndianRupee: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="rupee-icon" {...props} />,
    Info: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="info-icon" {...props} />,
    CreditCard: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="creditcard-icon" {...props} />,
    CheckCircle2: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="checkcircle-icon" {...props} />,
  },
}));


// ----------------------
// Test data
// ----------------------
const mockRoom = {
  TotalFare: 1200,
  TotalTax: 200,
  DayRates: [
    [
      { BasePrice: 500, Date: '2026-01-01' },
      { BasePrice: 500, Date: '2026-01-02' },
    ],
  ],
  PriceBreakUp: [],
};

describe('PriceSummary', () => {
  it('renders nights correctly', () => {
    render(<PriceSummary room={mockRoom} nights={2} />);
    const nightsSpans = screen.getAllByText(/2 Nights/i);
    expect(nightsSpans.length).toBeGreaterThan(0);
  });

  it('calculates and renders base price correctly', () => {
    render(<PriceSummary room={mockRoom} nights={2} />);
    expect(screen.getByTestId('base-price')).toHaveTextContent('1,000.00');
  });

  it('renders total tax correctly', () => {
    render(<PriceSummary room={mockRoom} nights={2} />);
    expect(screen.getByTestId('total-tax')).toHaveTextContent('200.00');
  });

  it('renders total fare correctly', () => {
    render(<PriceSummary room={mockRoom} nights={2} />);
    expect(screen.getByTestId('total-fare')).toHaveTextContent('1,200.00');
  });

  it('renders calendar and credit card icons', () => {
    render(<PriceSummary room={mockRoom} nights={2} />);
    const calendarIcons = screen.getAllByTestId('calendar-icon');
    const creditIcons = screen.getAllByTestId('creditcard-icon');
    expect(calendarIcons.length).toBeGreaterThan(0);
    expect(creditIcons.length).toBeGreaterThan(0);
  });

  it('shows day rates tooltip on hover', () => {
    render(<PriceSummary room={mockRoom} nights={2} />);
    const infoButton = screen.getByRole('button');
    fireEvent.mouseEnter(infoButton);
    expect(screen.getByText(/Daily Rate Breakdown/i)).toBeInTheDocument();
    fireEvent.mouseLeave(infoButton);
  });
});

