import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface CursorProps {
  isHovering: boolean;
}

const CursorDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #000;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.15s ease-out;
  will-change: transform, left, top;

  &.hover {
    transform: translate(-50%, -50%) scale(2.5);
    background-color: transparent;
    border: 1px solid #000;
  }
`;

const CursorTrail = styled.div`
  width: 24px;
  height: 24px;
  // background-color: rgba(0, 0, 0, 0.1);
  background: radial-gradient(
    circle,
    rgba(0, 123, 255, 0.2) 100%,
    rgba(0, 123, 255, 0.1) 50%,
    transparent 100%
  );
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease-out, width 0.3s ease-out, height 0.3s ease-out;
  will-change: transform, left, top;

  &.hover {
    width: 48px;
    height: 48px;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const Cursor: React.FC<CursorProps> = ({ isHovering }) => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  let mouseX = useRef(0);
  let mouseY = useRef(0);
  let trailX = useRef(0);
  let trailY = useRef(0);

  useEffect(() => {
    document.body.style.cursor = 'none';

    const editCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mouseX.current = x;
      mouseY.current = y;
      
      if (cursorDotRef.current) {
        requestAnimationFrame(() => {
          if (cursorDotRef.current) {
            cursorDotRef.current.style.left = `${x}px`;
            cursorDotRef.current.style.top = `${y}px`;
          }
        });
      }
    };

    const animateTrail = () => {
      if (cursorTrailRef.current) {
        // Increased smoothness with lower ease value
        const ease = 0.08;
        
        trailX.current += (mouseX.current - trailX.current) * ease;
        trailY.current += (mouseY.current - trailY.current) * ease;
        
        cursorTrailRef.current.style.left = `${trailX.current}px`;
        cursorTrailRef.current.style.top = `${trailY.current}px`;
      }
      requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', editCursor);
    animateTrail();

    return () => {
      window.removeEventListener('mousemove', editCursor);
      document.body.style.cursor = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleMouseDown = () => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = 'translate(-50%, -50%) scale(0.5)';
      }
      if (cursorTrailRef.current) {
        cursorTrailRef.current.style.transform = 'translate(-50%, -50%) scale(0.5)';
      }
    };

    const handleMouseUp = () => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
      if (cursorTrailRef.current) {
        cursorTrailRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <CursorTrail 
        ref={cursorTrailRef} 
        className={`${isHovering ? 'hover' : ''}`}
      />
      <CursorDot 
        ref={cursorDotRef} 
        className={`${isHovering ? 'hover' : ''}`}
      />
    </>
  );
};