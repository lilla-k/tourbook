import './Root.css';
import '@fontsource/roboto/700.css';
import tripService from '../../services/tripService.js'
import Header from '../Header/Header.js';
import Loading from '../Loading/Loading.js';
import { Outlet } from "react-router-dom";
import {useState, useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';


function Root() {
  console.log("root");

  const [trips, setTrips]= useState([]);
  const [loading, setLoading] = useState(true);
  const [toaster, setToaster] = useState("");

  useEffect(() => {
    getTrips();
  },[])

  async function getTrips(){
    const trips = await tripService.getTrips();
    setTrips(trips);
    setLoading(false);
  }

// nem én hoztam létre Outletet, nem tudom milyen propjai lehetnek, doksi alapján context
  return (
    <div className="Root">
      <Header/>
      {loading && <Loading/>}
      {!loading && <Outlet context={[trips, setTrips, toaster, setToaster]}/>}  
      <Snackbar
        open={toaster===""?false:true}
        autoHideDuration={2000}
        onClose={()=>setToaster("")}
        message={toaster}
      />  
    </div>
  );
}

export default Root;
