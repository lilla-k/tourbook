import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import GoogleMaps from './components/GoogleMaps/GoogleMaps.js';
import Tour from './components/Tour/Tour.js';
import Tours from './components/Tours/Tours.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
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


