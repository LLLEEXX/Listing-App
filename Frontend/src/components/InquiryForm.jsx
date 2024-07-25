import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getApp } from "../utility/AppManager";
import axios from "../utility/axios";

import { Grid, Container, Link } from "@mui/material";
import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";
import {
  Link as MUILink,
  Input,
  FormControl,
  FormLabel,
  Textarea,
} from "@mui/joy";
import "./../assets/InquiryForm.css";
import SendIcon from "@mui/icons-material/Send";
import { Alert } from "@mui/joy";
import WarningIcon from "@mui/icons-material/Warning";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function InquiryForm() {
  const [numberCopied, setNumberCopied] = useState(false);
  const [emailComposed, setEmailComposed] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openFailSnackbar, setOpenFailSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  //Phone view
  const redirectToPhone = (event) => {
    event.preventDefault(); // Prevent default link behavior
    window.location.href = `tel:${phoneNumber}`; // Initiate phone call
  };

  const handleSuccess = (message) => {
    setSnackbarMessage(message);
    setOpenSuccessSnackbar(true);
  };

  const handleError = (message) => {
    setSnackbarMessage(message);
    setOpenFailSnackbar(true);
  };

  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //History
  const goBack = () => {
    window.history.back(); // Navigate back using window.history
  };

  //Input Mobile Number
  const handleInputChange = (event) => {
    const input = event.target.value.replace(/\D/g, "").slice(0, 11); // Remove non-numeric characters and limit to 11 characters
    event.target.value = input;
  };

  const { inquire } = useParams();
  const originalUsers = inquire.replace(/_/g, " ");

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchProp = async () => {
      try {
        const App = getApp();
        const config = {
          headers: {
            Authorization: `Bearer ${App}`,
          },
        };

        const response = await axios.get(
          `/api/fetch-UserProfile?UserInquire=${originalUsers}`,
          config
        );

        if (response.status === 200) {
          setUserData(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProp();
  }, [originalUsers]);

  const sendData = async (formData) => {
    try {
      const App = getApp();
      const config = {
        headers: {
          Authorization: `Bearer ${App}`,
        },
      };

      const response = await axios.post('/api/send-inquiry', formData, config);
      if(response.status === 200){
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 14 }}>
      <MUILink
        onClick={goBack}
        level="title-md"
        underline="hover"
        startDecorator={<KeyboardBackspaceIcon />}
      >
        Back
      </MUILink>
      <Typography
        level="h3"
        color="neutral"
        variant="plain"
        sx={{
          mt: 3,
          mb: 1,
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        Additional Inquiries
      </Typography>
      <Alert
        startDecorator={<WarningIcon />}
        variant="soft"
        color="danger"
        sx={{ mb: 2 }}
      >
        Avoid sharing sensitive details like your address or financial data
        during Property Inquiries. Stay safe online!
      </Alert>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const user = userData?.requested_user?.email
          const email = formData.get("email");
          const mobileNum = formData.get("mobileNum");
          const inquireMessage = formData.get("InquireMessage");

          const data = {
            user,
            email,
            mobileNum,
            inquireMessage,
          };

          sendData(data);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Card
              color="primary"
              variant="outlined"
              sx={{
                backgroundColor: "transparent",
                maxWidth: "100%",
                boxShadow: "lg",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <CardContent
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
                  gap: 1.5,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <FormControl sx={{ gridColumn: "1/-1" }}>
                  <FormLabel sx={{ fontFamily: "'Poppins', sans-serif" }}>
                    Full Name:
                  </FormLabel>
                  <Input
                    value={userData?.current_user?.fullname}
                    name="fullname"
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "1/-1" }}>
                  <FormLabel sx={{ fontFamily: "'Poppins', sans-serif" }}>
                    Email Address:
                  </FormLabel>
                  <Input value={userData?.current_user?.email} name="email" />
                </FormControl>
                <FormControl sx={{ gridColumn: "1/-1" }}>
                  <FormLabel sx={{ fontFamily: "'Poppins', sans-serif" }}>
                    Mobile Number:
                  </FormLabel>
                  <Input
                    onChange={handleInputChange}
                    placeholder="09xx-xxx-xxxx"
                    inputProps={{
                      maxLength: 11,
                    }}
                    value={userData?.current_user?.mobileNum}
                    name="mobileNum"
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "1/-1" }}>
                  <FormLabel sx={{ fontFamily: "'Poppins', sans-serif" }}>
                    Inquiry:
                  </FormLabel>
                  <Textarea
                    minRows={4.5}
                    name="InquireMessage"
                    id="InquireMessage"
                  />
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              color="primary"
              variant="outlined"
              sx={{
                backgroundColor: "transparent",
                maxWidth: "100%",
                boxShadow: "lg",
              }}
            >
              <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
                <Avatar
                  src={`http://127.0.0.1:8000/storage/${userData?.requested_user?.profile_picture}`}
                  sx={{ "--Avatar-size": "8rem" }}
                />
                <Typography
                  level="h3"
                  sx={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {userData?.requested_user?.name}
                </Typography>
                <Typography
                  level="body-sm"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    textTransform: "uppercase",
                    color: "#3d3d3d",
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  Member Since {userData?.requested_user?.created_year}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 2,
                    "& > button": { borderRadius: "2rem" },
                  }}
                ></Box>
              </CardContent>
              <CardOverflow
                sx={{
                  bgcolor: "background.level1",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <CardActions buttonFlex="1">
                  <Button
                    variant="solid"
                    startDecorator={<SendIcon />}
                    sx={{ fontFamily: "'Poppins', sans-serif" }}
                    type="submit"
                  >
                    Send Inquiry
                  </Button>
                </CardActions>
              </CardOverflow>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default InquiryForm;
