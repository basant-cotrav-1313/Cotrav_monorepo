
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AmenitiesModal } from './AmenitiesModal';

/* ------------------------------------------------------------------ */
/* Mock framer-motion (important for unit tests) */
/* ------------------------------------------------------------------ */
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

/* ------------------------------------------------------------------ */
/* Mock @/index (icons + amenitiesUtils) */
/* ------------------------------------------------------------------ */
vi.mock('@/index', () => ({
  icons: {
    Info: ({ size: _size, className }: { size?: number; className?: string }) => (
      <svg data-testid="info-icon" className={className} />
    ),
    CheckCircle2: ({ size: _size, className }: { size?: number; className?: string }) => (
      <svg data-testid="check-icon" className={className} />
    ),
    X: ({ size: _size, className }: { size?: number; className?: string }) => (
      <svg data-testid="close-icon" className={className} />
    ),
    Search: ({ size: _size, className }: { size?: number; className?: string }) => (
      <svg data-testid="search-icon" className={className} />
    ),
  },
  amenitiesUtils: {
    categorizeAmenities: (facilities: string[]) => [
      [
        'General',
        {
          icon: null,
          color: 'from-blue-500 to-indigo-500',
          items: facilities,
        },
      ],
    ],
  },
}));

/* ------------------------------------------------------------------ */
/* Test data */
/* ------------------------------------------------------------------ */
const facilities = ['Free WiFi', 'Swimming Pool', 'Parking'];

describe('AmenitiesModal', () => {
  it('renders modal when open', () => {
    render(
      <AmenitiesModal
        isOpen
        onClose={vi.fn()}
        facilities={facilities}
        hotelName="Demo Hotel"
      />
    );

    expect(
      screen.getByText(/Hotel Amenities & Facilities/i)
    ).toBeInTheDocument();

    expect(screen.getByText('Demo Hotel')).toBeInTheDocument();
  });

  it('does not render modal when closed', () => {
    render(
      <AmenitiesModal
        isOpen={false}
        onClose={vi.fn()}
        facilities={facilities}
      />
    );

    expect(
      screen.queryByText(/Hotel Amenities & Facilities/i)
    ).not.toBeInTheDocument();
  });

  it('renders amenities list', () => {
    render(
      <AmenitiesModal
        isOpen
        onClose={vi.fn()}
        facilities={facilities}
      />
    );

    expect(screen.getByText('Free WiFi')).toBeInTheDocument();
    expect(screen.getByText('Swimming Pool')).toBeInTheDocument();
    expect(screen.getByText('Parking')).toBeInTheDocument();
  });

  it('filters amenities by search', () => {
    render(
      <AmenitiesModal
        isOpen
        onClose={vi.fn()}
        facilities={facilities}
      />
    );

    const input = screen.getByPlaceholderText(/Search amenities/i);
    fireEvent.change(input, { target: { value: 'wifi' } });

    expect(screen.getByText('Free WiFi')).toBeInTheDocument();
    expect(screen.queryByText('Parking')).not.toBeInTheDocument();
  });

  it('shows empty state when no amenities match search', () => {
    render(
      <AmenitiesModal
        isOpen
        onClose={vi.fn()}
        facilities={facilities}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/Search amenities/i), {
      target: { value: 'spa' },
    });

    expect(
      screen.getByText(/No amenities found matching/i)
    ).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();

    render(
      <AmenitiesModal
        isOpen
        onClose={onClose}
        facilities={facilities}
      />
    );

    // backdrop = first motion.div
    fireEvent.click(screen.getByText(/Hotel Amenities & Facilities/i).closest('.fixed')!);

    expect(onClose).toHaveBeenCalled();
  });

  it('renders check icons for amenities', () => {
    render(
      <AmenitiesModal
        isOpen
        onClose={vi.fn()}
        facilities={facilities}
      />
    );

    expect(screen.getAllByTestId('check-icon').length).toBeGreaterThan(0);
  });
});

