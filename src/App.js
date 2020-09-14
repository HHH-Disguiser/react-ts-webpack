import React from "react";
import { hot } from "react-hot-loader/root";
import {  Switch, Route, HashRouter} from "react-router-dom";
import Home from "./page/home/index";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/home" component={Home}></Route>
      </Switch>
    </HashRouter> 
  );
}

export default hot(App);
