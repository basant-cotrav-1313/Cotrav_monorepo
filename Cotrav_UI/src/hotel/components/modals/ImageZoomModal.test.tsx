
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageZoomModal } from './ImageZoomModal';

// Mock scrollIntoView since JSDOM doesn't implement it
HTMLElement.prototype.scrollIntoView = vi.fn();

describe('ImageZoomModal', () => {
  const images = ['image-0.jpg', 'image-1.jpg', 'image-2.jpg'];
  const onClose = vi.fn();
  const onPrevious = vi.fn();
  const onNext = vi.fn();
  const onThumbnailClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders modal when open', () => {
    render(
      <ImageZoomModal
        isOpen={true}
        images={images}
        currentIndex={0}
        onClose={onClose}
        onPrevious={onPrevious}
        onNext={onNext}
        onThumbnailClick={onThumbnailClick}
      />
    );

    expect(
      screen.getByRole('img', { name: /thumbnail 0/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /✕/i })
    ).toBeInTheDocument();
  });

  it('does not render modal when closed', () => {
    render(
      <ImageZoomModal
        isOpen={false}
        images={images}
        currentIndex={0}
        onClose={onClose}
        onPrevious={onPrevious}
        onNext={onNext}
        onThumbnailClick={onThumbnailClick}
      />
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    render(
      <ImageZoomModal
        isOpen={true}
        images={images}
        currentIndex={0}
        onClose={onClose}
        onPrevious={onPrevious}
        onNext={onNext}
        onThumbnailClick={onThumbnailClick}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /✕/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onPrevious and onNext when arrows clicked', () => {
    render(
      <ImageZoomModal
        isOpen={true}
        images={images}
        currentIndex={1}
        onClose={onClose}
        onPrevious={onPrevious}
        onNext={onNext}
        onThumbnailClick={onThumbnailClick}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /❮/i }));
    fireEvent.click(screen.getByRole('button', { name: /❯/i }));

    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('calls onThumbnailClick when a thumbnail is clicked', () => {
    render(
      <ImageZoomModal
        isOpen={true}
        images={images}
        currentIndex={0}
        onClose={onClose}
        onPrevious={onPrevious}
        onNext={onNext}
        onThumbnailClick={onThumbnailClick}
      />
    );

    fireEvent.click(
      screen.getByRole('img', { name: /thumbnail 1/i })
    );

    expect(onThumbnailClick).toHaveBeenCalledWith(1);
  });

  it('toggles zoom on main image click', () => {
    render(
      <ImageZoomModal
        isOpen={true}
        images={images}
        currentIndex={0}
        onClose={onClose}
        onPrevious={onPrevious}
        onNext={onNext}
        onThumbnailClick={onThumbnailClick}
      />
    );

    // ✅ Correct query using accessible name (alt text)
    const mainImage = screen.getByRole('img', {
      name: /hotel image 1 of 3/i,
    });

    // Initial state
    expect(mainImage).toHaveAttribute('data-zoom', 'out');

    // Zoom in
    fireEvent.click(mainImage);
    expect(mainImage).toHaveAttribute('data-zoom', 'in');
    expect(mainImage.style.transform).toContain('scale(2.2)');

    // Zoom out
    fireEvent.click(mainImage);
    expect(mainImage).toHaveAttribute('data-zoom', 'out');
    expect(mainImage.style.transform).toContain('scale(1)');
  });
});


