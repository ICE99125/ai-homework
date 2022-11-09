import { oneToTwo } from '@src/utils/tools';
import { Col, Input, Row } from 'antd';
import {
  useCallback,
  useMemo,
  useState,
  ChangeEvent,
  useEffect,
} from 'react';

interface Matrixprops {
  num: number;
  init?: number[];
  onChange?: (m: Matrix) => void;
}

export default function Matrix(props: Matrixprops) {
  const { num, onChange, init } = props;

  const [m, setM] = useState<number[]>(
    new Array(num).fill(0)
  );

  // 先执行一次, 避免啥也没输表单结点是 undefined
  useEffect(() => {
    if (typeof init !== 'undefined') {
      setM([...init]);
    } else {
      setM(new Array(num).fill(0));
    }
  }, [num]);

  useEffect(() => {
    if (typeof onChange !== 'undefined') {
      onChange(oneToTwo(m, Math.sqrt(num)));
    }
  }, [m]);

  const oneChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, idx: number) => {
      const m_ = [...m];
      m_[idx] = Number(e.target.value);
      setM(m_);
    },
    [m]
  );

  const inputs = useMemo(() => {
    const _ = new Array(num).fill(0);
    const span = 24 / Math.sqrt(num);

    return _.map((_, idx) => (
      <Col span={span} key={idx}>
        <Input
          type="number"
          style={{
            width: 40,
            height: 40,
            textAlign: 'center',
          }}
          value={m[idx] === 0 ? undefined : m[idx]}
          onChange={(e) => oneChange(e, idx)}
        />
      </Col>
    ));
  }, [num, m]);

  return <Row gutter={[0, 8]}>{inputs}</Row>;
}
