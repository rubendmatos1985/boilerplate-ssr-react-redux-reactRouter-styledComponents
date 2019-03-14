import React from 'react';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Home from './pages/Home';

export default [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/contacts',
    component: Contacts
  },
  {
    path: '/about',
    component: About
  }
]