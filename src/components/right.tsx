import {
  calcState,
  configState,
  resultState,
} from '@src/store';
import { A } from '@src/utils/A';
import { BfsEightPuzzles } from '@src/utils/bfs';
import { DfsEightPuzzles } from '@src/utils/dfs';
import { Result, Row } from 'antd';
import { useEffect, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export function Right() {
  const calc = useRecoilValue(calcState);
  const setCalc = useSetRecoilState(calcState);
  const config = useRecoilValue(configState);
  const setResult = useSetRecoilState(resultState);

  function calcAnswer() {
    return new Promise((resolve, reject) => {
      let ai: any;

      switch (config.algorithm) {
        case 'bfs':
          ai = new BfsEightPuzzles({
            startNode: {
              m: config.start,
              d: 0,
              p: null,
            },
            endNode: {
              m: config.end,
              d: 0,
              p: null,
            },
          });
          break;
        case 'dfs':
          ai = new DfsEightPuzzles(
            {
              startNode: {
                m: config.start,
                d: 0,
                p: null,
              },
              endNode: {
                m: config.end,
                d: 0,
                p: null,
              },
            },
            config.depth
          );
          break;
        case 'A*':
          ai = new A(
            {
              startNode: {
                m: config.start,
                g: 0,
                p: null,
                f: 0,
              },
              endNode: {
                m: config.end,
                g: 0,
                f: 0,
                p: null,
              },
            },
            config.h
          );
          break;
      }

      const s = new Date().getTime();

      const res = ai.solveEightPuzzles();

      const e = new Date().getTime();

      if (typeof res !== 'undefined') {
        resolve({
          res,
          time: e - s,
        });
      } else {
        reject();
      }
    });
  }

  useEffect(() => {
    if (calc.loading) {
      calcAnswer()
        .then((e: any) => {
          console.log(`🕐本次运行耗时: ${e.time} ms.`);
          console.log(`🔬共查找了 ${e.res.count} 个节点.`);
          console.log('🎯运算结果为: ', e.res.path);
          setResult({
            time: e.time,
            path: e.res.path,
            count: e.res.count,
          });
          setCalc({
            loading: false,
            have: true,
          });
        })
        .catch(() => {
          // 没算出答案
          console.log('未找到答案....');
          setCalc({
            loading: false,
            have: false,
          });
        });
    }
  }, [calc]);

  const content = useMemo(() => {
    if (calc.loading) {
      return <div>运行中...</div>;
    }
    // 开始但是没有结果
    if (!calc.loading && !calc.have) {
      return <Result status="warning" title="没有结果" />;
    }
  }, [calc]);

  return (
    <Row
      align="middle"
      justify="center"
      style={{ height: '100%' }}>
      {content}
    </Row>
  );
}
