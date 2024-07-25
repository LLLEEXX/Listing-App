import "./../assets/SignUp.css";

//MUI
import { useState, useEffect } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Snackbar from "@mui/joy/Snackbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { useMediaQuery, useTheme } from "@mui/material";

import { Button } from "react-bootstrap";

import axios from "../utility/axios";

export const SignUp = () => {

  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openTc, setOpenTc] = useState(false);

  const theme = useTheme();
  const ismeduimScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const [openSnackBar, setOpenSnackBar] = useState({
    color: "success",
    open: false,
    message: "",
  });

  const [openBackDrop, setOpenBackDrop] = useState(false);

  const [state, setState] = useState({
    fullname: "",
    password: "",
    nationality: "",
    username: "",
    mobileNum: "",
    email: "",
    password_confirmation: "",
    gender: "",
    recieveUpdate: false,
    termsandCon: false,
    err_list: [],
  });

  const handleInput = (e) => {
    const { name, value, checked } = e.target;

    // Mobile number validation
    if (name === "mobileNum") {
      if (!value.startsWith("09")) {
        setState((prevState) => ({
          ...prevState,
          err_list: { ...prevState.err_list, mobileNum: "Mobile number must start with '09'" },
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          err_list: { ...prevState.err_list, mobileNum: "" }, // Clear previous error message
        }));
      }
    }

    // Password length validation
    if (name === "password" && value.length < 8) {
      setState((prevState) => ({
        ...prevState,
        err_list: { ...prevState.err_list, password: "Password must be at least 8 characters long" },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        err_list: { ...prevState.err_list, password: "" }, // Clear previous error message
      }));
    }

    // Password match validation
    if (name === "password_confirmation" && value !== state.password) {
      setState((prevState) => ({
        ...prevState,
        err_list: { ...prevState.err_list, password_confirmation: "Passwords do not match" },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        err_list: { ...prevState.err_list, password_confirmation: "" }, // Clear previous error message
      }));
    }

    setState((prevState) => ({
      ...prevState,
      [name]:
        name === "recieveUpdate" || name === "termsandCon" ? checked : value,
    }));
  };

  const register = async (e) => {
    e.preventDefault();

    // Validate TermsandCon before submission
    if (!state.termsandCon) {
      setOpenSnackBar({
        color: "danger",
        open: true,
        message: "You must agree to the Terms and Conditions to register.",
      });
      return;
    }
    setOpenBackDrop(true);
    try {
      const res = await axios.post("/api/add-user", state);

      if (res.data.status === 200) {
        setOpenSnackBar({
          color: "success",
          open: true,
          message: "Registered Success! Please check your email to verify your account",
        });
        setState((prevState) => ({
          ...prevState,
          fullname: "",
          password: "",
          email: "",
          username: "",
          mobileNum: "",
          nationality: "",
          password_confirmation: "",
          termsandCon: false,
          err_list: [],
        }));
        setOpenBackDrop(false);
      } else {
        setState((prevState) => ({
          ...prevState,
          err_list: res.data.validation_errs,
        }));
        setOpenBackDrop(false);
      }
    } catch (error) {
      setOpenSnackBar({
        color: "danger",
        open: true,
        message: "An error occured, Please try again.",
      });
      console.error("Error Inserting user Info", error);
      setOpenBackDrop(false);
    }
  };

  return (
    <div className="frw-Main">
      <div className="fr-wrapper">
        <Card
          size="lg"
          variant="outlined"
          orientation="horizontal"
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: { lg: "row", xs: "column" },
          }}
        >
          {ismeduimScreen ? (
            <Box
              sx={{
                width: "100%",
                bgcolor: "#0B6BCB",
                height: "10rem",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                p: 2,
                color: "#fff",
              }}
            >
              <h2>Become Part of Property Web Hub</h2>
              <p>Create your account and connect with us</p>

            </Box>
          ) : (
            <CardOverflow
              variant="solid"
              color="primary"
              sx={{
                flex: { lg: "0 0 400px" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: "var(--Card-padding)",
              }}
            >
              <div className="title">
                <h2>Become Part of Property Web Hub</h2>
                <p>Create your account and connect with us</p>
                <p></p>
              </div>
            </CardOverflow>
          )}
          <CardContent sx={{ gap: 1.5, width: "100%" }}>
            <form onSubmit={register} className="r-form">
              <h3
                className="fw-bold t-r-form mt-3"
                style={{ marginBottom: "30px", color: "#0B6BCB" }}
              >
                Registration Form
              </h3>

              <div className="user-details">
                <div className="input-box">
                  <span className="details">Full Name</span>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    name="fullname"
                    value={state.fullname}
                    onChange={handleInput}
                    required
                  />
                  {state.err_list.fullname && (
                    <span className="validation_errs">
                      {state.err_list.fullname}
                    </span>
                  )}
                </div>

                <div className="input-box">
                  <span className="details">Nationality</span>
                  <input
                    type="text"
                    placeholder="Enter your nationality"
                    name="nationality"
                    value={state.nationality}
                    onChange={handleInput}
                    required
                  />
                  {state.err_list.nationality && (
                    <span className="validation_errs">
                      {state.err_list.nationality}
                    </span>
                  )}
                </div>

                <div className="input-box">
                  <span className="details">Username</span>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    value={state.username}
                    onChange={handleInput}
                    required
                  />
                  {state.err_list.username && (
                    <span className="validation_errs">
                      {state.err_list.username}
                    </span>
                  )}
                </div>

                <div className="input-box">
                  <span className="details">Mobile Number</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter your number"
                    name="mobileNum"
                    maxLength="11"
                    value={state.mobileNum}
                    onChange={handleInput}
                    onKeyPress={(e) => {
                      // Allow only numeric input
                      const regex = new RegExp("^[0-9]*$");
                      if (!regex.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    required
                  />
                  {state.err_list.mobileNum && (
                    <span className="validation_errs">
                      {state.err_list.mobileNum}
                    </span>
                  )}
                </div>

                <div className="input-box">
                  <span className="details">Email Address</span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={state.email}
                    onChange={handleInput}
                    required
                  />
                  {state.err_list.email && (
                    <span className="validation_errs">
                      {state.err_list.email}
                    </span>
                  )}
                </div>

                <div className="input-box">
                  <span className="details">Password</span>
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    name="password"
                    value={state.password}
                    onChange={handleInput}
                    required
                  />
                  {state.err_list.password && (
                    <span className="validation_errs">
                      {state.err_list.password}
                    </span>
                  )}
                </div>
                <div className="input-box">
                  <span className="details">Confirm Password</span>
                  <input
                    type="password"
                    placeholder="Confirm your Password"
                    name="password_confirmation"
                    value={state.password_confirmation}
                    onChange={handleInput}
                    required
                  />
                </div>
              </div>

              {/*Gender*/}
              <div className="gender-details">
                <input
                  type="radio"
                  name="gender"
                  id="dot-1"
                  value="male"
                  onChange={handleInput}
                />
                <input
                  type="radio"
                  name="gender"
                  id="dot-2"
                  value="female"
                  onChange={handleInput}
                />
                <input
                  type="radio"
                  name="gender"
                  id="dot-3"
                  value="other"
                  onChange={handleInput}
                />
                <span className="gender-title">Gender </span>
                {state.err_list.gender && (
                  <span className="validation_errs">
                    {state.err_list.gender}
                  </span>
                )}
                <div className="category">
                  <label htmlFor="dot-1">
                    <span className="dot one"></span>
                    <span className="gender">Male</span>
                  </label>
                  <label htmlFor="dot-2">
                    <span className="dot two"></span>
                    <span className="gender">Female</span>
                  </label>
                  <label htmlFor="dot-3">
                    <span className="dot three"></span>
                    <span className="gender">Prefer not to say</span>
                  </label>
                </div>
              </div>

              <div className="form-check update-details">
                <input
                  className="form-check-input me-2 border border-black"
                  type="checkbox"
                  checked={state.recieveUpdate}
                  onChange={handleInput}
                  name="recieveUpdate"
                  id="u-conditions"
                />

                <label className="form-check-label" htmlFor="u-conditions">
                  <strong>I accept</strong> to receive an updates and promotions
                  from <strong>Property Web Hub</strong>
                </label>
              </div>

              <div className="form-check tc-details">
                <input
                  className="form-check-input me-2 border border-black"
                  type="checkbox"
                  checked={state.termsandCon}
                  onChange={handleInput}
                  name="termsandCon"
                  id="t-conditions"
                />
                <label className="form-check-label" htmlFor="t-conditions">
                  By creating an account <strong>I agree</strong> to the
                  following{" "}
                  <a href="#" onClick={() => setOpenTc(true)}>
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <div className="d-grid gap-2 mt-4">
                <Button variant="primary" size="lg" type="submit">
                  Submit
                </Button>
                <Snackbar
                  autoHideDuration={5000}
                  open={openSnackBar.open}
                  color={openSnackBar.color}
                  variant="solid"
                  onClose={(event, reason) => {
                    if (reason === "clickaway") {
                      return;
                    }
                    setOpenSnackBar((prevState) => ({
                      ...prevState,
                      open: false,
                    }));
                  }}
                >
                  {openSnackBar.color === "success" ? (
                    <TaskAltIcon />
                  ) : (
                    <ErrorOutlineIcon />
                  )}
                  {openSnackBar.message}
                </Snackbar>
              </div>
            </form>
          </CardContent>
        </Card>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackDrop}
        >
          Loading, Please Wait...<CircularProgress color="inherit" />
        </Backdrop>
        <Modal open={openTc} onClose={() => setOpenTc(false)}>
          <ModalDialog
            color="neutral"
            size="lg"
            sx={{ overflowY: "auto", maxHeight: "80vh" }}
          >
            <ModalClose></ModalClose>
            <Typography level="title-lg">Terms and Conditions</Typography>
            <Typography level="body-sm">
              Welcome to <strong>Property Web Hub</strong>, these Terms and
              Conditions govern your use of our website (collectively, the
              "Services"). By accessing or using the Services, you agree to be
              bound by these Terms. Please read them carefully before using the
              platform.
            </Typography>

            <Typography level="body-sm">
              <strong>1. Eligibility and Use</strong>
            </Typography>
            <Typography level="body-sm">
              • You must be at least 18 years old to use the Platform.
              <br />• You must be legally capable of entering into contracts.
              <br />• You may not use the Platform for any illegal or
              unauthorized purpose.
              <br />• You must comply with all applicable laws and regulations.
            </Typography>

            <Typography level="body-sm">
              <strong>2. User Accounts</strong>
            </Typography>
            <Typography level="body-sm">
              • You may need to create an account to access certain features of
              the Platform.
              <br />• You are responsible for maintaining the confidentiality of
              your account information, including your password.
              <br />• You are responsible for all activity that occurs under
              your account.
              <br />• You agree to notify us immediately of any unauthorized use
              of your account.
            </Typography>

            <Typography level="body-sm">
              <strong>3. Listings and Bookings</strong>
            </Typography>
            <Typography level="body-sm">
              • You may list your property ("Listing") on the Platform for
              short-term rentals.
              <br />• You are responsible for the accuracy and completeness of
              your Listing information.
              <br />• You must have the legal authority to list the property.
              <br />• You are responsible for complying with all applicable laws
              and regulations related to your Listing.
              <br />• You are responsible for communicating with potential
              guests and renters.
              <br />• You are responsible for collecting and processing payments
              directly with guests.
              <br />• We may remove Listings that violate our Terms or are
              otherwise deemed inappropriate.
            </Typography>

            <Typography level="body-sm">
              <strong>4. Guest and Renter Conduct</strong>
            </Typography>
            <Typography level="body-sm">
              • Guests and renters must comply with all applicable laws and
              regulations.
              <br />• Guests and renters must treat the property with respect.
              <br />• Guests and renters must communicate with the property
              owner or manager appropriately.
              <br />• We may deny or revoke access to the Platform for guests or
              renters who violate our Terms.
            </Typography>

            <Typography level="body-sm">
              <strong>5. Fees and Payments</strong>
            </Typography>
            <Typography level="body-sm">
              • We may charge a service fee to property owners and guests.
              <br />• You are responsible for paying all applicable fees.
              <br />• We may offer different payment methods.
              <br />• We are not responsible for any errors or delays in
              processing payments.
            </Typography>

            <Typography level="body-sm">
              <strong>6. Content and intellectual Property</strong>
            </Typography>
            <Typography level="body-sm">
              • You retain all ownership rights to your content.
              <br />• You grant us a non-exclusive, worldwide license to use
              your content on the Platform.
              <br />• You are responsible for ensuring that your content does
              not infringe on the rights of others.
              <br />• We are not responsible for any content that you or others
              submit to the Platform.
            </Typography>

            <Typography level="body-sm">
              <strong>7. Disclaimers and Warranties</strong>
            </Typography>
            <Typography level="body-sm">
              • THE PLATFORM IS PROVIDED "AS IS" AND WITHOUT WARRANTY OF ANY
              KIND.
              <br />• WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING,
              BUT NOT LIMITED TO, THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR
              A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              <br />• WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED,
              ERROR-FREE, OR SECURE.
              <br />• WE ARE NOT RESPONSIBLE FOR ANY DAMAGES ARISING OUT OF YOUR
              USE OF THE PLATFORM.
            </Typography>

            <Typography level="body-sm">
              <strong>8. Limitation of Liability</strong>
            </Typography>
            <Typography level="body-sm">
              • TO THE FULLEST EXTENT PERMITTED BY LAW, WE WILL NOT BE LIABLE
              FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES ARISING OUT OF YOUR USE OF THE PLATFORM.
            </Typography>

            <Typography level="body-sm">
              <strong>9. Indemnification</strong>
            </Typography>
            <Typography level="body-sm">
              • You agree to indemnify and hold us harmless from and against any
              and all claims, losses, damages, liabilities, costs, and expenses
              (including attorneys' fees) arising out of or relating to your use
              of the Platform or your breach of these Terms.
            </Typography>

            <Typography level="body-sm">
              <strong>10. Dispute Resolution</strong>
            </Typography>
            <Typography level="body-sm">
              • All disputes arising out of or relating to these Terms will be
              resolved by binding arbitration in accordance with the rules of
              the American Arbitration Association.
              <br />• The arbitration will be conducted in English and will be
              held in [Location].
              <br />• The arbitrator's award will be final and binding on the
              parties.
            </Typography>

            <Typography level="body-sm">
              <strong>11. Governing Law</strong>
            </Typography>
            <Typography level="body-sm">
              • These Terms will be governed by and construed in accordance with
              the laws of the State of [State], without regard to its conflict
              of laws provisions.
            </Typography>

            <Typography level="body-sm">
              <strong>12. Entire Agreement</strong>
            </Typography>
            <Typography level="body-sm">
              • These Terms constitute the entire agreement between you and us
              regarding your use of the Platform.
            </Typography>

            <Typography level="body-sm">
              <strong>13. Termination</strong>
            </Typography>
            <Typography level="body-sm">
              • We may terminate your access to the Platform for any reason, at
              any time, without notice.
              <br />• You may terminate your account at any time.
            </Typography>

            <Typography level="body-sm">
              <strong>14. Modification</strong>
            </Typography>
            <Typography level="body-sm">
              • We may modify these Terms at any time by posting the amended
              Terms on the Platform.
              <br />• Your continued use of the Platform following the posting
              of amended Terms constitutes your acceptance of those Terms.
            </Typography>

            <Typography level="body-sm">
              <strong>15. Severability</strong>
            </Typography>
            <Typography level="body-sm">
              • If any provision of these Terms is held to be invalid or
              unenforceable, such provision will be struck from these Terms and
              the remaining
            </Typography>
          </ModalDialog>
        </Modal>
      </div>
    </div>
  );
};
