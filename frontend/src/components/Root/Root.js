import './Root.css';
import '@fontsource/roboto/700.css';
import tripService from '../../services/tripService.js'
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
    const trips = await tripService.getTrips();
    console.log(trips)
    setTrips(trips);
    setLoading(false);
  }

  console.log(trips)

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
