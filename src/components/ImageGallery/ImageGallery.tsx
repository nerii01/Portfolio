import React, { useRef, useState } from "react";
import ComponentWrapper, {
  type ComponentWrapperProps,
} from "../ComponentWrapper/ComponentWrapper";
import "./ImageGallery.css";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useImageViewer } from "../../hooks/useImageViewer";

interface GalleryImage {
  image: string;
  title?: string;
  description?: string;
}

interface ImageGalleryProps extends ComponentWrapperProps {
  Images: GalleryImage[];
}

interface ImageGalleryImagesProps {
  Images: GalleryImage[];
  currentImage: number;
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>;
}

export default function ImageGallery({
  Images,
  ...wrapperProps
}: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <ComponentWrapper {...wrapperProps}>
      <div className="image-gallery_body">
        <ImageGalleryImages
          Images={Images}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
        />
        <div className="image-gallery_body_title">
          <h3>{Images[currentImage].title || ""}</h3>
        </div>
        {Images[currentImage].description && (
          <div className="image-gallery_body_description">
            <p>{Images[currentImage].description}</p>
          </div>
        )}
      </div>
    </ComponentWrapper>
  );
}

export function ImageGalleryImages({
  Images,
  currentImage,
  setCurrentImage,
}: ImageGalleryImagesProps) {
  function handleImageChange(Value: number) {
    setCurrentImage((prev) => {
      let val = prev + Value;
      if (val >= Images.length) val = 0;
      if (val < 0) val = Images.length - 1;
      return val;
    });
  }

  const isDragging = useRef(false);
  const { setImage } = useImageViewer();

  return (
    <div className="image-gallery_body_images">
      {/* Button Left */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="image-gallery_body_images_button left"
        onClick={() => {
          handleImageChange(-1);
        }}
      >
        <ChevronLeft />
      </motion.button>

      {/* Images */}
      <div className="image-gallery_images_wrapper">
        {Images.map((img, index) => {
          return (
            <motion.div
              key={index}
              className="image-gallery_image_wrapper"
              animate={{
                x: `calc(${-100 * currentImage}% - ${currentImage * 100}px)`,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            >
              <motion.img
                onMouseUp={() => {
                  if (!isDragging.current) {
                    setImage(`./images/${img.image}`);
                  }
                  isDragging.current = false;
                }}
                whileDrag={{ scale: 0.95 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragStart={() => {
                  isDragging.current = true;
                }}
                onDragEnd={(_, info) => {
                  const diff = -info.offset.x;
                  if (diff > 50) handleImageChange(1);
                  else if (diff < -50) handleImageChange(-1);
                  else handleImageChange(0);
                }}
                className="image-gallery_image"
                src={`./images/${img.image}`}
              />
            </motion.div>
          );
        })}
      </div>

      <motion.div className="image-gallery_image_circles">
        {currentImage + 1}
        {" / "}
        {Images.length}
      </motion.div>

      {/* Button Right */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="image-gallery_body_images_button right"
        onClick={() => {
          handleImageChange(1);
        }}
      >
        <ChevronRight />
      </motion.button>
    </div>
  );
}
