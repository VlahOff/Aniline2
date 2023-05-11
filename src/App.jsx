import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './RootLayout';
import Home from './components/Home/Home';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { isUserLoggedIn } from './store/auth-actions';
import TopHundred from './components/CoinViews/TopHundred/TopHundred';
import NewCoins from './components/CoinViews/NewCoins/NewCoins';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, []);

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
        }
      ]
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
