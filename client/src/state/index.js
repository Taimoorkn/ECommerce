//index.js ~redux store code
import { createSlice } from "@reduxjs/toolkit";
const userData = JSON.parse(localStorage.getItem("user") || "[]");
const currentUserCart = JSON.parse(
  localStorage.getItem(`cart_${userData.userId}`) || "[]"
);
const initialState = {
  currentLoginPath: "",
  isCartOpen: false,
  cart: currentUserCart,
  userId: userData ? userData.userId : null,
  items: [],
  search: "",
  view: "grid_view",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setView: (state, action) => {
      state.view = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      const cartLocalStorage = JSON.parse(
        localStorage.getItem(`cart_${state.userId}`) || "[]"
      );
      state.cart = cartLocalStorage;
    },
    setCartEmpty: (state) => {
      state.cart = [];
      state.userId = null;
    },
    setCurrentLoginPath: (state, action) => {
      state.currentLoginPath = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    addToCart: (state, action) => {
      const newItem = action.payload.item;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.count += newItem.count;
      } else {
        state.cart = [...state.cart, newItem];
      }
      localStorage.setItem(`cart_${state.userId}`, JSON.stringify(state.cart));
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      localStorage.setItem(`cart_${state.userId}`, JSON.stringify(state.cart));
    },

    increaseCount: (state, action) => {
      const { id } = action.payload;
      const itemToUpdate = state.cart.find((item) => item.id === id);

      if (itemToUpdate) {
        //wont work if the find function returned undefined
        itemToUpdate.count += 1;
      }
      localStorage.setItem(`cart_${state.userId}`, JSON.stringify(state.cart));
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
      localStorage.setItem(`cart_${state.userId}`, JSON.stringify(state.cart));
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setView,
  setCartEmpty,
  setItems,
  setSearch,
  setUserId,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  setCurrentLoginPath,
} = cartSlice.actions;

export default cartSlice.reducer;
