import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import Card from '../card/Card';
import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const portal = document.getElementById('overlays');

const Modal = (props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  });

  const styles = `${classes.modal} ${props.className}`;

  return (
    <>
      {createPortal(<Backdrop onClose={props.onClose} />, portal)}
      {createPortal(<Card className={styles}>{props.children}</Card>, portal)}
    </>
  );
};

export default Modal;