import React  from "react";
import "../Dashboard.css";

import { Link,} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import  {HiBuildingOffice2} from "react-icons/hi2";

const SideNav = ( {setStyle ,style, changeStyle}) => {
  return (
   <>
     <ul className={style} id="accordionSidebar">
            {/*  <!-- Sidebar - Brand --> */}
            <span
              className="sidebar-brand d-flex align-items-center justify-content-center"
              
            >
              <div className="sidebar-brand-icon rotate-n-15">
             <HiBuildingOffice2 />
              </div>
              <div className="sidebar-brand-text mx-3">INT HUB </div>
              <div className="text-center d-none d-md-inline">
                <button
                  className="rounded-circle border-0"
                  id="sidebarToggle"
                  onClick={changeStyle}
                ></button>
              </div>
            </span>

            {/*   <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/*  <!-- Nav Item - Dashboard --> */}
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            {/*  <!-- Divider --> */}
            <hr className="sidebar-divider" />

            {/*   <!-- Heading --> */}
            <li className="nav-item">
              <span
                className="nav-link collapsed"
            
                data-toggle="collapse"
                data-target="#collapsePages"
                aria-expanded="true"
                aria-controls="collapsePages"
              >
                <i className="fas fa-fw fa-folder"></i>
                <span>Pages</span>
              </span>
              <div
                id="collapsePages"
                className="collapse"
                aria-labelledby="headingPages"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <div className="collapse-divider"></div>
                  <h6 className="collapse-header">Other Pages:</h6>
                  {/* <Link className="collapse-item" to="/addinfo">
                   AddInfo
                  </Link> */}
                  <Link className="collapse-item" to="/home">Home</Link>
                </div>
              </div>
            </li>

            {/* <!-- Nav Item - Charts --> */}
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                <i className="fas fa-fw fa-chart-area"></i>
                <span>Home</span>
              </Link>
            </li>

            {/*  <!-- Nav Item - Tables --> */}
            <li className="nav-item">
              <Link className="nav-link" to="/addinfo">
                <i className="fas fa-fw fa-table"></i>
                <span>Create</span>
              </Link >
            </li>
          </ul>
   </>
  )
}

export default SideNav