import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './RootLayout';
import Home from './components/Home/Home';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';

function App() {
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
