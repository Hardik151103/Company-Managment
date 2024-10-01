import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../Slice/LoginSlice';
import registerReducer from '../Slice/RegisterSlice';
import clientReducer from '../Slice/ClientSlice';
import managerFormReducer from '../Slice/ManagerSlice';
import employeeFormReducer from '../Slice/EmployeeSlice';
import projectFormReducer from '../Slice/ProjectSlice'
import attendanceFormReducer from '../Slice/AttendanceSlice'
import { companySettingReducer } from '../Slice/CompanySettingslice';
import { dashboardReducer } from '../Slice/DashboardSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    clientForm: clientReducer,
    managerForm: managerFormReducer,
    employeeForm: employeeFormReducer,
    projectForm: projectFormReducer,
    // attendanceForm: attendanceFormReducer,
    dashboard: dashboardReducer,
    companySetting: companySettingReducer
  },
});

export default store;
