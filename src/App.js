import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CssBaseline, Grid } from '@material-ui/core';
import Login from "./containers/Login";
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';

//
const container =  {
  flex: 1,
  flexDirection: "column"
};

const divStyle = {
  //flex : 1,
  
  //flexDirection: 'row',
 // alignItems: "flex-end",
 //justifyContent: "flex-end",
  //alignSelf: "center"
  position: 'absolute',
  bottom:0,
  width:"100%"

    

    


};


function App() {
 // const [tab, setTab] = useState(0);
 //  <BottomNav value = {tab} onChange = {setTab}/>
  return (
    <div style = {container}>
      <Grid container direction="column">
      <TopNav/>
        <div style={styles}>
        
          <Login />
         
        </div>
        
        <div style = {divStyle}>
        <BottomNav />
      
        </div>
      </Grid>
      <CssBaseline />
    </div>
  );
}

export default App;


const styles = {
 
  //height: '100vh',
  overflow: "auto",
  textAlign: "center"
};