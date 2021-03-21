import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App";
import Cpoll from "./Cpoll";
import Itinerary from "./Itinerary";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/Cpoll" component={Cpoll} />
      <Route path="/Itinerary" component={Itinerary} />
    </Switch>
  </BrowserRouter>,
  rootElement
);



