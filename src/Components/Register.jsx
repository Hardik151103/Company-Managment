import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setRegisterField, registerUser } from "../Redux/Slice/RegisterSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.register);
  const { status, error } = useSelector((state) => state.register);

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      const base64 = await convertToBase64(file);
      dispatch(setRegisterField({ name, value: base64 }));
    } else {
      dispatch(setRegisterField({ name, value }));
    }
  };

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));
    if (result.meta.requestStatus === 'fulfilled') {
      alert("Registration successful!");
      navigate("/login");
    } else {
      alert(result.payload);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center py-4 bg-login"
      style={{ height: "auto", minHeight: "100vh" }}
    >
      <div className="form bg-white p-4 rounded">
        <form onSubmit={handleSubmit}>
          <h5 className="text-center mb-4">Register</h5>

          <input
            className="w-100 rounded py-2 px-2 mb-3 border-gray"
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            required
          />
          <input
            className="w-100 rounded py-2 px-2 mb-3 border-gray"
            type="date"
            name="companyStartedDate"
            value={formData.companyStartedDate}
            onChange={handleChange}
            placeholder="Company Started Date"
            required
          />
          <input
            className="w-100 rounded py-2 px-2 mb-3 border-gray"
            type="number"
            name="companyMobileNumber"
            value={formData.companyMobileNumber}
            onChange={handleChange}
            placeholder="Company Mobile Number"
            required
          />
          <input
            className="w-100 rounded py-2 px-2 mb-3 border-gray"
            type="text"
            name="companyAddress1"
            value={formData.companyAddress1}
            onChange={handleChange}
            placeholder="Company Address Line 1"
            required
          />
          <input
            className="w-100 rounded py-2 px-2 mb-3 border-gray"
            type="text"
            name="companyAddress2"
            value={formData.companyAddress2}
            onChange={handleChange}
            placeholder="Company Address Line 2 (Optional)"
          />
          <input
            className="w-100 rounded py-2 px-2 mb-3 border-gray"
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
            placeholder="Company Email"
            required
          />
          <input
            className="w-100 rounded py-2 px-2 mb-3 border-gray"
            type="text"
            name="gstNo"
            value={formData.gstNo}
            onChange={handleChange}
            placeholder="GST Number"
            required
          />
          <input
            className="w-100 rounded py-2 px-2 mb-3 border-gray"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
          <input
            className="w-100 rounded py-2 px-2 mb-3 border-gray"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            required
          />
          <input
            className="w-100 rounded py-2 px-2 mb-3 border-gray"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            required
          />
          <input
            className="w-100 rounded py-2 px-2 mb-3 border-gray"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            className="w-100 rounded py-2 px-2 mb-3 border-gray"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
          <input
            className="w-100 rounded py-2 px-2 mb-3 border-gray"
            type="file"
            name="companyLogo"
            onChange={handleChange}
            placeholder="Company Logo"
            required
          />
          <button
            type="submit"
            className="btn py-2 mt-3 w-100 text-white register-btn"
          >
            {status === 'loading' ? 'Registering...' : 'Register'}
          </button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </form>

        <div className="text-center mt-3">
          <span>I have an account </span>
          <NavLink to="/login">Login</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
