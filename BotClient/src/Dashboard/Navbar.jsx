import React from "react";
import "../Dashboard.css";

import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const Navbar = ({ changeStyle1, setLoginUser }) => {
  const logoutfun = ()=>{
      localStorage.removeItem("userData")
      setLoginUser({})
  }
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-gray-900  text-white topbar  static-top shadow">
        {/*  <!-- Sidebar Toggle (Topbar) --> */}
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
          onClick={changeStyle1}
        >
          <i className="fa fa-bars"></i>
        </button>

        {/*  <!-- Topbar Search --> */}
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search fa-sm"></i>
              </button>
            </div>
          </div>
        </form>

        {/*  <!-- Topbar Navbar --> */}
        <ul className="navbar-nav ml-auto">
          {/*  <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
          <li className="nav-item dropdown no-arrow d-sm-none">
            <Link
              className="nav-link dropdown-toggle"
              to="/"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-search fa-fw"></i>
            </Link>
            {/*   <!-- Dropdown - Messages --> */}
          </li>

          {/*  <!-- Nav Item - Alerts --> */}
          <li className="nav-item dropdown no-arrow mx-1">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="alertsDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-bell fa-fw"></i>
              {/*  <!-- Counter - Alerts --> */}
              <span className="badge badge-danger badge-counter">3+</span>
            </Link>
            {/*   <!-- Dropdown - Alerts --> */}
          </li>

          {/*  <!-- Nav Item - Messages --> */}
          <li className="nav-item dropdown no-arrow mx-1">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="messagesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-envelope fa-fw"></i>
              {/*  <!-- Counter - Messages --> */}
              <span className="badge badge-danger badge-counter">7</span>
            </Link>
            {/*   <!-- Dropdown - Messages --> */}
          </li>

          <div className="topbar-divider d-none d-sm-block"></div>

          {/* <!-- Nav Item - User Information --> */}
          <li className="nav-item dropdown no-arrow">
            <span
              className="nav-link dropdown-toggle"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                USER NAME
              </span>
              <img
                className="img-profile rounded-circle"
                src="https://media.gettyimages.com/photos/ai-robot-thinking-picture-id1029035836"
                alt="user profile"
              />
            </span>
            {/*  <!-- Dropdown - User Information --> */}
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <Link className="dropdown-item" to="/">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </Link>
              <Link className="dropdown-item" to="/">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                Settings
              </Link>
              <Link className="dropdown-item" to="/">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                Activity Log
              </Link>
              <div className="dropdown-divider"></div>
              <div
                onClick={logoutfun}
                className="dropdown-item"
                //localStorage.removeItem('userData')
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
