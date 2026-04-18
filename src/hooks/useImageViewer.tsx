import { createContext, useContext, useState } from "react";

const ImageViewerContext = createContext<{
  image: string;
  setImage: (img: string) => void;
}>({ image: "", setImage: () => {} });

export function ImageViewerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [image, setImage] = useState("");
  return (
    <ImageViewerContext.Provider value={{ image, setImage }}>
      {children}
    </ImageViewerContext.Provider>
  );
}

export function useImageViewer() {
  return useContext(ImageViewerContext);
}
