// 八数码
export const option1: Options = {
  startNode: {
    m: [
      [2, 0, 3],
      [1, 8, 4],
      [7, 6, 5],
    ],
    p: undefined,
    d: 0,
  },
  endNode: {
    m: [
      [1, 2, 3],
      [8, 0, 4],
      [7, 6, 5],
    ],
    p: undefined,
    d: 0,
  },
};

export const option2: HeuristicOptions = {
  startNode: {
    m: [
      [2, 0, 3],
      [1, 8, 4],
      [7, 6, 5],
    ],
    p: undefined,
    g: 0,
    f: 0,
  },
  endNode: {
    m: [
      [1, 2, 3],
      [8, 0, 4],
      [7, 6, 5],
    ],
    p: undefined,
    g: 0,
    f: 0,
  },
};

export const option3: Options = {
  startNode: {
    m: [
      [11, 9, 4, 15],
      [1, 3, 0, 12],
      [7, 5, 8, 6],
      [13, 2, 10, 14],
    ],
    p: undefined,
    d: 0,
  },
  endNode: {
    m: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0],
    ],
    p: undefined,
    d: 0,
  },
};

export const option4: HeuristicOptions = {
  startNode: {
    m: [
      [11, 9, 4, 15],
      [1, 3, 0, 12],
      [7, 5, 8, 6],
      [13, 2, 10, 14],
    ],
    p: undefined,
    f: 0,
    g: 0,
  },
  endNode: {
    m: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0],
    ],
    p: undefined,
    f: 0,
    g: 0,
  },
};
