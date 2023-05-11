import { useDispatch, useSelector } from 'react-redux';
import CoinDataTable from '../CoinDataTable/CoinDataTable';
import { useEffect } from 'react';
import { getNewCoins } from '../../../store/crypto-actions';

const NewCoins = () => {
  const dispatch = useDispatch();
  const newCoins = useSelector(state => state.crypto.newCoins);

  useEffect(() => {
    dispatch(getNewCoins());
  }, []);

  return (
    <>
      <h1>New Coins</h1>
      <CoinDataTable coinData={newCoins} />
    </>
  );
};

export default NewCoins;