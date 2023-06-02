import { Route, Routes } from 'react-router-dom';

import ProtectedRouteIsAuth from './ProtectedRouteIsAuth';
import ProtectedRouteIsUser from './ProtectedRouteIsUser';
import PageNotFound from './components/404page/PageNotFound';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import CoinDetails from './components/coinDetails/CoinDetails';
import NewCoins from './components/coinViews/newCoins/NewCoins';
import TopHundred from './components/coinViews/topHundred/TopHundred';
import CryptoConverter from './components/cryptoConverter/CryptoConverter';
import Home from './components/home/Home';
import Portfolio from './components/portfolio/Portfolio';
import Profile from './components/profile/Profile';

const RouterOutlet = () => {
  return (
    <Routes>
      <Route path='*' element={<PageNotFound />} />
      <Route path='/' element={<Home />} />
      <Route path='/login' element={
        <ProtectedRouteIsUser>
          <Login />
        </ProtectedRouteIsUser>
      } />
      <Route path='/register' element={
        <ProtectedRouteIsUser>
          <Register />
        </ProtectedRouteIsUser>
      } />
      <Route path='/top-hundred' element={<TopHundred />} />
      <Route path='/new-coins' element={<NewCoins />} />
      <Route path='/coin-details/:id' element={<CoinDetails />} />
      <Route path='/crypto-converter' element={<CryptoConverter />} />
      <Route path='/portfolio' element={
        <ProtectedRouteIsAuth>
          <Portfolio />
        </ProtectedRouteIsAuth>
      } />
      <Route path='/profile' element={
        <ProtectedRouteIsAuth>
          <Profile />
        </ProtectedRouteIsAuth>
      } />
    </Routes>
  );
};

export default RouterOutlet;