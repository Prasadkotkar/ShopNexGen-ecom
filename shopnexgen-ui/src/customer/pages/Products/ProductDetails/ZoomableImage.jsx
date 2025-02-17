import React, { useState, useRef, useEffect } from 'react';

const ZoomableImage = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const imgRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      setIsDragging(true);
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - start.x,
        y: e.clientY - start.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    setOffset({ x: 0, y: 0 });
    console.log("toggle zoom ----- ", isZoomed);
  };

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.style.cursor = isDragging ? 'grabbing' : 'grab';
    }
  }, [isDragging]);

  return (
    <div
      style={{
        overflow: 'hidden',
        cursor: isZoomed ? 'zoom-out' : 'zoom-in',
        width: isZoomed ? '100%' : '100%',
        height: 'auto',
        position: 'relative',
      }}
      onClick={toggleZoom}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onContextMenu={handleContextMenu}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{
          width: isZoomed ? '200%' : '200%',
          height: isZoomed ? '200%' : 'auto',
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s',
          userSelect: 'none',
        }}
      />
    </div>
  );
};

export default ZoomableImage;
