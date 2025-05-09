import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Root from './components/Root/Root.jsx';
import Auth from './components/Auth/Auth.js';
import GoogleMapsPage from './components/GoogleMapsPage/GoogleMapsPage.jsx';
import TripPage from './components/TripPage/TripPage.jsx';
import TripsPage from './components/TripsPage/TripsPage.jsx';
import NewEditTripPage from './components/NewEditTripPage/NewEditTripPage.jsx';
import NewEditCityPage from './components/NewEditCityPage/NewEditCityPage.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import GalleryPage from './components/GalleryPage/GalleryPage.jsx';
import ProfilePage from './components/ProfilePage/ProfilePage.jsx';
import EditProfilePage from './components/EditProfilePage/EditProfilePage.jsx';
import theme from './utils/theme.js';

const router = createBrowserRouter([
  {
    path: '/',
    // @ts-ignore
    element: <ThemeProvider theme={theme}><Auth><Root /></Auth></ThemeProvider>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <GoogleMapsPage />,
      },
      {
        path: 'users/:userId',
        element: <ProfilePage />,
      },
      {
        path: 'users/:userId/edit',
        element: <EditProfilePage />,
      },
      {
        path: 'trips',
        element: <TripsPage />,
      },
      {
        path: 'trips/:tripId',
        element: <TripPage />,
      },
      {
        path: 'trips/:tripId/cities/:cityId',
        element: <TripPage />,
      },
      {
        path: 'addTrip',
        element: <NewEditTripPage />,
      },
      {
        path: 'trips/:tripId/addCity',
        element: <NewEditCityPage />,
      },
      {
        path: 'trips/:tripId/edit',
        element: <NewEditTripPage />,
      },
      {
        path: 'trips/:tripId/cities/:cityId/edit',
        element: <NewEditCityPage />,
      },
      {
        path: 'trips/:tripId/gallery/:imageId',
        element: <GalleryPage />,
      },

    ],
  },
], { basename: import.meta.env.BASE_URL });

const div = document.getElementById('root');
if (div) {
  const root = ReactDOM.createRoot(div);
  root.render(<RouterProvider router={router} />);
}
