import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CssBaseline, Grid } from '@material-ui/core';

import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import SignIn from './containers/SignIn';
import TestLoginForm from './containers/LoginTest';
import NewUser from './containers/SignUp';
import Login from "./containers/Login";
import GetData from './containers/Home';

import Navigation from './components/Navigation'

import { AppBar , Avatar, Toolbar} from '@material-ui/core';


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Nav from './components/Nav'
import { Home } from '@material-ui/icons';

import { withRouter } from 'react-router-dom';

//
const container = {
  flex: 1,
  flexDirection: "column"
};

const divStyle = {
  position: 'absolute',
  bottom: 0,
  width: "100%"

};
const styles = {
  //height: '100vh',
  overflow: "auto",
  textAlign: "center",
  marginTop: 50
};
const BottomBarStyle = {
  position: 'fixed',
  bottom: 0,
  width: "100%",
  marginTop: 20

};
const PageNotFound = () =>{
  return(
  <h1>404 !</h1>
  )
}


// <Login/> fully working ***
function App() {
  // const [tab, setTab] = useState(0);
  //  <BottomNav value = {tab} onChange = {setTab}/>
  return (
    <Router>
      
      <div style={container}>
        <Grid container direction="column">
          
          <div style={styles}>
            
            <Nav  />

           
            <Switch>
            <Route path="/signup" component = {NewUser} />
            <Route path="/login" component = {Login} />
            <Route path="/" exact component = {GetData} />
            <Route component={PageNotFound}/>
            </Switch>
            


          </div>

          <div style={BottomBarStyle}>
            <Navigation/>

  
          <BottomNav />

          </div>
        </Grid>
        
        <CssBaseline />
        
      </div>
    </Router>
  );
}

export default App;


