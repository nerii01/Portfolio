import { useEffect, useRef, useState } from "react";
import "./ComponentWrapper.css";

export interface ComponentWrapperProps {
  children?: React.ReactNode;
  Header?: React.ReactNode;
  HeaderColor?: string;
  HeaderMargin?: boolean;
  MaxHeight?: number;
  MaxWidth?: number | string;
}

export default function ComponentWrapper({
  children,
  Header,
  HeaderColor,
  HeaderMargin = true,
  MaxHeight,
  MaxWidth,
}: ComponentWrapperProps) {
  // Add header margin
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerSize, setHeaderSize] = useState<string>("0px");
  useEffect(() => {
    const update = () => {
      if (!headerRef.current) return;
      setHeaderSize(`${headerRef.current.offsetHeight}px`);
    };

    update();

    document.fonts.ready.then(update);
  }, []);

  return (
    <div
      className="component-wrapper"
      style={{
        ["--header-height" as string]: headerSize,
        maxHeight: MaxHeight,
        maxWidth: MaxWidth,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      {Header && (
        <div
          ref={headerRef}
          style={{ ["--component-header-color" as string]: HeaderColor }}
          className="component-wrapper_header"
        >
          {Header}
        </div>
      )}

      {/* To add header margin use*/}
      {/* <div style={{ height: "var(--header-height)", flexShrink: 0 }}/> */}

      {/* Body */}
      <div className="component-wrapper_body">
        {HeaderMargin && (
          <div style={{ height: "var(--header-height)", flexShrink: 0 }} />
        )}
        {children}
      </div>
    </div>
  );
}
