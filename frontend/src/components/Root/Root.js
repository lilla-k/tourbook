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

  useEffect(() => {
    getTrips();
  },[])

  async function getTrips(){
    const response= await fetch("http://localhost:3001/api/trips");
    const trips= await response.json();
    console.log(trips);
    setTrips(trips);
    setLoading(false);
  }
// nem én hoztam létre Outletet, nem tudom milyen propjai lehetnek, doksi alapján context
  return (
    <div className="Root">
      <Header/>
      {loading && <Loading/>}
      {!loading && <Outlet context={[trips, setTrips]}/>}    
    </div>
  );
}

export default Root;
