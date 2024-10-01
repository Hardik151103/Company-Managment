import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Manager from "./Components/Manager";
import Clients from "./Components/Clients";
import Employee from "./Components/Employee";
import Projects from "./Components/Projects";
import Attendance from "./Components/Attendance";
import Profile from "./Components/Companysetting";
import { logoutUser } from './Redux/Slice/LoginSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEmployeeApi } from "./Redux/Slice/EmployeeSlice";
import { getManagerApi } from "./Redux/Slice/ManagerSlice";
import { getCardsData } from "./Redux/Slice/DashboardSlice";
import { getCompanySetting } from "./Redux/Slice/CompanySettingslice";

function App() {
  const isLogin = useSelector(state => state.login)

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  useEffect(() => {
    if (isLogin.token) {
      setTimeout(() => {
        dispatch(getCardsData())
        dispatch(getCompanySetting())
        dispatch(getManagerApi())
        dispatch(getEmployeeApi())
      })
    }

  }, [isLogin]);

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            {
              isLogin?.token ?
                <>
                  <Route path="/" element={<Navigate to='/dashboard' />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/manager" element={<Manager />} />
                  <Route path="/employee" element={<Employee />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/login" element={<Navigate to='/dashboard' />} />

                </> :
                <>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<Navigate to={'/'} />} />
                </>
            }
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
