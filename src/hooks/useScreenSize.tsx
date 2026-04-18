import { useState, useEffect } from "react";

export function useScreenSize() {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const screenCenter: { x: number; y: number } = {
    x: width / 2,
    y: height / 2,
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      // Mobile size
      setIsMobile(window.innerWidth <= 750);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width, height, screenCenter, isMobile };
}
