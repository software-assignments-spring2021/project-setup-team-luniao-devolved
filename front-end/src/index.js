import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './index.css';
import Login from './Login';

ReactDOM.render(
  <Router>
       <Switch>
		      <Route exact path="/" component={Login}/>
	    </Switch>
  </Router>,
  document.getElementById('root')
);