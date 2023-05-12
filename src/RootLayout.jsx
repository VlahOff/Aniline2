import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import { useSelector } from 'react-redux';
import classes from './RootLayout.module.css';

const RootLayout = () => {
  const theme = useSelector(state => state.ui.theme);

  return (
    <div data-theme={theme} className={classes.main}>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default RootLayout;