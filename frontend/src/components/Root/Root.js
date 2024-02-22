import './Root.css';
import '@fontsource/roboto/700.css';
import Header from '../Header/Header.js';
import { Outlet } from "react-router-dom";
import {useState, useEffect} from 'react';

function Root() {

  const [trips, setTrips]= useState([]);

  useEffect(() => { 
    console.log("trip initial render");
    console.log(trips)
    getTrips();
  },[])

  async function getTrips(){
    const response= await fetch("http://localhost:3001/api/trips");
    const trips= await response.json();
    console.log(trips);
    setTrips(trips);
  }

  return (
    <div className="Root">
      <Header/>
      <Outlet context={trips}/>
    </div>
  );
}

export default Root;
