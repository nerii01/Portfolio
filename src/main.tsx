import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ImageViewerProvider } from "./hooks/useImageViewer.tsx";

createRoot(document.getElementById("root")!).render(
  <ImageViewerProvider>
    <App />
  </ImageViewerProvider>,
);
