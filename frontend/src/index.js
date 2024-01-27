import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root/Root';
import GoogleMaps from './components/GoogleMaps/GoogleMaps.js';
import Tour from './components/Tour/Tour.js';
import Tours from './components/Tours/Tours.js';

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
        path: "tours",
        element: <Tours />,
      },
      {
        path: "tours/:tourId",
        element: <Tour />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);


