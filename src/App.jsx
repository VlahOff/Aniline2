import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { isUserLoggedIn } from './store/auth-actions';
import { getTheme } from './store/ui-actions';

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
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
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
        element: <Portfolio />
      },
      {
        path: '/profile',
        element: <Profile />
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
