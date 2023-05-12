import { store } from './store';
import { uiActions } from './ui';

export const getTheme = () => {
  return (dispatch) => {
    const theme = localStorage.getItem('theme');
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