import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { AdvancedMarker } from './AdvancedMarker'

// --------------------------------------------------
// Google Maps AdvancedMarker mock (class-based)
// --------------------------------------------------

const addListenerMock = vi.fn()
const markerInstances: AdvancedMarkerElementMock[] = []

class AdvancedMarkerElementMock {
  map: google.maps.Map | null
  position: { lat: number; lng: number }
  title?: string

  constructor(options: {
    map: google.maps.Map
    position: { lat: number; lng: number }
    title?: string
  }) {
    this.map = options.map
    this.position = options.position
    this.title = options.title

    // Track instances manually (IMPORTANT)
    markerInstances.push(this)
  }

  addListener(event: string, handler: () => void) {
    addListenerMock(event, handler)
  }
}

// --------------------------------------------------
// Test setup / teardown
// --------------------------------------------------

beforeEach(() => {
  // Minimal google maps mock
  // @ts-expect-error – google maps is injected globally
  global.window.google = {
    maps: {
      marker: {
        AdvancedMarkerElement: AdvancedMarkerElementMock,
      },
    },
  }

  markerInstances.length = 0
  vi.clearAllMocks()
})

afterEach(() => {
  cleanup()
})

// --------------------------------------------------
// Test helpers
// --------------------------------------------------

const mockMap = {} as google.maps.Map

const defaultProps = {
  position: { lat: 12.9716, lng: 77.5946 },
  map: mockMap,
  title: 'Test Marker',
  onClick: vi.fn(),
}

// --------------------------------------------------
// Tests
// --------------------------------------------------

describe('AdvancedMarker', () => {
  it('creates an AdvancedMarker when map is available', () => {
    render(<AdvancedMarker {...defaultProps} />)

    expect(addListenerMock).toHaveBeenCalledWith(
      'click',
      defaultProps.onClick
    )

    expect(markerInstances.length).toBe(1)
  })

  it('does not create marker when map is null', () => {
    render(
      <AdvancedMarker
        {...defaultProps}
        map={null}
      />
    )

    expect(addListenerMock).not.toHaveBeenCalled()
    expect(markerInstances.length).toBe(0)
  })

  it('cleans up marker on unmount', () => {
    const { unmount } = render(<AdvancedMarker {...defaultProps} />)

    const instance = markerInstances[0]
    expect(instance.map).toBe(mockMap)

    unmount()

    expect(instance.map).toBeNull()
  })
})

