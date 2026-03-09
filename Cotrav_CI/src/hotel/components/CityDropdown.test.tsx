import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CityDropdown } from './CityDropdown'
import {searchHotelFormTypes} from '@/index'

// ------------------------------------------------------------------
// mocks
// ------------------------------------------------------------------
vi.mock('@/index', async () => {
  const React = await import('react')

  // generic type for props with children
  // safer alternative
    type WithChildren<T = object> = T & { children?: React.ReactNode }


  return {
    ui: {
      FormField: ({ children, label, icon: _icon }: WithChildren<{ label: string; icon?: React.ElementType }>) => (
        <div>
          <label>{label}</label>
          {children}
        </div>
      ),
      Popover: ({ children }: WithChildren<{ open?: boolean; onOpenChange?: (open: boolean) => void }>) => <div>{children}</div>,
      PopoverTrigger: ({ children }: WithChildren) => <div>{children}</div>,
      PopoverContent: ({ children }: WithChildren) => <div>{children}</div>,
      Button: ({ children, ...props }: WithChildren<{ onClick?: () => void; role?: string; className?: string }>) => (
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
      CommandItem: ({ children, onSelect }: WithChildren<{ onSelect?: (val: string) => void }>) => (
        <div onClick={() => onSelect?.('mockValue')}>{children}</div>
      ),
    },
    icons: {
      MapPin: () => <span data-testid="icon-mappin" />,
      ChevronDown: () => <span data-testid="icon-chevron" />,
    },
    searchHotelFormTypes: {},
  }
})

// ------------------------------------------------------------------
// helpers
// ------------------------------------------------------------------
const defaultCities: searchHotelFormTypes.City[] = [
  {
    id: "1",
    name: 'Goa',
    state_name: 'Goa',
    country_name: 'India',
    tbo_city_code: '119805',
    city_code: 'GOA',
    state_id: 'IN-GA',
    country_code: 'IN',
  },
  {
    id: "2",
    name: 'Mumbai',
    state_name: 'Maharashtra',
    country_name: 'India',
    tbo_city_code: '110001',
    city_code: 'MUM',
    state_id: 'IN-MH',
    country_code: 'IN',
  },
]

const defaultProps: searchHotelFormTypes.CityDropdownProps = {
  city: '',
  setCity: vi.fn(),
  cities: defaultCities,
  showDropdown2: false,
  setShowDropdown2: vi.fn(),
  fetchCities: vi.fn(),
  setSelectedCityCode: vi.fn(),
  loading: false,
}

const setup = (overrideProps?: Partial<searchHotelFormTypes.CityDropdownProps>) => {
  const props = { ...defaultProps, ...overrideProps }
  render(<CityDropdown {...props} />)
  return props
}

// ------------------------------------------------------------------
// tests
// ------------------------------------------------------------------
describe('CityDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders label and button', () => {
    setup()
    expect(screen.getByText('City or Area')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('calls fetchCities and opens dropdown on button click', () => {
    const props = setup()
    const button = screen.getByRole('combobox')
    fireEvent.click(button)
    expect(props.fetchCities).toHaveBeenCalled()
    expect(props.setShowDropdown2).toHaveBeenCalledWith(true)
  })

  it('updates city on input change', () => {
    const props = setup({ showDropdown2: true })
    const input = screen.getByPlaceholderText('Search city...')
    fireEvent.change(input, { target: { value: 'Mu' } })
    expect(props.setCity).toHaveBeenCalledWith('Mu')
  })

  it('selecting a city calls setCity, setSelectedCityCode, and closes dropdown', () => {
    const props = setup({ showDropdown2: true })
    const cityItem = screen.getByText('Goa')
    fireEvent.click(cityItem)
    expect(props.setCity).toHaveBeenCalledWith('Goa, Goa, India')
    expect(props.setSelectedCityCode).toHaveBeenCalledWith('119805')
    expect(props.setShowDropdown2).toHaveBeenCalledWith(false)
  })

  it('shows loading state when loading is true', () => {
    setup({ showDropdown2: true, loading: true })
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows "No city found" when no results', () => {
    setup({ showDropdown2: true, cities: [], city: 'Unknown' })
    expect(screen.getByText('No city found.')).toBeInTheDocument()
  })
})

