import React, { useEffect, useRef, useState } from 'react';
import Markdown from 'marked-react';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';

interface RightSideProps {
  markdownText: string;
  onScroll: (scrollTop: number) => void;
  scrollTop: number;
}

const renderCodeBlock = (code: string, language: string) => {
  let highlightedCode;
  if (!Prism.languages[language]) {
    highlightedCode = Prism.highlight(
      code,
      Prism.languages.plaintext,
      'plaintext'
    );
  } else {
    highlightedCode = Prism.highlight(
      code,
      Prism.languages[language],
      language
    );
  }

  return (
    <pre className={`language-${language}`}>
      <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </pre>
  );
};

export const RightSide: React.FC<RightSideProps> = ({
  markdownText,
  onScroll,
  scrollTop,
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const setLastScrollTop = useState(0)[1];

  useEffect(() => {
    if (previewRef.current && previewRef.current.scrollTop !== scrollTop) {
      if (!debouncedScroll.current) {
        previewRef.current.scrollTop = scrollTop;
      }
    }
  }, [scrollTop]);

  const debouncedScroll = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = () => {
    if (previewRef.current) {
      const newScrollTop = previewRef.current.scrollTop;
      setLastScrollTop(newScrollTop);
      if (debouncedScroll.current) {
        clearTimeout(debouncedScroll.current);
      }
      debouncedScroll.current = setTimeout(() => {
        onScroll(newScrollTop);
      }, 0);
    }
  };

  return (
    <div className="flex-1 bg-blue-500 h-full w-full relative flex flex-col justify-center items-center overflow-hidden">
      <span className="text-white text-center block font-black">
        Markdown Preview
      </span>
      <div
        ref={previewRef}
        id="preview"
        className="w-full pt-5 pl-5 bg-blue-300 overflow-auto"
        style={{ height: 'calc(100% - 10px)' }}
        onScroll={handleScroll}
      >
        <Markdown renderer={{ code: renderCodeBlock }}>{markdownText}</Markdown>
      </div>
    </div>
  );
};
