import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  /*
  cart: [
    {
      pizzaId: 12,
      name: 'Mediterranean',
      quantity: 1,
      unitPrice: 16,
      totalPirce: 32,
    },
  ],
  */
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // Payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // selecting the item from the cart first
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPirce = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // selecting the item from the cart first
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPirce = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  addItem,
  deleteItem,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPirce, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
