import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTopThree } from '../../store/crypto-actions';
import CryptoCard from './CryptoCard';

import logo from '../../assets/logo-no-background.svg';
import classes from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const topThree = useSelector(state => state.crypto.topThree);

  useEffect(() => {
    dispatch(getTopThree());
  }, []);

  return (
    <section className={classes.container}>
      <img src={logo} alt="Site logo" className={classes.logo} />
      <h1 className={classes.title}>Track your crypto gains!</h1>
      <div className={classes['card-wrapper']}>
        {topThree.map(c => <CryptoCard key={c.id} {...c} />)}
      </div>
    </section>
  );
};

export default Home;