import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Home from './components/Home'
import Protected from './components/Protected'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ManifestHub from './components/ManifestHub';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/home',
    element: <Protected />,
    children: [
      {
        path: '/home/',
        element: <Home />,
        children: [
        ]
      },
      {
        path: '/home/manifests',
        element: <ManifestHub />
      }
    ]
  },
 
])



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router}/>
)
