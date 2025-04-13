import React, { useState, useEffect, useRef } from "react";

interface SquaresProps {
  speed?: number;
  squareSize?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'diagonal';
  borderColor?: string;
  hoverFillColor?: string;
}

const Squares: React.FC<SquaresProps> = ({
  speed = 0.5,
  squareSize = 40,
  direction = 'diagonal',
  borderColor = '#fff',
  hoverFillColor = '#222',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [squares, setSquares] = useState<Array<{
    id: number;
    x: number;
    y: number;
    isHovered: boolean;
  }>>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateContainerSize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
    };

    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);

    return () => {
      window.removeEventListener('resize', updateContainerSize);
    };
  }, []);

  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return;

    // Calculate number of squares based on container size and square size
    const cols = Math.ceil(containerSize.width / squareSize) + 1;
    const rows = Math.ceil(containerSize.height / squareSize) + 1;
    
    // Create initial squares grid
    const initialSquares = [];
    for (let i = 0; i < rows * cols; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      initialSquares.push({
        id: i,
        x: col * squareSize,
        y: row * squareSize,
        isHovered: false,
      });
    }
    
    setSquares(initialSquares);
  }, [containerSize, squareSize]);

  // Animation function
  useEffect(() => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      setSquares(prevSquares => {
        return prevSquares.map(square => {
          const moveDistance = (elapsed * speed) / 100;
          
          let newX = square.x;
          let newY = square.y;
          
          // Different movement patterns based on direction
          switch (direction) {
            case 'up':
              newY = (square.y - moveDistance) % (containerSize.height + squareSize);
              if (newY < -squareSize) newY = containerSize.height;
              break;
            case 'down':
              newY = (square.y + moveDistance) % (containerSize.height + squareSize);
              if (newY > containerSize.height) newY = -squareSize;
              break;
            case 'left':
              newX = (square.x - moveDistance) % (containerSize.width + squareSize);
              if (newX < -squareSize) newX = containerSize.width;
              break;
            case 'right':
              newX = (square.x + moveDistance) % (containerSize.width + squareSize);
              if (newX > containerSize.width) newX = -squareSize;
              break;
            case 'diagonal':
              newX = (square.x + moveDistance) % (containerSize.width + squareSize);
              newY = (square.y + moveDistance) % (containerSize.height + squareSize);
              if (newX > containerSize.width) newX = -squareSize;
              if (newY > containerSize.height) newY = -squareSize;
              break;
          }
          
          return {...square, x: newX, y: newY};
        });
      });
      
      startTime = timestamp;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, direction, containerSize, squareSize]);

  const handleMouseEnter = (id: number) => {
    setSquares(prevSquares => 
      prevSquares.map(square => 
        square.id === id ? {...square, isHovered: true} : square
      )
    );
  };

  const handleMouseLeave = (id: number) => {
    setSquares(prevSquares => 
      prevSquares.map(square => 
        square.id === id ? {...square, isHovered: false} : square
      )
    );
  };

  return (
    <div ref={containerRef} className="w-full h-full absolute inset-0 overflow-hidden">
      {squares.map((square) => (
        <div
          key={square.id}
          className="absolute transition-colors duration-300"
          style={{
            width: `${squareSize}px`,
            height: `${squareSize}px`,
            left: `${square.x}px`,
            top: `${square.y}px`,
            border: `1px solid ${borderColor}`,
            backgroundColor: square.isHovered ? hoverFillColor : 'transparent',
          }}
          onMouseEnter={() => handleMouseEnter(square.id)}
          onMouseLeave={() => handleMouseLeave(square.id)}
        />
      ))}
    </div>
  );
};

export default Squares;