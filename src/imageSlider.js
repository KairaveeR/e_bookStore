import React, { useState, useEffect } from 'react';
import './App.css';

const images = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  '/images/image4.jpg'
];

function ImageSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextImage, 3000); // Auto slide every 3 seconds

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <div className="slider-container">
      <button onClick={prevImage}>Previous</button>
      <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
      <button onClick={nextImage}>Next</button>
    </div>
  );
}

export default ImageSlider;
