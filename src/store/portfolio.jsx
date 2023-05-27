import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allCoinsList: [],
  filteredAllCoinsList: [],
  transactions: [],
  transactionsTotalValue: 0,
  selectedTransaction: {},
  isAddModalShown: false,
  isEditModalShown: false,
  isDeleteModalShown: false
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setAllCoinsList(state, action) {
      state.allCoinsList = action.payload;
    },
    setFilteredAllCoinList(state, action) {
      state.filteredAllCoinsList = action.payload;
    },
    clearFilteredAllCoins(state) {
      state.filteredAllCoinsList = [];
    },
    setTransactions(state, action) {
      const transactions = action.payload;

      state.transactions = transactions;
      state.transactionsTotalValue = transactions
        .reduce((accumulator, current) => {
          return accumulator + current.current_price;
        }, 0);
    },
    toggleAddModal(state) {
      state.isAddModalShown = !state.isAddModalShown;
    },
    toggleEditModal(state) {
      state.isEditModalShown = !state.isEditModalShown;
    },
    toggleDeleteModal(state) {
      state.isDeleteModalShown = !state.isDeleteModalShown;
    }
  }
});

export const portfolioActions = portfolioSlice.actions;

export default portfolioSlice;