import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if we're hovering over something clickable
      const target = e.target;
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.closest('button') ||
        target.closest('a');
        
      setIsPointer(isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Return null on touch devices (where cursor doesn't make sense)
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Small dot that perfectly follows the cursor */}
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-teal-600 rounded-full pointer-events-none z-[100] transition-opacity duration-150"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
          opacity: position.x === 0 && position.y === 0 ? 0 : 1
        }}
      />
      
      {/* Larger trailing ring */}
      <div 
        className={`fixed top-0 left-0 w-8 h-8 border-2 rounded-full pointer-events-none z-[99] transition-all duration-300 ease-out ${
          isPointer ? 'border-amber-400 bg-amber-400/20 scale-150' : 'border-teal-400/50 scale-100'
        }`}
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
          opacity: position.x === 0 && position.y === 0 ? 0 : 1
        }}
      />
    </>
  );
}
