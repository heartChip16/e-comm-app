import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// const cart = useSelector(state => state.cart?.value);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: []
    },
    reducers: {
        addToCart(state, action) {
            console.log("Action: ", action);
            console.log("State: ", state);
            const { product, quantity } = action.payload;
            const existingItem = state.value.find(({ product: prod }) => prod.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;     //amazing part here; updates value of quantity in the cart
            } else {
                state.value.push(action.payload);
            }

        },
        removeFromCart(state, action) {
            const { product, quantity } = action.payload;
            const existingItem = state.value.find(({ product: prod }) => prod.id === product.id);
            const index = state.value.findIndex(({ product: prod }) => prod.id === product.id);
            if (existingItem && (existingItem.quantity > 1)) {
                existingItem.quantity -= 1;     //amazing part here; updates value of quantity in the cart
            } else {
                state.value.splice(index, 1);
            }
        }

    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;