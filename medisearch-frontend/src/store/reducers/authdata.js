// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    name: '',
    email: '',
    token: '',
    userDocID: ''
};

// ==============================|| SLICE - MENU ||============================== //

const authdata = createSlice({
    name: 'authdata',
    initialState,
    reducers: {
        updateLogin(state, action) {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.userDocID = action.payload.useDocID;
        },

        updateLogout(state, action) {
            state.name = '';
            state.email = '';
            state.token = '';
            state.userDocID = '';
        }
    }
});

export default authdata.reducer;

export const { updateLogin, updateLogout } = authdata.actions;
