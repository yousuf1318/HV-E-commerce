
import './App.css'; 
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import React,{ Fragment } from 'react';
import Login from "./componants/auth/Login";
import Register from "./componants/auth/Register";
import Home from "./componants/pages/Home";

function App() {
  return (
  <Fragment>
  <Router>
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/register" component={Register}></Route>
    </Switch>
    
  </Router>
  </Fragment>
  )
}

export default App;
