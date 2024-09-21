import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root/Root';
import Auth from './components/Auth/Auth';
import GoogleMaps from './components/GoogleMaps/GoogleMaps.js';
import Trip from './components/Trip/Trip.js';
import Trips from './components/Trips/Trips.js';
import NewEditTripForm from './components/NewEditTripForm/NewEditTripForm.js';
import NewEditCityForm from './components/NewEditCityForm/NewEditCityForm.js';
import ErrorPage from "./components/ErrorPage/ErrorPage.js";
import GalleryPage from "./components/GalleryPage/GalleryPage.js";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth><Root/></Auth>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <GoogleMaps />,
      },
      {
        path: "trips",
        element: <Trips />,
      },
      {
        path: "trips/:tripId",
        element: <Trip />,
      },
      {
        path: "trips/:tripId/:cityId",
        element: <Trip />,
      },
      {
        path: "addTrip",
        element: <NewEditTripForm />,
      },
      {
        path: "trips/:tripId/addCity",
        element: <NewEditCityForm />,
      },
      {
        path: "trips/:tripId/edit",
        element: <NewEditTripForm />,
      },
      {
        path: "trips/:tripId/:cityId/edit",
        element: <NewEditCityForm />,
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


