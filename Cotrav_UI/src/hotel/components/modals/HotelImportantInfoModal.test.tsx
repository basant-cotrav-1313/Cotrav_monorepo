import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HotelImportantInfoModal } from './HotelImportantInfoModal';

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
/* Mock lucide-react icons */
/* ------------------------------------------------------------------ */
vi.mock('lucide-react', () => ({
  X: ({ size: _size, className }: { size?: number; className?: string }) => (
    <svg data-testid="x-icon" className={className} />
  ),
  AlertCircle: ({ size: _size, className }: { size?: number; className?: string }) => (
    <svg data-testid="alertcircle-icon" className={className} />
  ),
  Info: ({ size: _size, className }: { size?: number; className?: string }) => (
    <svg data-testid="info-icon" className={className} />
  ),
}));

/* ------------------------------------------------------------------ */
/* Test data */
/* ------------------------------------------------------------------ */
const rateConditions = [
  'No smoking in rooms',
  '<b>Check-in</b> after 2 PM',
  'Pets <i>not allowed</i>',
];

describe('HotelImportantInfoModal', () => {
  it('renders modal when open', () => {
    render(
      <HotelImportantInfoModal
        isOpen
        onClose={vi.fn()}
        rateConditions={rateConditions}
      />
    );

    expect(screen.getByText(/Important Information/i)).toBeInTheDocument();
    expect(screen.getByText(`${rateConditions.length} conditions to review`)).toBeInTheDocument();
  });

  it('does not render modal when closed', () => {
    render(
      <HotelImportantInfoModal
        isOpen={false}
        onClose={vi.fn()}
        rateConditions={rateConditions}
      />
    );

    expect(screen.queryByText(/Important Information/i)).not.toBeInTheDocument();
  });

  it('renders all rate conditions stripped of HTML', () => {
    render(
      <HotelImportantInfoModal
        isOpen
        onClose={vi.fn()}
        rateConditions={rateConditions}
      />
    );

    expect(screen.getByText('No smoking in rooms')).toBeInTheDocument();
    expect(screen.getByText('Check-in after 2 PM')).toBeInTheDocument();
    expect(screen.getByText('Pets not allowed')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();

    render(
      <HotelImportantInfoModal
        isOpen
        onClose={onClose}
        rateConditions={rateConditions}
      />
    );

    const backdrop = screen.getByText(/Important Information/i).closest('.fixed')!;
    fireEvent.click(backdrop);

    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();

    render(
      <HotelImportantInfoModal
        isOpen
        onClose={onClose}
        rateConditions={rateConditions}
      />
    );

    const closeButton = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when "I Understand" button is clicked', () => {
    const onClose = vi.fn();

    render(
      <HotelImportantInfoModal
        isOpen
        onClose={onClose}
        rateConditions={rateConditions}
      />
    );

    const understandButton = screen.getByText(/I Understand/i);
    fireEvent.click(understandButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('renders icons for header and conditions', () => {
    render(
      <HotelImportantInfoModal
        isOpen
        onClose={vi.fn()}
        rateConditions={rateConditions}
      />
    );

    expect(screen.getByTestId('alertcircle-icon')).toBeInTheDocument();
    expect(screen.getAllByTestId('info-icon').length).toBe(rateConditions.length);
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();
  });
});

