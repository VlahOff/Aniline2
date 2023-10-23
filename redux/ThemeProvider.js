'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from './actions/uiActions';

const ThemeProvider = ({ children }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTheme());
	}, []);

	const theme = useSelector(state => state.ui.theme);

	return <div data-theme={theme}>{children}</div>;
};

export default ThemeProvider;
