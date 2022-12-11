import { createSlice } from "@reduxjs/toolkit";

const checkOutSlice = createSlice({
    name: "checkout",
    initialState: {
        address: {},
        payment: {}
    },
    reducers: {
        updateAddress(state, action) {
            const { payload } = action;
            state.address = { ...state.address, ...payload }
        },
        updatePayment(state, action) {
            const { payload } = action;
            state.payment = { ...state.payment, ...payload }
        },
        clearCheckoutInfo(state) {
            // state.address = {};
            state.payment = {};
        }
    }
})

export const { updateAddress, updatePayment, clearCheckoutInfo } = checkOutSlice.actions;
export default checkOutSlice.reducer;