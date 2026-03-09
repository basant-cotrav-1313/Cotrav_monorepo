import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SharePanelModal } from './SharePanelModal';

import type { SelectedRoom } from '@/hotel/types'; // import your interface

/* ------------------------------------------------------------------ */
/* mocks */
/* ------------------------------------------------------------------ */

vi.mock('@/index', () => ({
  icons: {
    X: () => <span data-testid="icon-x" />,
    Share2: () => <span data-testid="icon-share" />,
  },
  ui: {
    Button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props}>{children}</button>
    ),
  },
}));

/* ------------------------------------------------------------------ */
/* helpers */
/* ------------------------------------------------------------------ */

const mockRooms: SelectedRoom[] = [
  {
    BookingCode: 'B1',
    HotelCode: 'H1',
    HotelName: 'Hotel One',
    CityName: 'City A',
    Address: 'Address 1',
    Description: 'Nice hotel',
    Name: 'Room 101',
    TotalFare: 1234.56,
    TotalTax: 123.45,   
  },
  {
    BookingCode: 'B2',
    HotelCode: 'H1',
    HotelName: 'Hotel One',
    CityName: 'City A',
    Address: 'Address 1',
    Description: 'Nice hotel',
    Name: 'Room 102',
    TotalFare: 2345.67,
    TotalTax: 234.56,   
  },
  {
    BookingCode: 'B3',
    HotelCode: 'H2',
    HotelName: 'Hotel Two',
    CityName: 'City B',
    Address: 'Address 2',
    Description: 'Luxury hotel',
    Name: 'Room 201',
    TotalFare: 3456.78,
    TotalTax: 345.67,
  },
];


const setup = (overrideProps = {}) => {
  const props = {
    selectedRooms: mockRooms,
    onClose: vi.fn(),
    onShare: vi.fn(),
    onRemoveRoom: vi.fn(),
    extractAttraction: vi.fn((desc) => desc),
    ...overrideProps,
  };

  render(<SharePanelModal {...props} />);
  return props;
};

/* ------------------------------------------------------------------ */
/* tests */
/* ------------------------------------------------------------------ */

describe('SharePanelModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with grouped hotels and rooms', () => {
    setup();

    // check hotel groups
    expect(screen.getByText('Hotel One')).toBeInTheDocument();
    expect(screen.getByText('Hotel Two')).toBeInTheDocument();

    // check rooms
    expect(screen.getByText('Room 101')).toBeInTheDocument();
    expect(screen.getByText('Room 102')).toBeInTheDocument();
    expect(screen.getByText('Room 201')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const props = setup();

    const closeBtn = screen.getAllByTestId('icon-x')[0].closest('button')!;
    fireEvent.click(closeBtn);

    expect(props.onClose).toHaveBeenCalled();
  });

  it('calls onRemoveRoom when delete button clicked', () => {
    const props = setup();

    const deleteButtons = screen.getAllByTestId('icon-x');
    const deleteBtnRoom101 = deleteButtons[1].closest('button')!; // first X is modal close

    fireEvent.click(deleteBtnRoom101);

    expect(props.onRemoveRoom).toHaveBeenCalledWith('B1');
  });

  it('calls onShare when share button clicked', () => {
    const props = setup();

    const shareBtn = screen.getByText(/Share hotel options/i).closest('button')!;
    fireEvent.click(shareBtn);

    expect(props.onShare).toHaveBeenCalled();
  });

  it('renders nothing when selectedRooms is empty', () => {
    setup({ selectedRooms: [] });

    // container should not exist
    expect(screen.queryByText('Selected Hotels / Rooms')).not.toBeInTheDocument();
  });
});

