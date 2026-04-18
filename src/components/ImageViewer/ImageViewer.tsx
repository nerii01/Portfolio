import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useImageViewer } from "../../hooks/useImageViewer";
import "./ImageViewer.css";

export default function ImageViewer() {
  const { image, setImage } = useImageViewer();
  const [scale, setScale] = useState(1);
  const lastDistance = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale((s) => Math.min(Math.max(s - e.deltaY * 0.001, 1), 10));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [image]); // 

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 2) return;
    e.preventDefault();

    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (lastDistance.current !== null) {
      const delta = distance - lastDistance.current;
      setScale((s) => Math.min(Math.max(s + delta * 0.01, 1), 10));
    }

    lastDistance.current = distance;
  };

  const handleTouchEnd = () => {
    lastDistance.current = null;
  };

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
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="image-viewer_image_wrapper">
            <img
              className="image-viewer_image"
              src={image}
              style={{
                transform: `scale(${scale})`,
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
