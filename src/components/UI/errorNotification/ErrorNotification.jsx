import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '../../../store/ui';

import classes from './ErrorNotification.module.css';

const ErrorNotification = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.ui.errorMessage);
  const isErrorShown = useSelector(state => state.ui.isErrorShown);

  useEffect(() => {
    setTimeout(() => {
      dispatch(uiActions.hideErrorNotification());
    }, 5000);
  }, [isErrorShown]);

  return (
    <>
      <div className={`${classes.banner} ${isErrorShown ? classes.show : classes.close}`}>
        <p className={classes.message}>{errorMessage}</p>
      </div>
    </>
  );
};

export default ErrorNotification;