import { createSlice } from "@reduxjs/toolkit";

const cartItems = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const initialState = {
  cartItems: cartItems,
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const tempItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (tempItem) {
        const tempCart = state.cartItems.map((item) => {
          if (item._id === action.payload._id) {
            let newQty = item.quantity + action.payload.quantity;
            let newTotalprice = newQty * item.price;

            return {
              ...item,
              quantity: newQty,
              totalPrice: newTotalprice,
            };
          } else {
            return item;
          }
        });
        state.cartItems = tempCart;
        storeInLocalStorage(state.cartItems);
      } else {
        state.cartItems.push(action.payload);
        storeInLocalStorage(state.cartItems);
      }
    },

    updateItem: (state, action) => {
      // const newItem = action.payload;

      state.cartItems.forEach((element, index) => {
        if (element.name === action.payload.name) {
          // const arrayTemp = [...state.value]
          state.cartItems[index] = action.payload;
        }
      });

      storeInLocalStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      console.log("removeID :", action.payload._id);
      const tempCart = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      state.cartItems = tempCart;
      storeInLocalStorage(state.cartItems);
    },

    getCartTotal: (state) => {
      state.price = state.cartItems.reducer((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice);
      }, 0);
      state.totalQuantity = state.cartItems.length;
    },
    clearCart(state, action) {
      state.cartItems = [];
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      storeInLocalStorage(state.cartItems);
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  getCartTotal,
  updateItem,
  toggleCartQty,
  clearCart,
} = cartSlice.actions;
