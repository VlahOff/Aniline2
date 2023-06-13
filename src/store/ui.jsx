import { createSlice } from '@reduxjs/toolkit';

const parseError = (error) => {
  let message = '';
  switch (error) {
    case 'EMAIL_SENT':
      message = 'Email was sent.';
      break;
    case 'TICKET_EXPIRED':
      message = 'Reset password ticket has expired.';
      break;
    case 'EMAIL_TAKEN':
      message = 'This email is taken.';
      break;
    case 'USERNAME_TAKEN':
      message = 'This username is taken.';
      break;
    case 'INVALID_EMAIL':
      message = 'This emails is invalid';
      break;
    case 'USERNAME_INVALID_LENGTH':
      message = 'Username length must be between 3 and 30 characters long.';
      break;
    case 'INVALID_CREDENTIALS':
      message = 'Invalid email or password.';
      break;
    case 'Too Many Requests':
      message = 'Too Many Requests.';
      break;
    case 'NO_USER':
      message = 'You have to be logged in!';
      break;
    case 'INVALID_TOKEN':
      message = 'User token is invalid!';
      break;

    default:
      message = error.message || 'An error has occurred!';
      break;
  }
  return message;
};

const initialState = {
  theme: 'light',
  errorMessage: '',
  isErrorShown: false,
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = parseError(action.payload);
      state.isErrorShown = true;
    },
    hideErrorNotification(state) {
      state.errorMessage = '';
      state.isErrorShown = false;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
