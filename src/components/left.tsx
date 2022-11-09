import type { FormInstance } from 'antd/es/form';
import s from '@components/index.module.css';
import Matrix from '@components/matrix';
import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Select,
  Form,
  Button,
  Space,
  InputNumber,
  Row,
  message,
} from 'antd';
import { isElEqual } from '@src/utils/tools';
import {
  alOptions,
  numOptions,
  eightStart,
  eightEnd,
  fifteenStart,
  fifteenEnd,
  hOptions,
} from '@components/const';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { configState, calcState } from '@src/store';

interface FormValues {
  algorithm: string;
  end: Matrix;
  numbers: number;
  depth?: number;
  h?: number;
  start: Matrix;
}

export function Left() {
  const formRef = useRef<FormInstance>(null);
  const setConfig = useSetRecoilState(configState);
  const setCalcState = useSetRecoilState(calcState);
  const calc = useRecoilValue(calcState);

  const onReset = useCallback(() => {
    formRef.current!.resetFields();
    setDfs(false);
    setA(false);
  }, []);

  const [isDfs, setDfs] = useState(false);
  const onAlChange = useCallback((value: string) => {
    if (value === 'dfs') {
      setDfs(true);
      setA(false);
    } else if (value === 'A*') {
      setA(true);
      setDfs(false);
    } else {
      setDfs(false);
      setA(false);
    }
  }, []);

  const [nums, setNums] = useState(9);
  const onNumChange = useCallback((value: number) => {
    setNums(value);
  }, []);

  const onFinish = useCallback((value: FormValues) => {
    const isE = isElEqual(value.start, value.end);

    if (!isE) {
      message.error('起始结点和目标结点不匹配.');
    } else {
      // 设置用户配置
      setConfig({
        algorithm: value.algorithm,
        end: value.end,
        numbers: value.numbers,
        depth: value.depth,
        start: value.start,
        h: value.h,
      });

      console.log('✨开始计算啦.');
      console.log(
        `⚙️即将使用 ${value.algorithm} 算法进行图搜索.`
      );
      setCalcState({
        loading: true,
        have: false,
      });
    }
  }, []);

  const depth = useMemo(() => {
    if (isDfs) {
      return (
        <Form.Item label="搜索深度" name="depth">
          <InputNumber min={1} max={20} />
        </Form.Item>
      );
    }
  }, [isDfs]);

  const [isA, setA] = useState(false);
  const h = useMemo(() => {
    if (isA) {
      return (
        <Form.Item label="启发函数" name="h">
          <Select
            style={{ width: 80 }}
            options={hOptions}
          />
        </Form.Item>
      );
    }
  }, [isA]);

  return (
    <div className={s.left__container}>
      <Form
        style={{ width: '100%' }}
        labelCol={{ span: 8 }}
        onFinish={onFinish}
        labelAlign="left"
        ref={formRef}
        initialValues={{
          algorithm: alOptions[0].value,
          depth: 4,
          numbers: 8,
          h: 1,
        }}>
        <Form.Item label="图搜索算法" name="algorithm">
          <Select
            style={{ width: 160 }}
            options={alOptions}
            onChange={onAlChange}
          />
        </Form.Item>
        {depth}
        {h}
        <Form.Item label="数码" name="numbers">
          <Select
            style={{ width: 100 }}
            options={numOptions}
            onChange={onNumChange}
          />
        </Form.Item>
        <Form.Item label="起始结点" name="start">
          <Matrix
            num={nums}
            init={nums === 9 ? eightStart : fifteenStart}
          />
        </Form.Item>
        <Form.Item label="目标结点" name="end">
          <Matrix
            num={nums}
            init={nums === 9 ? eightEnd : fifteenEnd}
          />
        </Form.Item>
        <Form.Item>
          <Row justify="center">
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={calc.loading}>
                运行
              </Button>
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
}
