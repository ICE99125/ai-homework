import { atom } from 'recoil';

interface Config {
  algorithm: string;
  end: Matrix;
  numbers: number;
  depth?: number;
  h?: number;
  start: Matrix;
}

export const configState = atom<Config>({
  key: 'config',
  default: {
    algorithm: 'bfs',
    end: [],
    numbers: 8,
    depth: undefined,
    start: [],
    h: 1,
  },
});

interface CalsState {
  loading: boolean;
  have: boolean; // 是否有解了
}

// 运算状态
export const calcState = atom<CalsState>({
  key: 'calcState',
  default: {
    loading: false,
    have: false,
  },
});

interface Result {
  path: aNode[] | eNode[];
  time: number;
  count: number;
}

export const resultState = atom<Result>({
  key: 'result',
  default: {
    path: [],
    time: 0,
    count: 0,
  },
});
