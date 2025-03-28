import { Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import tripService from '../../services/tripService.js';
import userService from '../../services/userService.js';
import Header from '../Header/Header.jsx';
import Loading from '../Loading/Loading.jsx';

import './Root.css';
import '@fontsource/roboto/700.css';
import type { User, UserSettings } from '../../types/user';
import type { Trip } from '../../types/trip';

function Root({ user }: { user: User }) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [toaster, setToaster] = useState('');
  const [userSettings, setUserSettings] = useState<UserSettings>({});
  const [mapCamera, setMapCamera] = useState({ zoom: 2.4, center: { lat: 40, lng: 10 } });

  useEffect(() => {
    (async () => {
      const [tripsFromDB, userSettingsFromDB] = await Promise.all([tripService.getTrips(user.uid), userService.getUser(user.uid)]);
      setTrips(tripsFromDB);
      setUserSettings(userSettingsFromDB);

      setMapCamera((camera) => ({
        ...camera,
        center: {
          lat: userSettingsFromDB?.location?.lat || camera.center.lat,
          lng: userSettingsFromDB?.location?.lng || camera.center.lng,
        },
      }));
      setLoading(false);
    })();
  }, [user]);

  return (
    <div className="Root">
      <Header />
      <div className="Root-outlet">
        {loading && <Loading />}
        {!loading && (
        <Outlet context={{
          trips, setTrips, toaster, setToaster, userData: { ...user, ...userSettings }, setUserSettings, mapCamera, setMapCamera,
        }}
        />
        )}
      </div>
      <Snackbar
        open={toaster !== ''}
        autoHideDuration={2000}
        onClose={() => setToaster('')}
        message={toaster}
      />
    </div>
  );
}

export default Root;
