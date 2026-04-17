import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-hlsl';
import 'prismjs/components/prism-glsl';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';


import { useEffect, useMemo, useRef } from 'react';
import ComponentWrapper, {
  type ComponentWrapperProps,
} from '../ComponentWrapper/ComponentWrapper';
import './CodeSandbox.css';

// Prism

Prism.languages.insertBefore('cpp', 'keyword', {
  namespace: {
    pattern: /\bstd\b/,
    alias: 'namespace',
  },
});

function renderTokens(tokens: (string | Prism.Token)[]): React.ReactNode {
  return tokens.map((token, i) => {
    if (typeof token === 'string') {
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
        {typeof token.content === 'string'
          ? token.content
          : Array.isArray(token.content)
            ? renderTokens(token.content)
            : renderTokens([token.content])}
      </span>
    );
  });
}

/////

interface CodeSandboxProps extends ComponentWrapperProps {
  Code: string;
  Language?: string;
}

export default function CodeSandbox({
  Code,
  Language,
  ...wrapperProps
}: CodeSandboxProps) {

  // Tokenize code
  const languageMap: Record<string, string> = {
    'c++': 'cpp',
    cpp: 'cpp',
    c: 'c',
    js: 'javascript',
    ts: 'typescript',
    html: 'markup',
    xml: 'markup',
    hlsl: 'hlsl',
  };
  const tokens = useMemo(() => {
    if (!Code) return [];

    const langKey = Language?.toLowerCase() || 'cpp';
    const prismLang = languageMap[langKey] || langKey;

    const grammar = Prism.languages[prismLang];

    if (!grammar) {
      console.warn(`Prism: language "${prismLang}" not found`);
      return [Code];
    }

    return Prism.tokenize(Code, grammar);
  }, [Code, Language]);

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

    codeEl.addEventListener('scroll', handleScroll);

    return () => {
      codeEl.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const Header = ({
    title,
    language,
  }: {
    title: React.ReactNode;
    language?: string;
  }) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          gap: '10px',
        }}>
        <span>{title}</span>
        {Language && <span className={`badge ${language}`}>{language}</span>}
      </div>
    );
  };

  // Code Sandbox
  return (
    // Wrapper
    <ComponentWrapper
      {...wrapperProps}
      HeaderMargin={!wrapperProps.Header}
      Header={
        wrapperProps.Header && (
          <Header title={wrapperProps.Header} language={Language} />
        )
      }>
      <div className="code-sandbox_body">
        <div ref={linesRef} className="code-sandbox_body_lines">
          <div style={{ height: 'var(--header-height)', flexShrink: 0 }} />
          <code>
            {Code.split('\n').map((_, i) => (
              <p key={i}>{i + 1}</p>
            ))}
          </code>
        </div>

        <div ref={codeRef} className="code-sandbox_body_code">
          {wrapperProps.Header && (
            <div style={{ height: 'var(--header-height)', flexShrink: 0 }} />
          )}
          <pre className="code">
            <code>{Code && renderTokens(tokens)}</code>
          </pre>
        </div>
      </div>
    </ComponentWrapper>
  );
}
