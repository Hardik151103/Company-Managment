import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, headers } from "../../Constant";

export const getCardsData = () => (dispatch) => {
    axios.get(`${baseUrl}/dashboard/getCardsData`,headers).then((res) => {
        dispatch(setValue(res.data.data))
    })
}

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        value : []
    },
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setValue } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer