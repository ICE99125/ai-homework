import { BfsEightPuzzles } from '@utils/bfs';
import { DfsEightPuzzles } from '@utils/dfs';
import { A } from '@utils/A';
import { calcTime } from '@utils/tools';
import {
  option1,
  option2,
  option3,
  option4,
} from '@src/test/const';

function App() {
  // const bfs = new BfsEightPuzzles(option3);

  // const res = calcTime(
  //   '宽度优先搜索算法',
  //   bfs.solveEightPuzzles.bind(bfs)
  // );

  const Astar = new A(option4, 2);

  const res = calcTime(
    '深度优先搜索算法',
    Astar.solveEightPuzzles.bind(Astar)
  );

  // const dfs = new DfsEightPuzzles(option1);

  // const res = calcTime(
  //   '深度优先搜索算法',
  //   dfs.solveEightPuzzles.bind(dfs)
  // );

  if (typeof res !== 'undefined') {
    const { path, count } = res!;

    console.log(`共搜索了 ${count} 个节点.`);
    console.log('路径为: ', path);
  }

  return <div>hello</div>;
}

export default App;
