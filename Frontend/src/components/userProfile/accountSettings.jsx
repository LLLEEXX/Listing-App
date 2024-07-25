import React, { useState, useEffect } from "react";
import { getApp } from "../../utility/AppManager";
import "../../assets/userAccount.css";
import { setAppName } from "../../utility/AppManager";
import ChangeProfileButton from "../change-profile";

// MUI imports
import {
  Box,
  Container,
  Typography,
  Stack,
  InputLabel,
  TextField,
  FormControlLabel,
  Button,
  IconButton,
  Checkbox,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "../../utility/axios";
import { Link } from "react-router-dom";

//MUI Icons
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const AccountDetailsForm = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [email, setEmail] = useState("");
  const [updatesCheck, setUpdatesCheck] = useState(false);
  const [userDataSettings, setUserDataSettings] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const App = getApp();
        const config = {
          headers: {
            Authorization: `Bearer ${App}`,
          },
        };

        const response = await axios.get("/api/account-settings", config);
        if (response.status >= 200 && response.status < 300) {
          setUserDataSettings(response.data);
          setFullname(response.data.data.fullname);
          setUsername(response.data.data.username);
          setMobileNum(response.data.data.mobileNum);
          setEmail(response.data.data.email);
          setUpdatesCheck(response.data.data.updatesCheck);
          setAppName(response.data.data.username);
        } else {
          console.error("Failed to retrieve user data:", response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleMobileNumChange = (event) => {
    setMobileNum(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUpdatesCheckChange = (event) => {
    setUpdatesCheck(event.target.checked);
  };
  const handleProfileChange = (event) => {
    setProfile_image(event.target.value);
  };

  const handleSave = async () => {
    try {
      const App = getApp();
      const config = {
        headers: {
          Authorization: `Bearer ${App}`,
        },
      };

      const response = await axios.post(
        "/api/update-account",
        {
          fullname,
          username,
          mobileNum,
          email,
          updatesCheck,
        },
        config
      );

      if (response.status >= 200 && response.status < 300) {
        // Handle success if needed
        console.log("Data updated successfully:", response.data);
        window.location.reload();
      } else {
        // Handle error if needed
        console.error("Failed to update data:", response);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container component="section" sx={{ mt: 12, height: "100%" }}>
      <Box component="header" sx={{ display: "flex" }}>
        <Link to="/userAccount">
          <IconButton
            aria-label="back"
            sx={{ fontSize: "2rem", color: "black", }}
          >
            <ArrowBackIcon sx={{ fontSize: "1.7rem" }} />
          </IconButton>
        </Link>
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, fontFamily: "'Poppins', sans-serif", marginLeft: "10px" }}
        >
          Account Settings
        </Typography>
      </Box>

      <Stack sx={{ mt: 2 }} direction="column">
        <Stack
          sx={{
            mb: 2,
            borderBottom: 1,
            py: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ChangeProfileButton />
        </Stack>

        <Stack sx={{ mb: 2, borderBottom: 1, py: 2 }}>
          <Typography variant="h5">Personal Details</Typography>
        </Stack>

        <Stack component="section">
          <Box sx={{ mb: 2 }}>
            <InputLabel id="firstNametxt" sx={{ fontWeight: "bold", mb: 1 }}>
              Full Name
            </InputLabel>
            <TextField
              required
              labelid="fullNamelbl"
              fullWidth
              placeholder="Enter fullname"
              name="fullname"
              value={fullname || ""}
              onChange={handleFullnameChange}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel id="usernametxt" sx={{ fontWeight: "bold", mb: 1 }}>
              Username
            </InputLabel>
            <TextField
              required
              labelid="usernamelbl"
              fullWidth
              name="username"
              value={username || ""}
              onChange={handleUsernameChange}
            />
          </Box>
          <Stack sx={{ mb: 2, borderBottom: 1, py: 2 }}>
            <Typography variant="h5">Contact Details</Typography>
          </Stack>
          <Box sx={{ mb: 2 }}>
            <InputLabel id="numTxt" sx={{ fontWeight: "bold" }}>
              Mobile Number
            </InputLabel>
            <TextField
              required
              labelid="numlbl"
              name="numlbl"
              value={mobileNum || ""}
              onChange={handleMobileNumChange}
              fullWidth
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel id="emailTxt" sx={{ fontWeight: "bold" }}>
              Email
            </InputLabel>
            <TextField
              required
              labelid="emaillbl"
              name="namelbl"
              value={email || ""}
              onChange={handleEmailChange}
              fullWidth
            />
          </Box>
          <Stack sx={{ mb: 2, borderBottom: 1, py: 2 }}>
            <Typography variant="h5">Settings</Typography>
          </Stack>
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={updatesCheck || false}
                  onChange={handleUpdatesCheckChange}
                  name="updatesCheck"
                />
              }
              label="Contact me for rental offers"
            />
          </Box>
        </Stack>
      </Stack>
      <Stack component="section" >
        <Stack sx={{ mb: 2, py: 2, }}></Stack>
        <Box>
          <Button
            startIcon={<CheckOutlinedIcon />}
            variant="contained"
            onClick={handleSave}
            sx={{
              height: "3rem",
              backgroundColor: "#0B6BCB",
              "&:hover": {
                backgroundColor: "#0B6BCB",
                color: "#fff",
                border: 1,
              }, float:"right" 
            }}
          >
            Save
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default AccountDetailsForm;
