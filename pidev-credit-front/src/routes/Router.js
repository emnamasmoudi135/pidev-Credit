import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */

const Signup = Loadable(lazy(() => import('../views/auth/Signup')));
const Login = Loadable(lazy(() => import('../views/auth/Login')));
const UserManagement = Loadable(lazy(() => import('../views/userManagment/Profile')));
const Job = Loadable(lazy(() => import('../views/job/Job')));



const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/profile', element: <UserManagement /> },
      { path: '/job', element: <Job /> },

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '/auth/signup', element: <Signup /> },
      { path: '/auth/login', element: <Login /> },

      
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;

