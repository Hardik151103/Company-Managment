import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import "../CSS/Sidebar.css"

const Sidebar = () => {

  let menus = [
    {
      name: 'Dashboard',
      path: '/dashboard'
    },
    {
      name: 'Employee',
      path: '/employee'
    },
    {
      name: 'Manager',
      path: '/manager'
    },
    {
      name: 'Attendance',
      path: '/attendance'
    },
    {
      name: 'Company Setting',
      path: '/profile'
    }
  ]
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h4>COMPANY MANAGEMENT</h4>
      </div>
      <div className="sidebar-menu">
        {
          menus.map((x, i) => {
            return <NavLink key={i} to={x.path}>{x.name}</NavLink>
          })
        }
      </div>
    </div >
  );
};

export default Sidebar;
