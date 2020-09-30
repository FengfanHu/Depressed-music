import React from 'react';
import { Layout } from 'antd';
import './Index.scss';
import HeaderContent from '../components/layout/Header';
import Player from '../components/common/Player';
import PlayList from '../components/common/PlayList';
import { Provider } from 'react-redux';
import store from '../redux/store';

const { Header } = Layout;

function App(props) {
  return (
    <Provider store={store}>
      <Layout className="layout">
        <Header className="header-wrap">
          <HeaderContent></HeaderContent>
        </Header>
        <Layout className="content-wrap">
          { props.children}
        </Layout>
        <PlayList></PlayList>
        <Player></Player>
      </Layout>
    </Provider>
  );
}

export default App;
