import React from 'react';
import './App.css';
import NewUser from './containers/SignUp';
import Login from "./containers/Login";
import GetData from './containers/Home';
import PostImage from './containers/PostImage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'

const PageNotFound = () => {
  return (
    <h1>404 !</h1>
  )
}

function App() {

  return (
    <Router>


      <Nav />

      <Switch>
        <Route path="/signup" component={NewUser} />
        <Route path="/login" component={Login} />
        <Route path="/post" component={PostImage} />
        <Route path="/" exact component={GetData} />
        <Route component={PageNotFound} />
      </Switch>


      <span className="text-gray-300 block text-center mb-16">2021. Developed by Khaled Muwahed. MMU.</span>

    </Router>
  );
}

export default App;


