import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allCoinsList: [],
  filteredAllCoinsList: [],
  transactions: [],
  transactionsBalance: 0,
  transactionProfitLoss: 0,
  transactionProfitLossPercent: 0,
  selectedTransaction: {},
  isAddModalShown: false,
  isEditModalShown: false,
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
      state.transactions = action.payload;
    },
    calculateTransactionsValue(state) {
      state.transactionsBalance = state.transactions.reduce(
        (accumulator, current) => {
          return accumulator + current.value;
        },
        0
      );

      state.transactionProfitLoss = state.transactions.reduce(
        (accumulator, current) => {
          return accumulator + current.pnlValue;
        },
        0
      );
    },
    removeTransaction(state, action) {
      state.transactions = state.transactions.filter(
        (t) => t.transactionId !== action.payload
      );
    },
    setSelectedTransaction(state, action) {
      state.selectedTransaction = action.payload;
      state.isEditModalShown = !state.isEditModalShown;
    },
    toggleAddModal(state) {
      state.isAddModalShown = !state.isAddModalShown;
    },
    toggleEditModal(state) {
      state.isEditModalShown = !state.isEditModalShown;
    },
  },
});

export const portfolioActions = portfolioSlice.actions;

export default portfolioSlice;
