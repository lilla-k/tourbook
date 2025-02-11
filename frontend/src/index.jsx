import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from './components/Root/Root.jsx';
import Auth from './components/Auth/Auth.jsx';
import GoogleMapsPage from './components/GoogleMapsPage/GoogleMapsPage.jsx';
import TripPage from './components/TripPage/TripPage.jsx';
import TripsPage from './components/TripsPage/TripsPage.jsx';
import NewEditTripPage from './components/NewEditTripPage/NewEditTripPage.jsx';
import NewEditCityPage from './components/NewEditCityPage/NewEditCityPage.jsx';
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import GalleryPage from "./components/GalleryPage/GalleryPage.jsx";
import ProfilePage from './components/ProfilePage/ProfilePage.jsx';
import EditProfilePage from './components/EditProfilePage/EditProfilePage.jsx';
import { ThemeProvider } from '@mui/material';
import { theme } from './utils/theme.js';




const router = createBrowserRouter([
  {
    path: "/",
    element: <ThemeProvider theme={theme}><Auth><Root/></Auth></ThemeProvider>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <GoogleMapsPage />,
      },
      {
        path: "users/:userId",
        element: <ProfilePage />,
      },
      {
        path: "users/:userId/edit",
        element: <EditProfilePage />,
      },
      {
        path: "trips",
        element: <TripsPage />,
      },
      {
        path: "trips/:tripId",
        element: <TripPage />,
      },
      {
        path: "trips/:tripId/:cityId",
        element: <TripPage />,
      },
      {
        path: "addTrip",
        element: <NewEditTripPage />,
      },
      {
        path: "trips/:tripId/addCity",
        element: <NewEditCityPage />,
      },
      {
        path: "trips/:tripId/edit",
        element: <NewEditTripPage />,
      },
      {
        path: "trips/:tripId/:cityId/edit",
        element: <NewEditCityPage />,
      },
      {
        path: "trips/:tripId/gallery/:imageId",
        element: <GalleryPage />,
      },

    ],
  },
], { basename: import.meta.env.PUBLIC_URL });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);


