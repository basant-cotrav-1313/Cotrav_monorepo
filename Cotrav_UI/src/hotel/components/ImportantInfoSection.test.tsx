import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ImportantInfoSection } from './ImportantInfoSection'

// ----------------------
// Mock '@/index' module
// ----------------------
// import React from 'react'

vi.mock('@/index', () => ({
  hotelTypes: {},
  ui: {
    Card: (props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
      <div {...props}>{props.children}</div>
    ),
    CardContent: (props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
      <div {...props}>{props.children}</div>
    ),
    Button: (props: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => (
      <button {...props}>{props.children}</button>
    ),
    Dialog: (props: React.PropsWithChildren<{ open?: boolean; onOpenChange?: (open: boolean) => void }>) =>
      props.open ? <div role="dialog">{props.children}</div> : null,
    DialogContent: (props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
      <div {...props}>{props.children}</div>
    ),
    DialogHeader: (props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
      <div {...props}>{props.children}</div>
    ),
    DialogTitle: (props: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) => (
      <h2 {...props}>{props.children}</h2>
    ),
  },
  icons: {
    Info: (props: React.SVGProps<SVGSVGElement>) => <svg role="img" {...props} />,
    ChevronRight: (props: React.SVGProps<SVGSVGElement>) => <svg role="img" {...props} />,
  },
  cleanTextArray: vi.fn((arr: string[]) => arr),
}))


// ----------------------
// Mock props
// ----------------------
const rateConditions = [
  'No smoking in rooms',
  'Pets not allowed',
  'Check-in after 2 PM',
  'Check-out before 11 AM',
  'Valid ID required',
]

// ----------------------
// Helper to render component
// ----------------------
const renderImportantInfo = (props = {}) =>
  render(<ImportantInfoSection rateConditions={rateConditions} {...props} />)

// ----------------------
// Tests
// ----------------------
describe('ImportantInfoSection', () => {
  it('renders preview conditions correctly', () => {
    renderImportantInfo()
    rateConditions.slice(0, 4).forEach((condition) => {
      expect(screen.getByText(condition)).toBeInTheDocument()
    })
    expect(screen.queryByText(rateConditions[4])).not.toBeInTheDocument()
  })

  it('shows View More button when conditions exceed previewCount', () => {
    renderImportantInfo({ previewCount: 4 })
    expect(screen.getByText(/View More/i)).toBeInTheDocument()
  })

  it('does not show View More button when conditions less than or equal to previewCount', () => {
    renderImportantInfo({ previewCount: 10 })
    expect(screen.queryByText(/View More/i)).not.toBeInTheDocument()
  })

  it('opens modal and shows all conditions when View More clicked', () => {
    renderImportantInfo({ previewCount: 4 })
    fireEvent.click(screen.getByText(/View More/i))

    // Find the modal by role
    const modal = screen.getByRole('dialog')
    rateConditions.forEach((condition) => {
      expect(within(modal).getByText(condition)).toBeInTheDocument()
    })
  })

  it('returns null when rateConditions is empty', () => {
    const { container } = render(<ImportantInfoSection rateConditions={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('calls cleanTextArray with rateConditions', async () => {
  const { cleanTextArray } = await import('@/index')
  renderImportantInfo()
  expect(cleanTextArray).toHaveBeenCalledWith(rateConditions)
})

  it('applies additional className', () => {
    const className = 'custom-class'
    const { container } = renderImportantInfo({ className })
    expect(container.firstChild).toHaveClass(className)
  })
})

