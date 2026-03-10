import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CompanyDropdown } from './CompanyDropdown'

// ------------------------------------------------------------------
// mocks
// ------------------------------------------------------------------
vi.mock('@/index', async () => {
  const React = await import('react')

  // safe, lint-friendly helper
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

      Popover: ({ children }: WithChildren) => <div>{children}</div>,
      PopoverTrigger: ({ children }: WithChildren) => <div>{children}</div>,
      PopoverContent: ({ children }: WithChildren) => <div>{children}</div>,

      Button: ({
        children,
        ...props
      }: WithChildren<{ onClick?: () => void; role?: string }>) => (
        <button {...props}>{children}</button>
      ),

      Command: ({ children }: WithChildren) => <div>{children}</div>,

      CommandInput: ({
        value,
        onValueChange,
        ...rest
      }: WithChildren<{ value: string; onValueChange?: (val: string) => void }>) => (
        <input
          value={value}
          onChange={(e) => onValueChange?.(e.target.value)}
          {...rest}
        />
      ),

      CommandList: ({ children }: WithChildren) => <div>{children}</div>,
      CommandEmpty: ({ children }: WithChildren) => <div>{children}</div>,
      CommandGroup: ({ children }: WithChildren) => <div>{children}</div>,

      // ✅ FIXED: pass actual value
      CommandItem: ({
        children,
        onSelect,
        value,
      }: WithChildren<{ onSelect?: (val: string) => void; value?: string }>) => (
        <div onClick={() => value && onSelect?.(value)}>{children}</div>
      ),
    },

    icons: {
      Building2: () => <span data-testid="icon-building2" />,
      ChevronDown: () => <span data-testid="icon-chevron" />,
    },

    searchHotelFormTypes: {},
  }
})

// ------------------------------------------------------------------
// helpers
// ------------------------------------------------------------------
const defaultProps = {
  company: '',
  setCompany: vi.fn(),
  companies: ['Company A', 'Company B'],
  showDropdown: false,
  setShowDropdown: vi.fn(),
  fetchCompanies: vi.fn(),
  loading: false,
}

const setup = (overrideProps: Partial<typeof defaultProps> = {}) => {
  const props = { ...defaultProps, ...overrideProps }
  render(<CompanyDropdown {...props} />)
  return props
}

// ------------------------------------------------------------------
// tests
// ------------------------------------------------------------------
describe('CompanyDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders label and button', () => {
    setup()
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('calls fetchCompanies and opens dropdown on button click', () => {
    const props = setup({ companies: [] })
    fireEvent.click(screen.getByRole('combobox'))

    expect(props.fetchCompanies).toHaveBeenCalled()
    expect(props.setShowDropdown).toHaveBeenCalledWith(true)
  })

  it('updates company on input change', () => {
    const props = setup({ showDropdown: true })
    fireEvent.change(screen.getByPlaceholderText('Search company...'), {
      target: { value: 'Company A' },
    })

    expect(props.setCompany).toHaveBeenCalledWith('Company A')
  })

  it('selecting a company calls setCompany and closes dropdown', () => {
    const props = setup({ showDropdown: true })

    fireEvent.click(screen.getByText('Company A'))

    // ✅ FIXED EXPECTATION
    expect(props.setCompany).toHaveBeenCalledWith('Company A')
    expect(props.setShowDropdown).toHaveBeenCalledWith(false)
  })

  it('shows loading state when loading is true', () => {
    setup({ showDropdown: true, loading: true })
    expect(screen.getByText('Loading companies...')).toBeInTheDocument()
  })

  it('shows "No company found" when no results', () => {
    setup({ showDropdown: true, companies: [], loading: false })
    expect(screen.getByText('No company found.')).toBeInTheDocument()
  })
})

