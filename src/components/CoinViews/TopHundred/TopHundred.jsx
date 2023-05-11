import { useDispatch, useSelector } from 'react-redux';
import classes from './TopHundred.module.css';
import { useEffect } from 'react';
import { getTopHundred } from '../../../store/crypto-actions';
import CoinDataTable from '../CoinDataTable/CoinDataTable';
import Card from '../../UI/Card/Card';

const TopHundred = () => {
  const dispatch = useDispatch();
  const topHundred = useSelector(state => state.crypto.topHundred);

  useEffect(() => {
    dispatch(getTopHundred());
  }, []);

  return (
    <>
      <h1>Top Hundred</h1>
      <Card>
        <CoinDataTable coinData={topHundred} />
      </Card>
    </>
  );
};

export default TopHundred;
