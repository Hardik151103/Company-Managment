import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, headers } from "../../Constant";

export const loginUser = (data) => (dispatch) => {
    axios.post(`${baseUrl}/company/login`, data).then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('expiresIn', res.data.expiresIn)
        dispatch(setValue(res.data))
    })
}

export const logoutUser = () => (dispatch) => {
    dispatch(setValue({}))
    localStorage.clear();
}
export const loginSlice = createSlice({
    name: "login",
    initialState: {
        token : localStorage.getItem('token'),
        expiresIn: localStorage.getItem('expiresIn')
    },
    reducers: {
        setValue: (state, action) => {
            state.token = action.payload.token
            state.expiresIn = action.payload.expiresIn
        }
    }
})

export const { setValue } = loginSlice.actions;
export default loginSlice.reducer