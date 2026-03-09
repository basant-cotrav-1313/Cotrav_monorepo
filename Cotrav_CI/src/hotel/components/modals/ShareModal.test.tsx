
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'
import { ShareModal } from './ShareModal'

/* ------------------------------------------------------------------ */
/* mocks */
/* ------------------------------------------------------------------ */

// framer-motion mock
vi.mock('framer-motion', async () => {
  const React = await import('react')
  return {
    motion: {
      div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
        (props, ref) => <div ref={ref} {...props} />
      ),
      p: React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
        (props, ref) => <p ref={ref} {...props} />
      ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

// radix dialog mock
vi.mock('@radix-ui/react-dialog', () => ({
  Root: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Portal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Overlay: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Content: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Close: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// ui + icons mock
vi.mock('@/index', () => ({
  icons: {
    Send: () => <span />,
    X: () => <span />,
    User: () => <span />,
    UserCircle: () => <span />,
    Mail: () => <span />,
    AlertCircle: () => <span />,
    MessageSquare: () => <span />,
    Loader2: () => <span />,
  },
  ui: {
    Button: ({
      children,
      ...props
    }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props}>{children}</button>
    ),
    Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
      <input {...props} />
    ),
    Label: ({ children }: { children: React.ReactNode }) => <label>{children}</label>,
    Badge: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Textarea: (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
      <textarea {...props} />
    ),
  },
  hotelTypes: {},
}))

/* ------------------------------------------------------------------ */
/* helpers */
/* ------------------------------------------------------------------ */

const setup = (
  overrideProps: Partial<React.ComponentProps<typeof ShareModal>> = {}
) => {
  const props: React.ComponentProps<typeof ShareModal> = {
    isOpen: true,
    onClose: vi.fn(),
    onSubmit: vi.fn(),
    handleChange: vi.fn(),
    handleAddEmail: vi.fn(),
    handleDeleteEmail: vi.fn(),
    handleApproverEmailBlur: vi.fn(),

    toEmailList: [],
    ccEmailList: [],

    toEmail: '',
    setToEmail: vi.fn(),

    ccEmail: '',
    setCcEmail: vi.fn(),

    formData: {
      bookingId: 'TEST-BOOKING-123',
      clientName: 'Demo Client',
      spocName: '',
      spocEmail: '',
      markup: "",
      remark: '',
    },
    errors: {},
    isLoading: false,

    ...overrideProps,
  }

  render(<ShareModal {...props} />)
  return props
}

/* ------------------------------------------------------------------ */
/* tests */
/* ------------------------------------------------------------------ */

describe('ShareModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders modal when open', () => {
    setup()
    expect(screen.getByText('Share Options')).toBeInTheDocument()
    expect(screen.getByText('SEND EMAIL')).toBeInTheDocument()
  })

  it('calls onClose when cancel button clicked', () => {
    const props = setup()
    fireEvent.click(screen.getByText('Cancel'))
    expect(props.onClose).toHaveBeenCalled()
  })

  it('updates SPOC name input', () => {
    const props = setup()
    fireEvent.change(screen.getByPlaceholderText('Enter SPOC name'), {
      target: { value: 'John Doe' },
    })
    expect(props.handleChange).toHaveBeenCalled()
  })

  it('adds CC email on Enter key', () => {
    const props = setup({ ccEmail: 'test@example.com' })

    fireEvent.keyDown(
      screen.getByPlaceholderText('Type email and press Enter or comma'),
      { key: 'Enter' }
    )

    expect(props.handleAddEmail).toHaveBeenCalledWith(
      'test@example.com',
      'ccEmail'
    )
  })

  it('renders CC email badge and deletes it', () => {
    const props = setup({ ccEmailList: ['cc@test.com'] })

    const emailText = screen.getByText('cc@test.com')
    const badge = emailText.closest('div')!
    const deleteButton = badge.querySelector('button')!

    fireEvent.click(deleteButton)

    expect(props.handleDeleteEmail).toHaveBeenCalledWith(
      'cc@test.com',
      'ccEmail'
    )
  })

  it('calls onSubmit when Send Email clicked', () => {
    const props = setup()
    fireEvent.click(screen.getByText('SEND EMAIL'))
    expect(props.onSubmit).toHaveBeenCalled()
  })

  it('shows loading state when isLoading is true', () => {
    setup({ isLoading: true })
    expect(screen.getByText('SENDING...')).toBeInTheDocument()
  })
})


