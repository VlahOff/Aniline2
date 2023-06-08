import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import ProtectedRouteIsAuth from './ProtectedRouteIsAuth';
import ProtectedRouteIsUser from './ProtectedRouteIsUser';
import PageNotFound from './components/404page/PageNotFound';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import CoinDetails from './components/coinDetails/CoinDetails';
import NewCoins from './components/coinViews/newCoins/NewCoins';
import TopHundred from './components/coinViews/topHundred/TopHundred';
import CryptoConverter from './components/cryptoConverter/CryptoConverter';
import Home from './components/home/Home';
import Portfolio from './components/portfolio/Portfolio';
import Profile from './components/profile/Profile';
import Search from './components/search/Search.jsx';
import { store } from './store/store.jsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: (
          <ProtectedRouteIsUser>
            <Login />
          </ProtectedRouteIsUser>
        ),
      },
      {
        path: '/register',
        element: (
          <ProtectedRouteIsUser>
            <Register />
          </ProtectedRouteIsUser>
        ),
      },
      {
        path: '/top-hundred',
        element: <TopHundred />,
      },
      {
        path: '/new-coins',
        element: <NewCoins />,
      },
      {
        path: '/coin-details/:id',
        element: <CoinDetails />,
      },
      {
        path: '/crypto-converter',
        element: <CryptoConverter />,
      },
      {
        path: '/portfolio',
        element: (
          <ProtectedRouteIsAuth>
            <Portfolio />
          </ProtectedRouteIsAuth>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRouteIsAuth>
            <Profile />
          </ProtectedRouteIsAuth>
        ),
      },
      {
        path: '/search',
        element: <Search />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
  // </React.StrictMode>
);
