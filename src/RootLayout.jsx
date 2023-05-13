import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import ErrorNotification from './components/UI/errorNotification/ErrorNotification';
import LoadingSpinner from './components/UI/loadingSpinner/LoadingSpinner';
import Navigation from './components/navigation/Navigation';

import classes from './RootLayout.module.css';

const RootLayout = () => {
  const isLoading = useSelector(state => state.ui.isLoading);
  const theme = useSelector(state => state.ui.theme);

  return (
    <main data-theme={theme} className={classes.main}>
      <ErrorNotification />
      {isLoading && <LoadingSpinner />}
      <Navigation />
      <Outlet />
    </main>
  );
};

export default RootLayout;