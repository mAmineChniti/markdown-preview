import { LeftSide } from './components/left-side/left-side';
import { RightSide } from './components/right-side/right-side';
import { useState, useEffect } from 'react';

function App() {
  const [markdownText, setMarkdownText] = useState('');
  const [leftScrollTop, setLeftScrollTop] = useState(0);
  const [rightScrollTop, setRightScrollTop] = useState(0);

  // Callback to handle text change in the left side component
  const handleTextChange = (newText: string) => {
    setMarkdownText(newText);
  };

  // Callback to handle scroll change in both components
  const handleScroll = (scrollTop: number, side: 'left' | 'right') => {
    if (side === 'left') {
      setLeftScrollTop(scrollTop);
    } else {
      setRightScrollTop(scrollTop);
    }
  };

  // Synchronize scrolling between the two components
  useEffect(() => {
    const leftSideElement = document.getElementById('editor');
    const rightSideElement = document.getElementById('preview');

    let leftTimeout: NodeJS.Timeout;
    let rightTimeout: NodeJS.Timeout;

    if (leftSideElement && rightSideElement) {
      const handleLeftScroll = () => {
        clearTimeout(leftTimeout);
        leftTimeout = setTimeout(() => {
          const { scrollTop, scrollHeight, clientHeight } = leftSideElement;
          const ratio = (scrollTop + clientHeight) / scrollHeight;
          const newScrollTop =
            ratio * rightSideElement.scrollHeight -
            rightSideElement.clientHeight;
          rightSideElement.scrollTop = newScrollTop;
        }, 100); // Adjust debounce delay as needed
      };

      const handleRightScroll = () => {
        clearTimeout(rightTimeout);
        rightTimeout = setTimeout(() => {
          const { scrollTop, scrollHeight, clientHeight } = rightSideElement;
          const ratio = (scrollTop + clientHeight) / scrollHeight;
          const newScrollTop =
            ratio * leftSideElement.scrollHeight - leftSideElement.clientHeight;
          leftSideElement.scrollTop = newScrollTop;
        }, 100); // Adjust debounce delay as needed
      };

      leftSideElement.addEventListener('scroll', handleLeftScroll);
      rightSideElement.addEventListener('scroll', handleRightScroll);

      return () => {
        leftSideElement.removeEventListener('scroll', handleLeftScroll);
        rightSideElement.removeEventListener('scroll', handleRightScroll);
        clearTimeout(leftTimeout);
        clearTimeout(rightTimeout);
      };
    }
  }, []);

  return (
    <div className="h-screen flex overflow-hidden">
      <LeftSide
        onTextChange={handleTextChange}
        onScroll={(scrollTop: number) => handleScroll(scrollTop, 'left')}
        scrollTop={leftScrollTop}
      />
      <RightSide
        markdownText={markdownText}
        onScroll={(scrollTop: number) => handleScroll(scrollTop, 'right')}
        scrollTop={rightScrollTop}
      />
    </div>
  );
}

export default App;
