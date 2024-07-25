import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  Divider,
  Input,
  Button,
  Snackbar,
  Box,
} from "@mui/joy";

import Alert from "@mui/material/Alert";
import MailIcon from "@mui/icons-material/Mail";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

import axios from "../utility/axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const [passReset, setPassReset] = useState({
    email: "",
    password: "",
    token: "",
    password_confirmation: "",
    pass_reset_errs: [],
  });
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState({
    open: false,
    message: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPassReset((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    setPassReset((prevState) => ({
      ...prevState,
      token: token,
    }));
  }, [location.search]);

  const ResetPass = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/reset-password", passReset, {
        headers: {
          Authorization: `Bearer ${passReset.token}`,
        },
      });

      if (res.data.status === 200) {
        console.log(res.data.message);
        setSuccessSnackbarOpen(true);
        setPassReset({
          pass_reset_errs: [],
        });
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 5000);
      } else {
        setPassReset((prevState) => ({
          ...prevState,
          pass_reset_errs: res.data.pass_reset_errs,
        }));
        setErrorSnackbarOpen({
          open: true,
          message: res.data.email,
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorSnackbarOpen({
          open: true,
          message: '"Expired token. Please request a new reset."'
        })
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 5000);
      }
    }
  };

  return (
    <form
      onSubmit={ResetPass}
      className="fp-container d-flex align-items-center justify-content-center text-center"
    >
      <Card
        color="primary"
        size="lg"
        sx={{ backgroundColor: "transparent", width: "750px" }}
      >
        <img
          src="assets/reset.jpg"
          style={{
            height: "250px",
            width: "300px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Typography level="h1">Reset Password</Typography>
        <Divider
          sx={{
            mb: 1,
            backgroundColor: "#0B6BCB",
            width: "15%",
            height: "2.5px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        ></Divider>
        <Box>
          <Typography
            htmlFor="emailReset"
            sx={{ textAlign: "left", fontWeight: "bold" }}
          >
            Email Address:
          </Typography>
          <Input
            startDecorator={<MailIcon />}
            fullWidth
            type="email"
            id="emailReset"
            name="email"
            value={passReset.email}
            onChange={handleInput}
            placeholder="Enter current email"
            sx={{ mb: 1 }}
            required
          />
          {passReset.pass_reset_errs && passReset.pass_reset_errs.email && (
            <Alert severity="error">{passReset.pass_reset_errs.email}</Alert>
          )}
        </Box>
        <Typography
          htmlFor="Password"
          sx={{ textAlign: "left", fontWeight: "bold" }}
        >
          Enter New Password:
        </Typography>
        <Input
          startDecorator={<LockOutlinedIcon />}
          fullWidth
          type="password"
          id="Password"
          name="password"
          value={passReset.password}
          onChange={handleInput}
          placeholder="Enter new password"
          sx={{ mb: 1 }}
          required
        />
        {passReset.pass_reset_errs && passReset.pass_reset_errs.password && (
          <>
            {passReset.pass_reset_errs.password.map((error, index) => (
              <Alert key={index} severity="error">
                {error}
              </Alert>
            ))}
          </>
        )}
        <Typography
          htmlFor="PasswordConf"
          sx={{ textAlign: "left", fontWeight: "bold" }}
        >
          Confirm New Password:
        </Typography>
        <Input
          startDecorator={<LockOutlinedIcon />}
          fullWidth
          type="password"
          id="PasswordConf"
          name="password_confirmation"
          value={passReset.password_confirmation}
          onChange={handleInput}
          placeholder="Confirm new password"
          required
        />
        <Button type="submit" color="primary" sx={{ mt: 2 }}>
          Reset Password
        </Button>

        {/* Error Snackbar */}
        <Snackbar
          color="danger"
          variant="solid"
          open={errorSnackbarOpen.open}
          autoHideDuration={5000}
          onClose={() => setErrorSnackbarOpen({ open: false })}
        >
          <ErrorOutlineOutlinedIcon /> {errorSnackbarOpen.message}
        </Snackbar>

        {/* Success Snackbar */}
        <Snackbar
          open={successSnackbarOpen}
          autoHideDuration={5000}
          onClose={() => setSuccessSnackbarOpen(false)}
          variant="solid"
          color="success"
        >
          <DoneAllOutlinedIcon />
          Password reset successfully! Redirecting you back to the homepage...
        </Snackbar>
      </Card>
    </form>
  );
}
