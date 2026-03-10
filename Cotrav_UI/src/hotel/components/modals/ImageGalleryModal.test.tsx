import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest';
import { ImageGalleryModal } from './ImageGalleryModal';

// ---------------------- MOCKS ---------------------- //

// Mock icons to avoid TypeError in tests

vi.mock('@/index', () => {
  const original = vi.importActual('@/index') as any;
  return {
    ...original,
    icons: {
      ...original.icons,
      X: () => <svg data-testid="x-icon" />,
      Utensils: () => <svg data-testid="utensils-icon" />,
      Waves: () => <svg data-testid="waves-icon" />,
      Wifi: () => <svg data-testid="wifi-icon" />,
    },
    
  };
});



// Mock IntersectionObserver
// Mock IntersectionObserver
class IntersectionObserverMock implements IntersectionObserver {
  callback: IntersectionObserverCallback;
  root = null;
  rootMargin = '';
  thresholds: ReadonlyArray<number> = [];
  
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  
  observe() {
    // Immediately trigger the callback to simulate intersection
    this.callback(
      [{ isIntersecting: true } as IntersectionObserverEntry], 
      this as IntersectionObserver
    );
  }
  
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// ---------------------- TESTS ---------------------- //

const images = Array.from({ length: 40 }, (_, i) => `image-${i}.jpg`);

describe('ImageGalleryModal', () => {
  // let onClose: ReturnType<typeof vi.fn>;
  // let onImageClick: ReturnType<typeof vi.fn>;
  let onClose: () => void;
  let onImageClick: (index: number) => void;

  beforeEach(() => {
    onClose = vi.fn();
    onImageClick = vi.fn();
  });

  it('renders modal when open', () => {
    render(
      <ImageGalleryModal
        isOpen
        images={images}
        onClose={onClose}
        onImageClick={onImageClick}
      />
    );

    expect(screen.getByText('Hotel Photos')).toBeInTheDocument();
  });

  it('does not render modal when closed', () => {
    render(
      <ImageGalleryModal
        isOpen={false}
        images={images}
        onClose={onClose}
        onImageClick={onImageClick}
      />
    );

    expect(screen.queryByText('Hotel Photos')).not.toBeInTheDocument();
  });

  it('renders all images with skeletons initially', () => {
    render(
      <ImageGalleryModal
        isOpen
        images={images.slice(0, 5)}
        onClose={onClose}
        onImageClick={onImageClick}
      />
    );

    const renderedImages = screen.getAllByRole('img');
    expect(renderedImages.length).toBe(5);

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBe(5);
  });

  it('calls onClose when backdrop is clicked', () => {
    render(
      <ImageGalleryModal
        isOpen
        images={images}
        onClose={onClose}
        onImageClick={onImageClick}
      />
    );

    const backdrop = screen.getByTestId('backdrop');
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <ImageGalleryModal
        isOpen
        images={images}
        onClose={onClose}
        onImageClick={onImageClick}
      />
    );

    const closeBtn = screen.getByTestId('x-icon');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onImageClick when an image is clicked', () => {
    render(
      <ImageGalleryModal
        isOpen
        images={images.slice(0, 3)}
        onClose={onClose}
        onImageClick={onImageClick}
      />
    );

    const img = screen.getAllByRole('img')[1];
    fireEvent.click(img);
    expect(onImageClick).toHaveBeenCalledWith(1);
  });

  it('shows "No images available" when images array is empty', () => {
    render(
      <ImageGalleryModal
        isOpen
        images={[]}
        onClose={onClose}
        onImageClick={onImageClick}
      />
    );

    expect(screen.getByText('No images available')).toBeInTheDocument();
  });

  it('loads more images when scrolling (infinite scroll)', () => {
    render(
      <ImageGalleryModal
        isOpen
        images={images}
        onClose={onClose}
        onImageClick={onImageClick}
      />
    );

    // Wait for IntersectionObserver mock to trigger
    act(() => {});

    const renderedImages = screen.getAllByRole('img');
    expect(renderedImages.length).toBe(40); // all images loaded
  });
});

