import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root/Root';
import Auth from './components/Auth/Auth';
import GoogleMapsPage from './components/GoogleMapsPage/GoogleMapsPage.js';
import TripPage from './components/TripPage/TripPage.js';
import TripsPage from './components/TripsPage/TripsPage.js';
import NewEditTripPage from './components/NewEditTripPage/NewEditTripPage.js';
import NewEditCityPage from './components/NewEditCityPage/NewEditCityPage.js';
import ErrorPage from "./components/ErrorPage/ErrorPage.js";
import GalleryPage from "./components/GalleryPage/GalleryPage.js";
import ProfilePage from './components/ProfilePage/ProfilePage.js';
import EditProfilePage from './components/EditProfilePage/EditProfilePage.js';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth><Root/></Auth>,
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
], { basename: process.env.PUBLIC_URL });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);


