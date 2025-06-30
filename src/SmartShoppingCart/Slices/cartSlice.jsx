import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  totalCartItems: 0,
  totalCartPrice: 0,
  isItemInCart:{}
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.isItemInCart[action.payload.id] = true;
      state.productList.push(action.payload);
      state.totalCartItems += 1;
      state.totalCartPrice += action.payload.price;
    },

    removeFromCart: (state, action) => {
      for (let i = 0; i < state.productList.length; i++) {
        const item = state.productList[i];
        if (item.id === action.payload) {
          state.totalCartItems -= item.quantity;
          state.totalCartPrice -= item.price * item.quantity;
          break;
        }
      }
      state.isItemInCart[action.payload] = false;
      state.productList = state.productList.filter((item) => item.id !== action.payload);
    },

    updateQuantity: (state, action) => {
      let productIdx;
      let product;
      for (let i = 0; i < state.productList.length; i++) {
        const item = state.productList[i];
        if (item.id === action.payload.id) {
          productIdx = i;
          product = item;
          break;
        }
      }
      action.payload.updateType === "increaseCount"
        ? ((state.productList[productIdx].quantity += 1),
          (state.totalCartItems += 1),
          (state.totalCartPrice += product.price))
        : (product.quantity > 0
        ? ((state.productList[productIdx].quantity -= 1),
          (state.totalCartItems -= 1),
          (state.totalCartPrice -= product.price))
        : "");
    },

    clearCart:(state, action) => {
      state.productList = [];
      state.totalCartItems = 0;
      state.totalCartPrice = 0;
      state.isItemInCart = {};
    }
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
