import { useState } from "react";

const OptimizedImage = ({
  src,
  alt,
  className = "",
  placeholder,
  sizes = "100vw",
  srcSet,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
  const [direction, setDirection] = useState(1);

  return (
    <div
      className={`relative overflow-hidden ${className} `}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {/* Low-res placeholder / blur */}
      {placeholder && (
        <img
          src={placeholder}
          alt={alt}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${loaded ? "opacity-0 scale-100" : "opacity-100 scale-105"
            }`}
          aria-hidden="true"
        />
      )}

      {/* Main high-res image */}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={`w-full h-auto object-cover transition-transform duration-500 ease-out ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default OptimizedImage;
