import { Left } from '@components/left';
import { Right } from '@components/right';
import { Result } from '@components/result';
import { Layout } from 'antd';

const { Sider, Content } = Layout;

function App() {
  return (
    <div className="stl-full__screen">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="light" width="25%">
          <Left></Left>
        </Sider>
        <Layout>
          <Content>
            <Right></Right>
          </Content>
        </Layout>
      </Layout>
      <Result></Result>
    </div>
  );
}

export default App;
