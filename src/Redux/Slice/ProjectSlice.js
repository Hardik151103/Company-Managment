import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    value: [],
    loading: false,  
}

const getAuthToken = () => {
    return localStorage.getItem('token'); 
}

const getProjectApi = () => async (dispatch) => {
    dispatch(setLoading(true));  
    try {
        const response = await axios.get('https://employee-system-nodejs.vercel.app/api/project/getAllProject', {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        dispatch(setValue(response.data.data));
    } catch (error) {
        console.error("Error fetching projects:", error);
    } finally {
        dispatch(setLoading(false));  
    }
}

export const AddProjectApi = (data) => async (dispatch) => {
    dispatch(setLoading(true));  
    try {
        await axios.post('https://employee-system-nodejs.vercel.app/api/project/addProject', data, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        dispatch(getProjectApi());
    } catch (error) {
        console.error("Error adding project:", error);
    } finally {
        dispatch(setLoading(false));  
    }
}
 
export const EditProjectApi = (data) => async (dispatch) => {
    dispatch(setLoading(true));  
    try {
        await axios.patch(`https://employee-system-nodejs.vercel.app/api/project/updateProject`, data, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        dispatch(getProjectApi());
    } catch (error) {
        console.error("Error updating project:", error);
    } finally {
        dispatch(setLoading(false));  
    }
}

export const DeleteProjectApi = (id) => async (dispatch) => {
    dispatch(setLoading(true));  
    try {
        await axios.delete(`https://employee-system-nodejs.vercel.app/api/project/deleteProject?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        dispatch(getProjectApi());
    } catch (error) {
        console.error("Error deleting project:", error);
    } finally {
        dispatch(setLoading(false));  
    }
}

const ProjectSlice = createSlice({
    name: 'projectForm',
    initialState,
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setValue, setLoading } = ProjectSlice.actions;
export default ProjectSlice.reducer;
