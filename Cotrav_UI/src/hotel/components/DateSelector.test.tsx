import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { DateSelector } from './DateSelector'

// ------------------------------------------------------------------
// mocks
// ------------------------------------------------------------------
vi.mock('@/index', async () => {
  const React = await import('react')

  type WithChildren<T extends object = object> = T & {
    children?: React.ReactNode
  }

  return {
    ui: {
      FormField: ({
        children,
        label,
      }: WithChildren<{ label: string; icon?: React.ElementType }>) => (
        <div>
          <label>{label}</label>
          {children}
        </div>
      ),

      Popover: ({
        children,
      }: WithChildren<{ open?: boolean; onOpenChange?: (open: boolean) => void }>) => (
        <div>{children}</div>
      ),

      PopoverTrigger: ({ children }: WithChildren) => <div>{children}</div>,

      PopoverContent: ({ children }: WithChildren) => <div>{children}</div>,

      Button: ({
        children,
        ...props
      }: WithChildren<{ onClick?: () => void }>) => (
        <button {...props}>{children}</button>
      ),

      // 🔹 Calendar mock with explicit select button
      Calendar: ({
        onSelect,
      }: {
        onSelect?: (date: Date | undefined) => void
      }) => (
        <button
          data-testid="calendar-select"
          onClick={() => onSelect?.(new Date('2026-03-06'))}
        >
          Select date
        </button>
      ),
    },

    icons: {
      CalendarDays: () => <span data-testid="icon-calendar-days" />,
      Calendar: () => <span data-testid="icon-calendar" />,
    },

    searchHotelFormTypes: {},
  }
})

// ------------------------------------------------------------------
// helpers
// ------------------------------------------------------------------
const defaultProps = {
  label: 'Check-in',
  date: null as Date | null,
  isOpen: false,
  setIsOpen: vi.fn(),
  onChange: vi.fn(),
  minDate: undefined as Date | undefined,
}

const setup = (overrideProps: Partial<typeof defaultProps> = {}) => {
  const props = { ...defaultProps, ...overrideProps }
  render(<DateSelector {...props} />)
  return props
}

// ------------------------------------------------------------------
// tests
// ------------------------------------------------------------------
describe('DateSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders label and placeholder text', () => {
    setup()
    expect(screen.getByText('Check-in')).toBeInTheDocument()
    expect(screen.getByText('Select check-in')).toBeInTheDocument()
  })

  it('renders selected date when date is provided', () => {
    setup({ date: new Date('2026-03-06') })
    expect(screen.getByText('06/03/2026')).toBeInTheDocument()
  })

  it('opens calendar when popover is open', () => {
    setup({ isOpen: true })
    expect(screen.getByTestId('calendar-select')).toBeInTheDocument()
  })

  it('selecting a date calls onChange and closes popover', () => {
    const props = setup({ isOpen: true })

    fireEvent.click(screen.getByTestId('calendar-select'))

    expect(props.onChange).toHaveBeenCalledWith(new Date('2026-03-06'))
    expect(props.setIsOpen).toHaveBeenCalledWith(false)
  })

  it('handles null date selection safely', () => {
    // override calendar to send undefined
    const onChange = vi.fn()
    const setIsOpen = vi.fn()

    render(
      <DateSelector
        {...defaultProps}
        isOpen
        onChange={onChange}
        setIsOpen={setIsOpen}
      />
    )

    fireEvent.click(screen.getByTestId('calendar-select'))

    expect(onChange).toHaveBeenCalled()
    expect(setIsOpen).toHaveBeenCalledWith(false)
  })
})

