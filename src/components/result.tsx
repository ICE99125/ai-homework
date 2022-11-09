import { calcState, resultState } from '@src/store';
import { Modal, Row, Col } from 'antd';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import s from '@components/index.module.css';

export function Result() {
  const result = useRecoilValue(resultState);
  const setResult = useSetRecoilState(resultState);
  const calc = useRecoilValue(calcState);
  const setCalc = useSetRecoilState(calcState);

  const [idx, setIdx] = useState(0);
  const timer = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (result.path.length !== 0) {
      timer.current = setInterval(() => {
        if (idx >= result.path.length - 1) {
          clearInterval(Number(timer.current));
          timer.current = null;
        } else setIdx(idx + 1);
      }, 1000);
    }

    return () => clearInterval(Number(timer.current));
  }, [idx, result]);

  const r = useMemo(() => {
    if (result.path.length !== 0) {
      const p = result.path[idx].m.flat();
      const num = result.path[0].m.length ** 2;
      const span = 24 / result.path[0].m.length;

      return new Array(num).fill(0).map((_, i) => (
        <Col
          span={span}
          style={{ textAlign: 'center' }}
          key={i}>
          <div
            className={`${s.rblock} ${
              p[i] !== 0 ? s.notZero : ''
            }`}>
            {p[i] !== 0 ? p[i] : ''}
          </div>
        </Col>
      ));
    }
  }, [idx, result]);

  const onClose = useCallback(() => {
    setResult({
      path: [],
      time: 0,
      count: 0,
    });
    setCalc({
      loading: false,
      have: false,
    });
    setIdx(0);
  }, []);

  return (
    <Modal
      title="求解过程"
      open={calc.have}
      footer={null}
      onCancel={onClose}>
      <h5>
        耗时: {result.time} ms, 共查找 {result.count} 个节点
      </h5>
      <Row gutter={[8, 8]}>{r}</Row>
    </Modal>
  );
}
