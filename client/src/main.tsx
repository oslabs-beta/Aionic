import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Home from './components/Home'
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
    element: <Home />,
  },
  {
    path: '/home/manifests',
    element: <ManifestHub />
  }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
