"use client";

import React, { useState, useEffect } from "react";

interface ContainerTextFlipProps {
  words: string[];
  className?: string;
  interval?: number;
}

export const ContainerTextFlip: React.FC<ContainerTextFlipProps> = ({
  words = [],
  className = "",
  interval = 2000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (words.length <= 1) return;

    const intervalId = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, 500); // Half the animation time for flip effect
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  if (!words.length) return null;

  return (
    <span
      className={`inline-block perspective-1000 ${className}`}
    >
      <span
        className={`inline-block transition-transform duration-500 ease-in-out ${
          isAnimating ? "transform rotateX(-90deg)" : ""
        }`}
      >
        {words[currentIndex]}
      </span>
    </span>
  );
};
