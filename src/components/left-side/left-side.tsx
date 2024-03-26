import React, { useEffect, useRef } from 'react';

interface LeftSideProps {
  onTextChange: (newText: string) => void;
  onScroll: (scrollTop: number) => void;
  scrollTop: number;
}

export const LeftSide: React.FC<LeftSideProps> = ({
  onTextChange,
  onScroll,
  scrollTop,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  const debouncedScroll = useRef<NodeJS.Timeout | null>(null);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newText = event.target.value;
    onTextChange(newText);
  };

  const handleScroll = () => {
    if (textareaRef.current) {
      const newScrollTop = textareaRef.current.scrollTop;
      if (debouncedScroll.current) {
        clearTimeout(debouncedScroll.current);
      }
      debouncedScroll.current = setTimeout(() => {
        onScroll(newScrollTop);
      }, 0);
    }
  };

  return (
    <div className="flex-1 bg-red-500 h-full w-full relative flex flex-col justify-center items-center overflow-hidden">
      <span className="text-white text-center block font-black">
        Markdown Text
      </span>
      <textarea
        ref={textareaRef}
        id="editor"
        className="w-full border-none outline-none resize-none pt-5 pl-5 bg-red-400 text-white"
        style={{ height: 'calc(100% - 10px)' }}
        onChange={handleTextAreaChange}
        onScroll={handleScroll}
        placeholder="Type your Markdown here..."
      ></textarea>
    </div>
  );
};
