import React, { useState, createContext, useEffect } from "react";
import "../../assets/userAccount.css";
import { Nav, Dropdown } from "react-bootstrap";

import {
  Box,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Grid,
  Container,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Divider } from "@mui/joy";


//Color Variables
import { colors } from "../../utility/scriptUtility";

//Use Queries MUI IMPORT
import { useBreakpoint } from "../../utility/scriptUtility";

//Mui Icons
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import {
  Outlet,
  NavLink,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import axios from "../../utility/axios";
import { getApp } from "../../utility/AppManager";

export const UserProfile = createContext();

export default function AccountDetails() {

  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //useQueries function to check width without using css
  const { isSmallScreen, isMediumScreen, isLargeScreen } = useBreakpoint();

  //useNavigate function to navigate to navigate in Mobile View
  const navigate = useNavigate();

  const location = useLocation();

  const [selectedMobileTab, setSelectedMobileTab] = useState("Listing");

  //Mobile Dropdown Function
  const handleDropdownTab = (selectedDropdownTab) => {
    if (selectedDropdownTab === "Listing") {
      setSelectedMobileTab((prevSelectedTab) => {
        navigate(`/userAccount`);
        return selectedDropdownTab;
      });
    } else {
      setSelectedMobileTab((prevSelectedTab) => {
        navigate(`/userAccount/${selectedDropdownTab}`);
        return selectedDropdownTab;
      });
    }
  };

  const [openBD, setOpenBD] = useState(false);

  // RETRIEVE USER DATA
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setOpenBD(true);
        const App = getApp();
        const config = {
          headers: {
            Authorization: `Bearer ${App}`,
          },
        };

        const response = await axios.get("/api/user-info", config);
        if (response.status >= 200 && response.status < 300) {
          setUserData(response.data);
          setOpenBD(false);
        } else {

          console.error("Failed to retrieve user data:", response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container
      sx={{
        bgcolor: colors.mainBg,
        mt: 7,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
      maxWidth="xl"
    >
      <Grid container sx={{ py: 5, gap: 2, width: "100%" }}>
        <Grid
          item
          lg={4}
          xs={12}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            bgcolor: colors.bg,
            height: "36.5rem",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              borderBottom: 1,
              minHeight: "15rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundImage: "url(/assets/pikb29.jpg)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Box sx={{ position: "relative", width: "auto", p: 2, mt: 3 }}>
              {userData && userData.data.fullname ? (
                <Avatar
                  sx={{
                    width: "10rem",
                    minHeight: "10rem",
                    backgroundColor: "#d3d3d3", // Set your desired background color
                    fontSize: "5rem",
                  }}
                >
                  {userData.data.fullname.charAt(0).toUpperCase()}
                </Avatar>
              ) : (
                <Avatar
                  src=""
                  sx={{ width: "10rem", minHeight: "10rem" }}
                  alt="Profile_pic"
                />
              )}
              <Tooltip title="Edit Profile" arrow>
                <IconButton
                  aria-label="editUserProfile"
                  sx={{
                    color: colors.light,
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    bgcolor: colors.primary,
                    "&:hover": {
                      bgcolor: colors.primary,
                    },
                  }}
                  onClick={() => navigate("/account-settings")}
                >
                  <EditOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
                mt: 1
              }}
            >
              <Typography variant="h5" fontFamily={"'Poppins',sans-serif"} color={"#fff"} fontWeight="Bold">
                {userData && userData.data.fullname}
              </Typography>
            </Box>
          </Box>

          <Stack sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                borderBottom: `1.5px solid grey`,
                color: "#949494",
                p: 1.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="Body1"> <img src="assets/r-coin.png" width={"20px"} height={"20px"} /> Red Coins</Typography>
              <Typography
                variant="Body1"
                color={colors.black}
                fontWeight="Bold"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {userData && (userData.data.subscription.red_coins)}
                <Link to="/Plans">
                  <Tooltip title="Buy More Coins" arrow>
                    <IconButton>
                      <AddIcon sx={{ fill: "tomato" }} />
                    </IconButton>
                  </Tooltip>
                </Link>
              </Typography>
            </Box>
            <Box
              sx={{
                borderBottom: `1.5px solid grey`,
                color: "#949494",
                p: 1.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="Body1"><img src="assets/s-coin.png" width={"20px"} height={"20px"} /> Silver Coins</Typography>
              <Typography
                variant="Body1"
                color={colors.black}
                fontWeight="Bold"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {userData && (userData.data.subscription.silver_coins)}
                <Link to="/Plans">
                  <Tooltip title="Buy More Coins" arrow>
                    <IconButton>
                      <AddIcon sx={{ fill: "#C0C0C0" }} />
                    </IconButton>
                  </Tooltip>
                </Link>
              </Typography>
            </Box>
            <Box
              sx={{
                borderBottom: `1.5px solid grey`,
                color: "#949494",
                p: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="Body1">Email</Typography>
              <Typography
                variant="Body1"
                color={colors.black}
                fontWeight="Bold"
              >
                {userData && userData.data.email}
              </Typography>
            </Box>
            <Box
              sx={{
                borderBottom: `1.5px solid grey`,
                color: "#949494",
                p: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="Body1">Phone Number</Typography>
              <Typography
                variant="Body1"
                color={colors.black}
                fontWeight="Bold"
              >
                {userData && userData.data.mobileNum}
              </Typography>
            </Box>
            <Box
              sx={{
                color: "#949494",
                p: 2,
                mt: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="Body1" sx={{ color: colors.accent }}>
                Member Since
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography
                  variant="Body1"
                  color={colors.primary}
                  fontWeight="Bold"
                >
                  {userData &&
                    [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ][new Date(userData.data.created_at).getMonth()]}
                </Typography>
                -
                <Typography
                  variant="Body1"
                  color={colors.primary}
                  fontWeight="Bold"
                >
                  {userData && new Date(userData.data.created_at).getFullYear()}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid
          lg={7.8}
          xs={12}
          item
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            bgcolor: colors.bg,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          {isSmallScreen ? (
            <Grid item sx={{ p: 3, textAlign: "right" }}>
              <Dropdown onSelect={(eventKey) => handleDropdownTab(eventKey)}>
                <Dropdown.Toggle variant="outline-dark" id="dropdown-nav">
                  {selectedMobileTab}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Listing">Listing</Dropdown.Item>
                  <Dropdown.Item eventKey="Favorites">Favorites</Dropdown.Item>
                  <Dropdown.Item eventKey="Leads">Leads</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
          ) : (
            <Grid
              item
              sx={{
                mt: 2.5,
                height: "3rem",
                py: 1,
                display: "flex",
                justifyContent: "center",
              }}
              xs={12}
            >
              <Nav className="p-2">
                <Nav.Item>
                  <NavLink
                    to="/userAccount"
                    end
                    className="text-decoration-none tabText"
                  >
                    Listing
                  </NavLink>
                </Nav.Item>
                |
                <Nav.Item>
                  <NavLink
                    to="/userAccount/Favorites"
                    className="text-decoration-none tabText"
                  >
                    Favorites
                  </NavLink>
                </Nav.Item>
                |
                <Nav.Item>
                  <NavLink
                    to="/userAccount/Leads"
                    className="text-decoration-none tabText"
                  >
                    Leads
                  </NavLink>
                </Nav.Item>
              </Nav>
            </Grid>
          )}
          <UserProfile.Provider value={{ isSmallScreen }}>
            <Outlet />
          </UserProfile.Provider>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBD}
      >
        Loading. Please wait... <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
