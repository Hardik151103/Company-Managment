import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    value: [],
    loading: false,
};

const getAuthToken = () => {
    return localStorage.getItem('token'); 
};

export const getEmployeeApi = () => async (dispatch) => {  
    dispatch(setLoading(true));
    try {
        const response = await axios.get('https://employee-system-nodejs.vercel.app/api/employee/getAllEmployee', {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        dispatch(setValue(response.data.data));
    } catch (error) {
        console.error("Error fetching employees:", error);
    } finally {
        dispatch(setLoading(false));
    }
};

export const AddEmployeeApi = (data) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await axios.post('https://employee-system-nodejs.vercel.app/api/employee/addEmployee', data, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        dispatch(getEmployeeApi());
    } catch (error) {
        console.error("Error adding employee:", error);
    } finally {
        dispatch(setLoading(false));
    }
};

export const EditEmployeeApi = (data) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await axios.patch(`https://employee-system-nodejs.vercel.app/api/employee/updateEmployee?${data._id}`, {
            ...data,
            companyId: data.companyId 
        }, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        dispatch(getEmployeeApi());
    } catch (error) {
        console.error("Error editing employee:", error);
    } finally {
        dispatch(setLoading(false));
    }
};

export const DeleteEmployeeApi = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await axios.delete(`https://employee-system-nodejs.vercel.app/api/employee/deleteEmployee?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        dispatch(getEmployeeApi());
    } catch (error) {
        console.error("Error deleting employee:", error);
    } finally {
        dispatch(setLoading(false));
    }
};

export const employeeSlice = createSlice({
    name: 'employeeForm',
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

export const { setValue, setLoading } = employeeSlice.actions;
export default employeeSlice.reducer;
