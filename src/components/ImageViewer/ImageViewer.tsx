import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useImageViewer } from "../../hooks/useImageViewer";
import "./ImageViewer.css";
import { useScreenSize } from "../../hooks/useScreenSize";

export default function ImageViewer() {
  const { image, setImage } = useImageViewer();

  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const { width, height } = useScreenSize();

  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  const lastDistance = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lastTouchCenter = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const screenCenter: { x: number; y: number } = {
      x: width / 2,
      y: height / 2,
    };
    const maxScale = 5;

    // Desktop
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Scroll down
      if (e.deltaY <= 0) {
        // Offset + scale
        setOffsetX(
          (prev) =>
            prev +
            (-(e.clientX - screenCenter.x) / screenCenter.x) *
              50 *
              (1 / scaleRef.current),
        );
        setOffsetY(
          (prev) =>
            prev +
            (-(e.clientY - screenCenter.y) / screenCenter.y) *
              50 *
              (1 / scaleRef.current),
        );
        setScale((s) => Math.min(Math.max(s - e.deltaY * 0.001, 1), maxScale));
      } else // Scroll Up
      {
        // Smooth lerp back
        setScale((prev) => lerp(prev, 1, 0.5));
        setOffsetX((prev) => lerp(prev, 0, 0.5));
        setOffsetY((prev) => lerp(prev, 0, 0.5));
      }
    };

    // Mobile
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();

      // Przesuwanie jednym palcem
      if (e.touches.length === 1) {
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
        return;
      }

      // Zoom double finger
      if (e.touches.length === 2) {
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
        }

        lastDistance.current = distance;
        lastTouchCenter.current = null;
      }
    };

    const onTouchEnd = () => {
      lastDistance.current = null;
      lastTouchCenter.current = null;

      if (scaleRef.current < 1.1) {
        setScale(1);
        setOffsetX((prev) => lerp(prev, 0, 0.5));
        setOffsetY((prev) => lerp(prev, 0, 0.5));
      }
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
    image != "" && (
      <div
        ref={wrapperRef}
        className="image-viewer_wrapper"
        onClick={() => setImage("")}
      >
        <div
          className="image-viewer_images_wrapper"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="image-viewer_image_wrapper">
            <img
              className="image-viewer_image"
              src={image}
              style={{
                transform: `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`,
              }}
            />
          </div>
          <button
            className="image-viewer_close_button"
            onClick={() => setImage("")}
          >
            <X />
          </button>
        </div>
      </div>
    )
  );
}
