import React from "react";
import { NavLink } from "react-router-dom";

const AdminHeader = () => {
  return (
    <header>
      <h2>
        <label htmlFor="nav-toggle">
          <span className="las la-bars"></span>
        </label>
      </h2>
      <div className="user-wrapper dropdown">
        <div className="dropbtn">
          <img
            width={"30px"}
            height={"30px"}
            src="/images/icons/profile.png"
            alt=""
          />
          {/* <img src="src/img/user-icon-img.png" width="40px" height="40px" /> */}
          <small>Admin</small>
        </div>

        <div id="myDropdown" className="dropdown-content">
          {/* <a href="my-profile.php" title="My Profile"><i className="las la-user"></i> My Profile</a>
                    <a href="user-permissions.php" title="Users and permissions"><i className="las la-user-circle"></i> Users and permissions</a> */}
          <NavLink to="/logout" title="Logout">
            <i className="las la-sign-out-alt"></i> Logout
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
