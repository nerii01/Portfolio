import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useImageViewer } from "../../hooks/useImageViewer";
import "./ImageViewer.css";
import { useScreenSize } from "../../hooks/useScreenSize";
import { motion, AnimatePresence, scaleCorrectors } from "framer-motion";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function ImageViewer() {
  const { image, setImage } = useImageViewer();

  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const { screenCenter } = useScreenSize();

  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  const lastDistance = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lastTouchCenter = useRef<{ x: number; y: number } | null>(null);
  const maxScale = 5;

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Reset
    setOffsetX(0);
    setOffsetY(0);
    setScale(1);

    // Desktop
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (e.deltaY <= 0) {
        const delta = -e.deltaY * 0.001;
        const newScale = Math.min(scaleRef.current + delta, maxScale);
        const scaleChange = newScale / scaleRef.current;

        // Pozycja kursora względem środka ekranu
        const mouseX = e.clientX - screenCenter.x;
        const mouseY = e.clientY - screenCenter.y;

        // Offset musi się przesunąć tak żeby punkt pod kursorem został w miejscu
        setOffsetX((prev) => mouseX - scaleChange * (mouseX - prev));
        setOffsetY((prev) => mouseY - scaleChange * (mouseY - prev));
        setScale(newScale);
      } else {
        setScale((prev) => lerp(prev, 1, 0.5));
        setOffsetX((prev) => lerp(prev, 0, 0.5));
        setOffsetY((prev) => lerp(prev, 0, 0.5));
      }
    };

    // Mobile
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();

      // Move
      if (lastTouchCenter.current !== null) {
        const dx = e.touches[0].clientX - lastTouchCenter.current.x;
        const dy = e.touches[0].clientY - lastTouchCenter.current.y;
        setOffsetX((prev) => prev + dx * (1 / scaleRef.current));
        setOffsetY((prev) => prev + dy * (1 / scaleRef.current));
      }
      lastTouchCenter.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      lastDistance.current = null;

      // Zoom
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const touchCenter = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };

      if (lastDistance.current !== null) {
        const delta = distance - lastDistance.current;
        setScale((s) => Math.min(Math.max(s + delta * 0.01, 1), maxScale));

        // Offset
        setOffsetX(
          (prev) =>
            prev +
            (-(touchCenter.x - screenCenter.x) / screenCenter.x) *
              delta *
              0.3 *
              (1 / scaleRef.current),
        );
        setOffsetY(
          (prev) =>
            prev +
            (-(touchCenter.y - screenCenter.y) / screenCenter.y) *
              delta *
              0.3 *
              (1 / scaleRef.current),
        );

        lastDistance.current = distance;
        lastTouchCenter.current = null;
      }
    };

    const onTouchEnd = () => {
      lastDistance.current = null;
      lastTouchCenter.current = null;
    };

    // Listeners
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchmove", onTouch, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: false });

    // Clear listeners
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchmove", onTouch);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [image]);

  return (
    <>
      <AnimatePresence mode="wait">
        {image != "" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={wrapperRef}
            className="image-viewer_wrapper"
            onClick={() => setImage("")}
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              className="image-viewer_images_wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="image-viewer_image_wrapper">
                <img
                  className="image-viewer_image"
                  src={image}
                  style={{
                    transform: `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`,
                    transition: "0.1s ease-out",
                  }}
                />
              </div>
              <button
                className="image-viewer_close_button"
                onClick={() => setImage("")}
              >
                <X />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
