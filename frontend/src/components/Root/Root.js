import './Root.css';
import '@fontsource/roboto/700.css';
import Header from '../Header/Header.js';
import Loading from '../Loading/Loading.js';
import { Outlet } from "react-router-dom";
import {useState, useEffect} from 'react';

function Root() {
  console.log("root");

  const [trips, setTrips]= useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {                     //mi lenne ha nem lenne useEffect-ben? trips dependency?
    console.log("trip initial render");
    console.log(trips)
    getTrips();
  },[])

  async function getTrips(){
    const response= await fetch("http://localhost:3001/api/trips");
    const trips= await response.json();
    console.log(trips);
    setTrips(trips);
    setLoading(false);
  }
//loading state-ig ne töltsön be az Outlet
  return (
    <div className="Root">
      <Header/>
      {loading && <Loading/>}
      {!loading && <Outlet context={trips}/>}
    </div>
  );
}

export default Root;
