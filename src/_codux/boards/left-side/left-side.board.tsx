import { createBoard } from '@wixc3/react-board';
import { LeftSide } from '../../../components/left-side/left-side';

export default createBoard({
  name: 'LeftSide',
  Board: () => <LeftSide onTextChange={function(_newText: string): void {
throw new Error('Function not implemented.');
} } onScroll={function(_scrollTop: number): void {
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
