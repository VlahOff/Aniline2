import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import ProtectedRouteFromAuth from './ProtectedRouteFromAuth.jsx';
import ProtectedRouteIsAuth from './ProtectedRouteIsAuth.jsx';
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner.jsx';
import Home from './pages/home/Home.jsx';
import { isUserLoggedIn } from './store/auth-actions.jsx';
import { store } from './store/store.jsx';

import './index.css';

const PageNotFound = lazy(() => import('./pages/404page/PageNotFound.jsx'));
const CoinDetails = lazy(() => import('./pages/coinDetails/CoinDetails.jsx'));
const CryptoConverter = lazy(() =>
	import('./pages/cryptoConverter/CryptoConverter.jsx')
);
const Login = lazy(() => import('./pages/login/Login.jsx'));
const NewCoins = lazy(() => import('./pages/newCoins/NewCoins.jsx'));
const Portfolio = lazy(() => import('./pages/portfolio/Portfolio.jsx'));
const Profile = lazy(() => import('./pages/profile/Profile.jsx'));
const Register = lazy(() => import('./pages/register/Register.jsx'));
const ResetPassword = lazy(() =>
	import('./pages/resetPassword/ResetPassword.jsx')
);
const Search = lazy(() => import('./pages/search/Search.jsx'));
const TopHundred = lazy(() => import('./pages/topHundred/TopHundred.jsx'));

store.dispatch(isUserLoggedIn());

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <PageNotFound />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/login',
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<ProtectedRouteFromAuth>
							<Login />
						</ProtectedRouteFromAuth>
					</Suspense>
				),
			},
			{
				path: '/register',
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<ProtectedRouteFromAuth>
							<Register />
						</ProtectedRouteFromAuth>
					</Suspense>
				),
			},
			{
				path: '/reset-password/:userId',
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<ProtectedRouteFromAuth>
							<ResetPassword />
						</ProtectedRouteFromAuth>
					</Suspense>
				),
			},
			{
				path: '/top-hundred',
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<TopHundred />
					</Suspense>
				),
			},
			{
				path: '/new-coins',
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<NewCoins />
					</Suspense>
				),
			},
			{
				path: '/coin-details/:id',
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<CoinDetails />
					</Suspense>
				),
			},
			{
				path: '/crypto-converter',
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<CryptoConverter />
					</Suspense>
				),
			},
			{
				path: '/portfolio',
				action: () => {
					store.dispatch(isUserLoggedIn());
				},
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<ProtectedRouteIsAuth>
							<Portfolio />
						</ProtectedRouteIsAuth>
					</Suspense>
				),
			},
			{
				path: '/profile',
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<ProtectedRouteIsAuth>
							<Profile />
						</ProtectedRouteIsAuth>
					</Suspense>
				),
			},
			{
				path: '/search',
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<Search />
					</Suspense>
				),
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
	<Provider store={store}>
		<RouterProvider router={router}>
			<App />
		</RouterProvider>
	</Provider>
	// </React.StrictMode>
);
