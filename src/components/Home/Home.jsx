import { useDispatch, useSelector } from 'react-redux';
import CryptoCard from './CryptoCard';
import { useEffect } from 'react';
import { getTopThree } from '../../store/crypto-actions';
import classes from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const topThree = useSelector(state => state.crypto.topThree);

  useEffect(() => {
    dispatch(getTopThree());
  }, []);

  return (
    <>
      <h1>Welcome to Aniline 2</h1>
      <div className={classes['card-wrapper']}>
        {topThree.map(c => <CryptoCard key={c.id} {...c} />)}
      </div>
    </>
  );
};

export default Home;