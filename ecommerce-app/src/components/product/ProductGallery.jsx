import { useState } from 'react';

export default function ProductGallery({ images, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="gallery">
      <div className="gallery__main">
        <img src={images[activeIndex]} alt={productName} />
      </div>
      {images.length > 1 && (
        <div className="gallery__thumbs" role="tablist" aria-label="Product images">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              className={`gallery__thumb${index === activeIndex ? ' gallery__thumb--active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <img src={src} alt={`${productName} view ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
