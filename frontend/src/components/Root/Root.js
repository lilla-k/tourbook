import './Root.css';
import '@fontsource/roboto/700.css';
import tripService from '../../services/tripService.js'
import Header from '../Header/Header.js';
import Loading from '../Loading/Loading.js';
import { Outlet } from "react-router-dom";
import {useState, useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';


function Root({user}) {

  const [trips, setTrips]= useState([]);
  const [loading, setLoading] = useState(true);
  const [toaster, setToaster] = useState("");

  useEffect(() => {
    (async () => {
      const trips = await tripService.getTrips(user.uid);
      setTrips(trips);
      setLoading(false);
    })();
  }, [user])


  return (
    <div className="Root">
      <Header />
      {loading && <Loading/>}
      {!loading && <Outlet context={{trips, setTrips, toaster, setToaster, userId: user.uid}}/>}  
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
