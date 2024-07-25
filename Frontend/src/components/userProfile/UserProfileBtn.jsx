import { NavLink, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { Avatar, Button } from "@mui/joy";

import axios from "../../utility/axios";
import {getApp, removeApp} from '../../utility/AppManager'
import {getAppName, removeAppName, removeLoggedIn} from '../../utility/AppManager'

export default function UserProfileBtn({ animate, isTop, width992px }) {
  //useNavigate Hook For Redirecting user when log out
  const history = useNavigate();

  //Function to logout user
  const logout = async () => {
    try {
      const App = getApp(); // Get token from localStorage or wherever you store it
      const config = {
        headers: {
          Authorization: `Bearer ${App}`, // Include token in Authorization header
        },
      };

      const res = await axios.post("/api/logout", {}, config);

      if (res.data.status === 200) {
        removeAppName();
        removeLoggedIn();
        history("/", { replace: true });
        console.log(res.data.message);
        removeApp();
      } else {
        console.log("Something wrong happen");
      }
    } catch (error) {
      console.error(`error logging out: ${error}`);
    }
  };


  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-Inquire"
        className={`bg-transparent border-0 d-flex align-items-center gap-2 ${
          animate
            ? isTop && !width992px
              ? "fw-semibold text-white"
              : "fw-semibold text-dark"
            : "fw-semibold text-dark"
        }`}
      >
        {getAppName()}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={NavLink} to="/userAccount" >
          Profile
        </Dropdown.Item>
        <Dropdown.Item as={NavLink} to="/account-settings">
          Account Settings
        </Dropdown.Item>
        <Dropdown.Item>
          <Button onClick={logout} variant="outline-danger" className="w-100">
            Log Out
          </Button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
