import { createBoard } from '@wixc3/react-board';
import App from '../../../App';

export default createBoard({
  name: 'App',
  Board: () => <App />,
  isSnippet: true,
  environmentProps: {
    canvasWidth: 1329.437908496732,
    windowWidth: 1288,
    windowHeight: 596,
  },
});
