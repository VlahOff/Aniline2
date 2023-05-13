import { store } from './store';
import { uiActions } from './ui';

export const getTheme = () => {
  return (dispatch) => {
    const deviceTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = localStorage.getItem('theme');

    if (!theme) {
      dispatch(uiActions.setTheme(deviceTheme ? 'dark' : 'light'));
      localStorage.setItem('theme', deviceTheme ? 'dark' : 'light');
      return;
    }

    dispatch(uiActions.setTheme(theme));
  };
};

export const toggleTheme = () => {
  return (dispatch) => {
    const themeMode = store.getState().ui.theme;

    dispatch(uiActions.setTheme(themeMode === 'light' ? 'dark' : 'light'));
    localStorage.setItem('theme', themeMode === 'light' ? 'dark' : 'light');
  };
};