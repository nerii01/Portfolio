import Prism from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
Prism.languages.insertBefore("cpp", "keyword", {
  namespace: {
    pattern: /\bstd\b/,
    alias: "namespace",
  },
});

import { useEffect, useMemo, useRef, useState } from "react";
import "./CodeSandbox.css";

// Prism helper
function renderTokens(tokens: Prism.TokenStream): React.ReactNode {
  return tokens.map((token, i) => {
    if (typeof token === "string") {
      return <span key={i}>{token}</span>;
    }

    if (Array.isArray(token.content)) {
      return (
        <span key={i} className={`token ${token.type}`}>
          {renderTokens(token.content)}
        </span>
      );
    }

    return (
      <span key={i} className={`token ${token.type}`}>
        {token.content}
      </span>
    );
  });
}

export default function CodeSandbox({ Header, HeadingColor, Code }) {
  // Tokenize code
  const tokens = useMemo(() => {
    if (!Code) return [];
    return Prism.tokenize(Code, Prism.languages.cpp);
  }, [Code]);

  // Synchronize line and body scroll
  const linesRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const codeEl = codeRef.current;
    const linesEl = linesRef.current;

    if (!codeEl || !linesEl) return;

    const handleScroll = () => {
      linesEl.scrollTop = codeEl.scrollTop;
    };

    codeEl.addEventListener("scroll", handleScroll);

    return () => {
      codeEl.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Add header margin
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerSize, setHeaderSize] = useState<string>("0px");
  useEffect(() => {
    setHeaderSize(`${headerRef.current.offsetHeight}px`);
  }, []);

  // Code Sandbox
  return (
    // Wrapper
    <div
      style={{ "--code-header-color": HeadingColor }}
      className="code-sandbox_wrapper"
    >
      {/* Header */}
      <div ref={headerRef} className="code-sandbox_header">
        <p>{Header || "Code"}</p>
      </div>

      {/* Body */}
      <div className="code-sandbox_body">
        <div ref={linesRef} className="code-sandbox_body_lines">
          <code>
            <div style={{ height: headerSize }}></div>
            {Code.split("\n").map((_, i) => (
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "var(--font-mono)",
                }}
                key={i}
              >
                {i + 1}
              </p>
            ))}
          </code>
        </div>

        <div ref={codeRef} className="code-sandbox_body_code">
          <pre className="code">
            <div style={{ height: headerSize }}></div>
            <code>{Code && renderTokens(tokens)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
