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
      className={`relative overflow-hidden ${className} transition-transform duration-500 hover:scale-105 hover:shadow-xl`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {/* Low-res placeholder / blur */}
      {placeholder && (
        <img
          src={placeholder}
          alt={alt}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-0 scale-100" : "opacity-100 scale-105"
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
        className={`w-full h-auto object-cover rounded-lg transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default OptimizedImage;
