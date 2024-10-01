import React from "react";
import "../CSS/Login.css"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setLoginField, loginUser } from "../Redux/Slice/LoginSlice";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  // const { status, error } = useSelector((state) => state.login);
  const onSubmit = async (data) => {
    dispatch(loginUser(data))
  }


  return (
    <div
      className="d-flex justify-content-center align-items-center py-4 bg-login"
      style={{ height: "auto", minHeight: "100vh" }}
    >
      <div className="form bg-white p-3 rounded">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h5 className="text-center mb-4">Login</h5>

          <div>
            <input
              className="w-100 rounded py-2 px-2 border-gray"
              type="email"
              {...register("companyEmail", { required: true })}
              placeholder="Enter Email"
            />
          </div>
          <div>
            <input
              className="w-100 rounded mt-4 py-2 px-2 border-gray"
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" className="btn py-2 mt-4 w-100 text-white login-btn">
            login
          </button>
        </form>
        <div className="text-center mt-2 mb-3">
          <span>I don't have an account </span>
          <NavLink to="/register">Register</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
