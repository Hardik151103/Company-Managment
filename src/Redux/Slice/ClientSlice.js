import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    value: [],
    loading: false,
    error: null,
};

const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const getClientApi = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get('https://employee-system-nodejs.vercel.app/api/client/getAllClient', {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        dispatch(setValue(response.data.data || []));
    } catch (error) {
        console.error("Error fetching clients:", error);
        dispatch(setError(error.response ? error.response.data.message : error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const addClientApi = (data) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await axios.post('https://employee-system-nodejs.vercel.app/api/client/addClient', data, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        dispatch(getClientApi());
    } catch (error) {
        console.error("Error adding client:", error);
        dispatch(setError(error.response ? error.response.data.message : error.message));
    } finally {
        dispatch(setLoading(false));
    }
};


export const editClientApi = (data) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        data.companyId = data.companyId || localStorage.getItem('companyId'); 
        
        await axios.patch(`https://employee-system-nodejs.vercel.app/api/client/updateClient?${data._id}`, data, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        dispatch(getClientApi());
    } catch (error) {
        console.error("Error editing client:", error);
        dispatch(setError(error.response ? error.response.data.message : error.message));
    } finally {
        dispatch(setLoading(false));
    }
};



export const deleteClientApi = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await axios.delete(`https://employee-system-nodejs.vercel.app/api/client/deleteClient?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        dispatch(getClientApi());
    } catch (error) {
        console.error("Error deleting client:", error);
        dispatch(setError(error.response ? error.response.data.message : error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

const clientSlice = createSlice({
    name: 'clientForm',
    initialState,
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const { setValue, setLoading, setError } = clientSlice.actions;
export default clientSlice.reducer;
