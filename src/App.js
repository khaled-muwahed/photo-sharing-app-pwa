import React, { useState } from 'react';

import './App.css';
import { CssBaseline, Grid } from '@material-ui/core';

import BottomNav from './components/BottomNav';

import NewUser from './containers/SignUp';
import Login from "./containers/Login";
import GetData from './containers/Home';

import Navigation from './components/Navigation'
import PostImage from './containers/PostImage';




import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Nav from './components/Nav'


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

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(function(reg) {
      console.log("register", reg);
    }).catch(function(err) {
      console.log("err", err);
    });
  }
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
            <Route path="/post" component = {PostImage} />
            <Route path="/" exact component = {GetData} />
            <Route component={PageNotFound}/>
            </Switch>
            


          </div>

          <div style={BottomBarStyle}>
         

  

          </div>
        </Grid>
        
        <CssBaseline />
        
      </div>
    </Router>
  );
}

export default App;


