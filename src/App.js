import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Discovery from './views/Discovery/Index'
import LazyLoad from './components/common/LazyLoad';
import My from './views/My'
import Friends from './views/Friends'
import Index from './views/Index';
import Recommend from './views/Discovery/Recmmend';
import Rank from './views/Discovery/Rank';
import PageNotFound from './views/404';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Index>
          <Switch> {/* Child of Index */}
            <Route exact path="/my" component={My}></Route>
            <Route exact path="/friends" component={Friends}></Route>
            <Route path="/">
              {/* 发现音乐模版 */}
              <Discovery>
                <Switch> {/* Child of Discovery */}
                  <Route exact path="/" component={Recommend}></Route>
                  <Route exact path="/rank" component={Rank}></Route>
                  <Route exact path="/playlist/:id" component={LazyLoad(()=>import('./views/Common/PlayList'))}></Route>
                  <Route exact path="/album/:id" component={LazyLoad(()=>import('./views/Common/Album'))}></Route>
                  <Route exact path="/song/:id" component={LazyLoad(()=>import('./views/Common/Song'))}></Route>
                  <Route exact path="/artist/:id" component={LazyLoad(()=>import('./views/Common/Artist'))}></Route>
                  <Route exact path="/mv/:id" component={LazyLoad(()=>import('./views/Common/MV'))}></Route>
                  <Route exact path="/user/:id" component={LazyLoad(()=>import('./views/Common/User'))}></Route>
                  <Route component={PageNotFound}></Route>
                </Switch>
              </Discovery>
            </Route>
          </Switch>
        </Index>
      </HashRouter>
    );
  }
}

export default App;
