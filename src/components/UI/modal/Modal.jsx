import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import Card from '../card/Card';
import classes from './Modal.module.css';

const Backdrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose}></div>;
};

const portal = document.getElementById('overlays');

const Modal = ({
  className,
  children,
  onClose
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  });

  const styles = `${classes.modal} ${className}`;

  return (
    <>
      {createPortal(<Backdrop onClose={onClose} />, portal)}
      {createPortal(<Card className={styles}>{children}</Card>, portal)}
    </>
  );
};

export default Modal;