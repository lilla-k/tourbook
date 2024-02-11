import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root/Root';
import GoogleMaps from './components/GoogleMaps/GoogleMaps.js';
import Trip from './components/Trip/Trip.js';
import Trips from './components/Trips/Trips.js';
import NewTripForm from './components/NewTripForm/NewTripForm.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
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
        element: <Trip/>,
      },
      {
        path: "trips/:tripId/:city",
        element: <Trip />,
      },
      {
        path: "addTrip",
        element: <NewTripForm />,
      }
    ],
  },
], { basename: process.env.PUBLIC_URL });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);


