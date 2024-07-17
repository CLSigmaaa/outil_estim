"use client"
import * as React from "react"


//type ResizableDirection = 'width' | 'height' | 'both' | false;

export const useResizable = (initialWidth: number = 250, initialHeight: number = 250, resizable: any) => {
  const [currentWidth, setWidth] = React.useState(initialWidth);
  const [currentHeight, setHeight] = React.useState(initialHeight);
  const isResizing = React.useRef(false);

  React.useEffect(() => {
    if (!resizable) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing.current) {
        if (resizable === 'width' || resizable === 'both') {
          setWidth((prev) => prev + (e.movementX / 2));
        }
        if (resizable === 'height' || resizable === 'both') {
          setHeight((prev) => prev + (e.movementY / 2));
        }
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizable]);

  const startResizing = () => {
    if (resizable) {
      isResizing.current = true;
    }
  };

  return { currentWidth, currentHeight, startResizing };
};
