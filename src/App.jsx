import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { isUserLoggedIn } from './store/auth-actions';
import { getTheme } from './store/ui-actions';

import ProtectedRouteIsAuth from './ProtectedRouteIsAuth';
import ProtectedRouteIsUser from './ProtectedRouteIsUser';
import RootLayout from './RootLayout';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import CoinDetails from './components/coinDetails/CoinDetails';
import NewCoins from './components/coinViews/newCoins/NewCoins';
import TopHundred from './components/coinViews/topHundred/TopHundred';
import CryptoConverter from './components/cryptoConverter/CryptoConverter';
import Home from './components/home/Home';
import Portfolio from './components/portfolio/Portfolio';
import Profile from './components/profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <ProtectedRouteIsUser>
            <Login />
          </ProtectedRouteIsUser>
        )
      },
      {
        path: '/register',
        element: (
          <ProtectedRouteIsUser>
            <Register />
          </ProtectedRouteIsUser>
        )
      },
      {
        path: '/top-hundred',
        element: <TopHundred />
      },
      {
        path: '/new-coins',
        element: <NewCoins />
      },
      {
        path: '/coin-details/:id',
        element: <CoinDetails />
      },
      {
        path: '/crypto-converter',
        element: <CryptoConverter />
      },
      {
        path: '/portfolio',
        element: (
          <ProtectedRouteIsAuth>
            <Portfolio />
          </ProtectedRouteIsAuth>
        )
      },
      {
        path: '/profile',
        element: (
          <ProtectedRouteIsAuth>
            <Profile />
          </ProtectedRouteIsAuth>
        )
      }
    ]
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserLoggedIn());
    dispatch(getTheme());
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
