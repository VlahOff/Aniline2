import { useEffect } from 'react';

import classes from './LoadingSpinner.module.css';

const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};

const Loader = () => {
  return (
    <div className={classes.wrapper}>
      <span className={classes.loader}></span>
    </div>
  );
};


const LoadingSpinner = (props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  });

  return (
    <>
      <Backdrop />
      <Loader />
    </>
  );
};

export default LoadingSpinner;