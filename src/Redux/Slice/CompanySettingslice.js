import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, headers } from "../../Constant";

export const getCompanySetting = () => (dispatch) => {
    axios.get(`${baseUrl}/company/getYourDetail`,headers).then((res) => {
        dispatch(setValue(res.data.data))
    })
}


export const updateCompanySetting = (data) => (dispatch) => {
    axios.post(`${baseUrl}/company/update`, data ,headers).then((res) => {
        dispatch(getCompanySetting())
    })
}


export const companySettingSlice = createSlice({
    name: "companySetting",
    initialState: {
        value : {}
    },
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setValue } = companySettingSlice.actions;
export const companySettingReducer = companySettingSlice.reducer