
import { useLocation, Outlet, useNavigate } from "react-router-dom";

import {
  Box,
  Stack,
  Avatar,
  Typography,
  Button,

} from "@mui/joy";

import axios from "../utility/axios";
import { getApp } from "../utility/AppManager";

//color variable
import { colors } from "../utility/scriptUtility";

//MUI ICONS
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useState, useEffect } from "react";

const AdminComp = () => {
  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //UseNavigate to Change admin TAB
  const Navigate = useNavigate();

  //UseLocation to know which compoment the admin is
  const location = useLocation();
  const DBTab = location.pathname === "/adminPage";
  const PMSFormTab = location.pathname === "/adminPage/pmsForm";
  const LandingPageCover = location.pathname === "/adminPage/ChangePhoto";
  const Subscription = location.pathname === "/adminPage/subscription";
  const AccActivation = location.pathname === "/adminPage/accActivation";

  const [userSecData, setUserSecData] = useState(null);

  const [errorSnackbar, setErrorSnackbar] = useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const App = getApp();
        const config = {
          headers: {
            Authorization: `Bearer ${App}`,
          },
        };

        const response = await axios.get("/api/user-InforSec", config);

        if (response.status >= 200 && response.status < 300) {
          setUserSecData(response.data.full_name);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Box
      component="section"
      sx={{ bgcolor: "#F5F5F5", display: "flex", minHeight: "100vh" }}
    >
      <Stack
        component="aside"
        direction="column"
        sx={{
          p: 1,
          minWidth: 250,
          bgcolor: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <Box
          sx={{
            p: 3,
            width: "100%",
            minHeight: "15rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
            mb: 2,
            textAlign: 'center',
          }}
        >
          <Avatar
            alt=""
            src="/assets/clogo.png"
            sx={{ width: 90, minHeight: 90 }}
            className="shadow"
          />
          <Stack direction="column" sx={{ mt: 3 }}>
            <Typography level="h3">
              {userSecData && userSecData}
            </Typography>
            <Typography level="title-sm" sx={{ textAlign: "center" }}>
              Admin Account
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button
              startDecorator={<LogoutIcon/>}
              color="danger"
              onClick={() => Navigate("/", { replace: true })}
              variant="plain"
            >Back to Site </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              p: 1,
              gap: 1,
              borderRadius: 5,
              cursor: "pointer",
              opacity: DBTab ? 1 : 0.5,
              bgcolor: DBTab ? colors.active : "transparent",
              "&:hover": {
                opacity: !DBTab && 1,
                bgcolor: !DBTab && colors.active,
              },
            }}
            onClick={() => Navigate("/adminPage")}
          >
            <DashboardIcon sx={{ fill: '#0B6BCB' }} />
            Dashboard
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              p: 1,
              gap: 1,
              borderRadius: 5,
              cursor: "pointer",
              opacity: AccActivation ? 1 : 0.5,
              bgcolor: AccActivation ? colors.active : "transparent",
              "&:hover": {
                opacity: !AccActivation && 1,
                bgcolor: !AccActivation && colors.active,
              },
            }}
            onClick={() => Navigate("/adminPage/accActivation")}
          >
            <SupervisorAccountIcon sx={{ fill: '#0B6BCB' }} />
            Accounts
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              p: 1,
              gap: 1,
              borderRadius: 5,
              cursor: "pointer",
              opacity: PMSFormTab ? 1 : 0.5,
              bgcolor: PMSFormTab ? colors.active : "transparent",
              "&:hover": {
                opacity: !PMSFormTab && 1,
                bgcolor: !PMSFormTab && colors.active,
              },
            }}
            onClick={() => Navigate("/adminPage/pmsForm")}
          >
            <NoteAltIcon sx={{ fill: '#0B6BCB' }} />
            PMS Form
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              p: 1,
              gap: 1,
              borderRadius: 5,
              cursor: "pointer",
              opacity: Subscription ? 1 : 0.5,
              bgcolor: Subscription ? colors.active : "transparent",
              "&:hover": {
                opacity: !Subscription && 1,
                bgcolor: !Subscription && colors.active,
              },
            }}
            onClick={() => Navigate("/adminPage/subscription")}
          >
            <SellRoundedIcon sx={{ fill: '#0B6BCB' }} />
            Pricing Discounts
          </Box>
        </Box>
      </Stack>
      <Stack component="section" sx={{ width: "84%", overflowY: "auto" }}>
        <Outlet />
      </Stack>
    </Box>
  );
};

export default AdminComp;
