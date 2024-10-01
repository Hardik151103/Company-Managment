import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import "../CSS/Header.css"
import { logoutUser } from '../Redux/Slice/LoginSlice';

const Header = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const dispatch = useDispatch();
  const state = useSelector(state => state.companySetting.value);
  console.log(state)

  useEffect(() => {
    const expirationTime = localStorage.getItem("tokenExpiration");

    if (expirationTime) {
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = expirationTime - currentTime;

        if (remainingTime <= 0) {
          clearInterval(interval);
          dispatch(logoutUser());
        } else {
          setTimeLeft(remainingTime);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [dispatch]);

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "you want to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        dispatch(logoutUser())
      }
    });
  }

  return (
    <div className="header justify-content-end align-items-center">
      {/* {timeLeft !== null && (
        <p className='text-white'>Logout reminder : {formatTime(timeLeft)}</p>
      )} */}
      <img src={state?.companyLogo} alt="" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      <button className='btn btn-light me-3' onClick={logout} >Logout</button>
    </div>
  );
};

export default Header;
