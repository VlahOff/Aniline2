import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import ErrorNotification from './components/UI/errorNotification/ErrorNotification';
import LoadingSpinner from './components/UI/loadingSpinner/LoadingSpinner';
import Navigation from './components/navigation/Navigation';
import { isUserLoggedIn } from './store/auth-actions';
import { getTheme } from './store/ui-actions';

import classes from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const theme = useSelector((state) => state.ui.theme);

  useEffect(() => {
    dispatch(isUserLoggedIn());
    dispatch(getTheme());
  }, []);

  return (
    <div data-theme={theme} className={classes.app}>
      <ErrorNotification />
      {isLoading && <LoadingSpinner />}
      <Navigation />
      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
