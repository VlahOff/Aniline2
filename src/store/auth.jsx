import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isChangeUsernameModalOpen: false,
  isChangePasswordModalOpen: false,
  isDeleteAccountModalOpen: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    toggleChangeUsernameModal(state) {
      state.isChangeUsernameModalOpen = !state.isChangeUsernameModalOpen;
    },
    toggleChangePasswordModal(state) {
      state.isChangePasswordModalOpen = !state.isChangePasswordModalOpen;
    },
    toggleDeleteAccountModal(state) {
      state.isDeleteAccountModalOpen = !state.isDeleteAccountModalOpen;
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice;