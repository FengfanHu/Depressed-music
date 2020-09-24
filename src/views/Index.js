import React from 'react';
import { Layout } from 'antd';
import './Index.scss';
import HeaderContent from '../components/layout/Header';
const { Header } = Layout;

function App(props) {
  return (
    <Layout className="layout">
      <Header className="header-wrap">
        <HeaderContent></HeaderContent>
      </Header>
      <Layout className="content-wrap">
        { props.children}
      </Layout>
    </Layout>
  );
}

export default App;
