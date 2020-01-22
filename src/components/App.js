import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamShow from './streams/StreamShow';
import StreamList from './streams/StreamList';
import Header from './Header';
import history from '../history';
import StreamEdit from './streams/StreamEdit';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div className='ui container'>
          <Header />
          <Switch>
            <Route path='/' exact component={StreamList} />
            <Route path='/stream/create' component={StreamCreate} />
            <Route path='/stream/edit/:id' component={StreamEdit} />
            <Route path='/stream/delete/:id' exact component={StreamDelete} />
            <Route path='/stream/:id' exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
