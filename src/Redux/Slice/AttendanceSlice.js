// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//     value: [],
//     loading: false,
// };

// const getAuthToken = () => {
//     return localStorage.getItem('token');
// };

// export const getAttendanceApi = (userId) => async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//         const response = await axios.get(`https://employee-system-nodejs.vercel.app/api/attendance/getAttendance`, {
//             headers: {
//                 'Authorization': `Bearer ${getAuthToken()}`
//             },
//             params: {
//                 userId: userId
//             }
//         });
//         dispatch(setValue(response.data.data));
//     } catch (error) {
//         console.error("Error fetching attendance:", error);
//     } finally {
//         dispatch(setLoading(false));
//     }
// };

// export const addAttendanceApi = (attendanceData) => async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//         await axios.post('https://employee-system-nodejs.vercel.app/api/attendance/submitAttendance', attendanceData, {
//             headers: {
//                 'Authorization': `Bearer ${getAuthToken()}`
//             }
//         });
//         dispatch(getAttendanceApi(attendanceData.userId));
//     } catch (error) {
//         console.error("Error adding attendance:", error);
//     } finally {
//         dispatch(setLoading(false));
//     }
// };

// export const attendanceSlice = createSlice({
//     name: 'attendanceForm',
//     initialState,
//     reducers: {
//         setValue: (state, action) => {
//             state.value = action.payload;
//         },
//         setLoading: (state, action) => {
//             state.loading = action.payload;
//         }
//     }
// });

// export const { setValue, setLoading } = attendanceSlice.actions;
// export default attendanceSlice.reducer;
