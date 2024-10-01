import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    value: [],
    loading: false,  
};

const getAuthToken = () => {
    return localStorage.getItem('token'); 
};

export const getManagerApi = () => async (dispatch) => {  
    dispatch(setLoading(true));  
    try {
        const response = await axios.get('https://employee-system-nodejs.vercel.app/api/manager/getAllManager', {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        dispatch(setValue(response.data.data));
    } catch (error) {
        console.error("Error fetching managers:", error);
    } finally {
        dispatch(setLoading(false));  
    }
};

export const AddManagerApi = (data) => async (dispatch) => {
    dispatch(setLoading(true));  
    try {
        await axios.post('https://employee-system-nodejs.vercel.app/api/manager/addManager', data, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        dispatch(getManagerApi());
    } catch (error) {
        console.error("Error adding manager:", error);
    } finally {
        dispatch(setLoading(false));  
    }
};

export const EditManagerApi = (data) => async (dispatch) => {
    dispatch(setLoading(true));  
    try {
        const token = getAuthToken();
        await axios.patch(`https://employee-system-nodejs.vercel.app/api/manager/updateManager?${data._id}`, {
            ...data,
            companyId: data.companyId 
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(getManagerApi());
    } catch (error) {
        console.error("Error editing manager:", error);
    } finally {
        dispatch(setLoading(false));  
    }
};

export const DeleteManagerApi = (id) => async (dispatch) => {
    dispatch(setLoading(true));  
    try {
        await axios.delete(`https://employee-system-nodejs.vercel.app/api/manager/deleteManager?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        dispatch(getManagerApi());
    } catch (error) {
        console.error("Error deleting manager:", error);
    } finally {
        dispatch(setLoading(false));  
    }
};

export const managerSlice = createSlice({
    name: 'managerForm',
    initialState,
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setValue, setLoading } = managerSlice.actions;
export default managerSlice.reducer;
