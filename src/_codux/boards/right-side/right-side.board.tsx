import { createBoard } from '@wixc3/react-board';
import { RightSide } from '../../../components/right-side/right-side';

export default createBoard({
  name: 'RightSide',
  Board: () => <RightSide markdownText={''} onScroll={function(_scrollTop: number): void {
throw new Error('Function not implemented.');
} } scrollTop={0} />,
  isSnippet: true,
  environmentProps: {
    canvasWidth: 1304.3398692810456,
    canvasHeight: 636.3529411764706,
    windowWidth: 1024,
    windowHeight: 768,
  },
});
