'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from './actions/uiActions';

const ThemeProvider = ({ children, className }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTheme());
	}, []);

	const theme = useSelector(state => state.ui.theme);

	return (
		<body
			className={className}
			data-theme={theme}
		>
			{children}
		</body>
	);
};

export default ThemeProvider;
