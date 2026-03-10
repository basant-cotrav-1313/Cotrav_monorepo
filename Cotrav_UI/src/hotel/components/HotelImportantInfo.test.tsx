
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi} from 'vitest'
import { HotelImportantInfo } from './HotelImportantInfo'
import { hotelTypes } from '@/index'

// ----------------------
// Mock @/index and modal
// ----------------------
vi.mock('@/index', () => ({
  ui: {
    Card: ({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => <div {...props}>{children}</div>,
    CardHeader: ({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => <div {...props}>{children}</div>,
    CardContent: ({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => <div {...props}>{children}</div>,
    Button: ({ children, ...props }: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => <button {...props}>{children}</button>,
  },
  icons: {
    Info: () => <svg data-testid="info-icon" />,
    Sparkles: () => <svg data-testid="sparkles-icon" />,
    ChevronRight: () => <svg data-testid="chevron-icon" />,
  },
}))

vi.mock('./modals/HotelImportantInfoModal', () => ({
  HotelImportantInfoModal: ({ isOpen, onClose, rateConditions }: hotelTypes.HotelImportantInfoModalProps) => (
    <div data-testid="modal" onClick={() => onClose?.()}>
      {isOpen ? `OPEN - ${rateConditions.length} conditions` : 'CLOSED'}
    </div>
  ),
}))

// ----------------------
// Test data
// ----------------------
const mockRateConditions = [
  '<p>Condition 1</p>',
  '<p>Condition 2</p>',
  '<p>Condition 3</p>',
  '<p>Condition 4</p>',
  '<p>Condition 5</p>',
]

// ----------------------
// Tests
// ----------------------
describe('HotelImportantInfo', () => {
  it('renders header and first few conditions', () => {
    render(<HotelImportantInfo rateConditions={mockRateConditions} previewCount={3} />)

    expect(screen.getByText(/Important Information/i)).toBeInTheDocument()
    expect(screen.getByText('Condition 1')).toBeInTheDocument()
    expect(screen.getByText('Condition 2')).toBeInTheDocument()
    expect(screen.getByText('Condition 3')).toBeInTheDocument()
    expect(screen.queryByText('Condition 4')).not.toBeInTheDocument() // hidden by previewCount
  })

  it('renders "No important information available" if empty', () => {
    render(<HotelImportantInfo rateConditions={[]} />)
    expect(screen.getByText(/No important information available/i)).toBeInTheDocument()
  })

  it('shows "View All" button if more conditions than previewCount', () => {
    render(<HotelImportantInfo rateConditions={mockRateConditions} previewCount={3} />)
    const viewAllButton = screen.getByRole('button', { name: /View All 5 Conditions/i })
    expect(viewAllButton).toBeInTheDocument()
  })

  it('opens modal when "View All" button is clicked', () => {
    render(<HotelImportantInfo rateConditions={mockRateConditions} previewCount={3} />)
    const viewAllButton = screen.getByRole('button', { name: /View All 5 Conditions/i })
    const modal = screen.getByTestId('modal')

    expect(modal).toHaveTextContent('CLOSED')
    fireEvent.click(viewAllButton)
    expect(modal).toHaveTextContent('OPEN')
  })

  it('strips HTML tags correctly', () => {
    render(<HotelImportantInfo rateConditions={['<b>Bold Text</b>']} />)
    expect(screen.getByText('Bold Text')).toBeInTheDocument()
  })

  it('closes modal when modal onClose is called', () => {
    render(<HotelImportantInfo rateConditions={mockRateConditions} previewCount={3} />)
    const viewAllButton = screen.getByRole('button', { name: /View All 5 Conditions/i })
    const modal = screen.getByTestId('modal')

    fireEvent.click(viewAllButton) // open modal
    expect(modal).toHaveTextContent('OPEN')

    fireEvent.click(modal) // call onClose
    expect(modal).toHaveTextContent('CLOSED')
  })
})


