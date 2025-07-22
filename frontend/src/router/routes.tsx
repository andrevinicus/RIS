import React from 'react';
import Login from '../pages/login/Login';
import HomeScreenWrapper from '../pages/home/HomeScreenWrapper';


export const routes = [
  { path: '/login', element: <Login /> },
  { path: '/home', element: <HomeScreenWrapper />, protected: true },
  { path: '*', element: <Login /> },
];
