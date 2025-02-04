import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import tripService from '../../services/tripService.js';
import userService from '../../services/userService.js';
import Header from '../Header/Header.js';
import Loading from '../Loading/Loading.js';

import Snackbar from '@mui/material/Snackbar';

import './Root.css';
import '@fontsource/roboto/700.css';

function Root({ user }) {

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toaster, setToaster] = useState("");
  const [userData, setUserData] = useState({});
  const [mapCamera, setMapCamera] = useState({zoom: 2.4, center: { lat: 40, lng: 10 }});
  console.log(mapCamera)

  useEffect(() => {
    (async () => {
      const [trips, userData] = await Promise.all([tripService.getTrips(user.uid), userService.getUser(user.uid)]);
      setTrips(trips);
      setUserData(userData);
      setMapCamera({...mapCamera, center: {lat: userData.location.lat, lng: userData.location.lng}});
      setLoading(false);
    })();
  }, [user])


  return (
    <div className="Root">
      <Header />
      <div className="Root-outlet">
        {loading && <Loading />}
        {!loading && <Outlet context={{ trips, setTrips, toaster, setToaster, user: {...user, ...userData }, setUserData, mapCamera, setMapCamera}} />}
      </div>
      <Snackbar
        open={toaster === "" ? false : true}
        autoHideDuration={2000}
        onClose={() => setToaster("")}
        message={toaster}
      />
    </div>
  );
}

export default Root;
