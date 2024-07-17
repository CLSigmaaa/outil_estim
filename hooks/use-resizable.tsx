"use client"
import * as React from "react"


export const useResizableWidth = (initialWidth: number, resizable: boolean) => {
  const [currentWidth, setWidth] = React.useState(initialWidth);
  const isResizing = React.useRef(false);

  React.useEffect(() => {
    if (!resizable) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing.current) {
        setWidth((prev) => prev + (e.movementX / 2));
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

  return { currentWidth, startResizing };
};
