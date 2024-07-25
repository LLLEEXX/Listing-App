import {
  Button,
  Modal as BootstrapModal,
  Navbar,
  Container,
  Nav,
  Badge,
  Dropdown,
  FloatingLabel,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import {
  Modal as MUIModal,
  ModalDialog,
  ModalClose,
  Typography,
  Avatar,
  Button as MUIBtn,
  Box,
  Divider
} from "@mui/joy";
import FormLabel from "@mui/joy/FormLabel";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import TranslateIcon from "@mui/icons-material/Translate";

import * as Icon from "react-bootstrap-icons";



import "./../assets/navbar.css";
import "../assets/LogIn.css";
import {
  NavLink,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";

//Script Utility
import { useScrollPosition } from "../utility/scriptUtility";
import useScreenWidth from "../utility/scriptUtility";

//Translation
import { useTranslation } from "react-i18next";
import axios from "../utility/axios";

import UserProfileBtn from "./userProfile/UserProfileBtn";
import UserProfileBtnSec from "./userProfile/UserProfileBtnSec";
import { setApp } from "../utility/AppManager";
import { setLoggedIn, getLoggedIn } from "../utility/AppManager";
import { setAppName } from "../utility/AppManager";

function NavBar({ animate }) {
  //Login Status
  const [loginError, setLoginError] = useState(null);
  //Translation
  const [t, i18n] = useTranslation("global");
  const [language, setLanguage] = useState(i18n.language);

  //close mobile menu bar when user selected a link
  const [expanded, setExpanded] = useState(false);

  const handleNavItemClick = () => {
    setExpanded(false);
  };

  const handleChangeLanguage = (newLang) => {
    setLanguage(newLang);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
    setShowLaguageModal(false);
  }, [language]);

  //Navigate
  const Navigate = useNavigate();

  //check Screens Width and Scroll Position
  const navScrollPosition = useScrollPosition();
  const navScreenWidth = useScreenWidth();

  const [showLaguageModal, setShowLaguageModal] = useState(false);

  ///Login states///
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [logInData, setLogInData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInData({ ...logInData, [name]: value });
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", logInData);
      if (res.data.status === 200) {
        setLogInData((prevState) => ({
          ...prevState,
          password: "",
          email: "",
        }));
        setLoggedIn(res.data.role);
        setAppName(res.data.username);
        setApp(res.data.token);
        setShowLoginModal(false);
        setLoginError(null);
      } else {
        console.log(res.data.message);
        setLoginError(res.data.message);

        setTimeout(() => {
          setLoginError(null);
        }, 6000);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 429) {
        setLoginError(error.response.data.error);
      }
    }
  };

  ///END OF Login useStates///

  //Langugage States
  const handleLangaugeModalClose = () => setShowLaguageModal(false);
  const handleLangaugeModalShow = () => {
    setShowLaguageModal(true);
    setExpanded(false);
  };

  const isTop = navScrollPosition === 0;
  const width992px = navScreenWidth <= 991;

  //Logo Condition
  const [logoSrc, setLogoSrc] = useState("assets/o-logo.png");
  const location = useLocation();

  const handleScroll = () => {
    const isHomePage = location.pathname === "/";
    const isTop = window.scrollY === 0;

    const newLogoSrc =
      isHomePage && isTop
        ? "assets/o-logo-white.png" // Logo for the top of the page
        : "assets/o-logo.png"; // Logo for when scrolled

    setLogoSrc(newLogoSrc);
  };

  useEffect(() => {
    const isHomePage = location.pathname === "/";

    handleScroll();

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (isHomePage) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [location]);

  //Style
  const circleStyle = {
    backgroundColor: '#E3EFFB',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <>
      <header>
        <Navbar
          collapseOnSelect
          expand="lg"
          expanded={expanded}
          className={`font-container ${animate
            ? isTop
              ? "navbar-dark transparent"
              : "navbar-light scrolled"
            : `bg-light otherHeight ${!isTop ? "otherPage" : ""}`
            }`}
          fixed="top"
        >
          <Container>
            <Navbar.Brand
              onClick={() => Navigate(`/`)}
              className={`fw-bold fs-5 border-white BrandNameNav${animate ? (isTop ? "text-white" : "text-dark") : "text-dark"
                }`}
              style={{
                cursor: "pointer",
              }}
            >
              <img src={logoSrc} alt="Logo" className="mr-2" />
              Property Web Hub
            </Navbar.Brand>
            <Navbar.Toggle
              onClick={() => setExpanded(!expanded)}
              aria-controls="responsive-navbar-nav"
              className={
                animate
                  ? isTop
                    ? "border-2 border-light-subtle"
                    : "border border-dark-subtle"
                  : "border border-dark-subtle"
              }
            />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className={`rounded ${width992px ? "bg-light" : ""}`}
            >
              <Nav className="d-flex align-items-center w-100 gap-3 p-3">
                {/*<----NAVBAR STYLE */}
                <NavLink
                  to="/"
                  onClick={handleNavItemClick}
                  className={`text-decoration-none fw-semibold navlinkText ${animate
                    ? isTop && !width992px
                      ? "text-white"
                      : "text-dark"
                    : "text-dark"
                    }`}
                >
                  {t("navbar.Home")}
                </NavLink>
                <NavLink
                  onClick={handleNavItemClick}
                  to="/property"
                  className={` text-decoration-none fw-semibold navlinkText ${animate
                    ? isTop && !width992px
                      ? "text-white"
                      : "text-dark"
                    : "text-dark"
                    }`}
                >
                  {t("navbar.Property Management Services")}
                </NavLink>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-Inquire"
                    className={`bg-transparent border-0 fw-semibold navlinkText ${animate
                      ? isTop && !width992px
                        ? "fw-semibold text-white"
                        : "fw-semibold text-dark"
                      : "fw-semibold text-dark"
                      }`}
                  >
                    {t("navbar.Post a Property")}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={NavLink}
                      to="/post-rent"
                      onClick={handleNavItemClick}
                    >
                      {t("navbar.Rent")}
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={NavLink}
                      to="/postingSale"
                      onClick={handleNavItemClick}
                    >
                      {t("navbar.Sale")}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <NavLink
                  to="/plans"
                  className={`text-decoration-none fw-semibold navlinkText ${animate
                    ? isTop && !width992px
                      ? "text-white"
                      : "text-dark"
                    : "text-dark"
                    }`}
                >
                  Plans
                  <Badge bg="danger" className="ms-1">
                    <Icon.CreditCard />
                  </Badge>
                </NavLink>
                {/*LOG IN AND SIGNUP*/}
                {getLoggedIn() ? (
                  getLoggedIn() === "admin" ? (
                    <UserProfileBtnSec
                      animate={animate}
                      isTop={isTop}
                      width992px={width992px}
                    />
                  ) : (
                    <UserProfileBtn
                      animate={animate}
                      isTop={isTop}
                      width992px={width992px}
                    />
                  )
                ) : (
                  <>
                    <NavLink
                      onClick={() => {
                        setShowLoginModal(true);
                        setExpanded(false);
                      }}
                      className={`text-decoration-none fw-semibold navlinkText ${animate
                        ? isTop && !width992px
                          ? "text-white"
                          : "text-dark"
                        : "text-dark"
                        }`}
                    >
                      {t("navbar.Login")}
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className={
                        width992px ? "w-100 d-flex justify-content-center" : ""
                      }
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        onClick={handleNavItemClick}
                        type="button"
                        className={`btn btn-success ${width992px ? "w-50" : ""
                          }`}
                      >
                        {t("navbar.Join")}
                      </button>
                    </NavLink>
                  </>
                )}
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-Inquire"
                    className={`w-100 border-0 d-flex align-items-center gap-2 ${animate
                      ? isTop && !width992px
                        ? "fw-semibold text-white"
                        : "fw-semibold text-white"
                      : "fw-semibold text-white"
                      }`}
                  >
                    <MapsHomeWorkIcon className="me-1" />
                    {t("navbar.Find")}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    <Dropdown.Item as={NavLink} to="/buyProperty">
                      Buy a Property
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/rentProperty">
                      Rent a Property
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <section>
        <Outlet />
      </section>

      {/*LOG IN MODAL*/}
      <MUIModal open={showLoginModal} onClose={handleLoginModalClose}>
        <ModalDialog color="neutral" size="lg">
          <ModalClose></ModalClose>
          <div className="mainLoginContainer">
            <Row>
              <Col className="l-i-login">
                <img
                  src="assets/o-logo.png"
                  className="img-fluid login-bg"
                  alt=""
                ></img>
              </Col>
              <Col>
                <div className="titleInLogin">
                  <h3 style={{ color: "#0B6BCB" }}>Welcome Back!</h3>
                  <span className="tlSpan">Login to your account</span>
                </div>
                <form onSubmit={login}>
                  <div className="loginFormContainer">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email Address"
                      className="mb-2 f-label"
                    >
                      <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        name="email"
                        onChange={handleChange}
                        value={logInData.email}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingPassword"
                      label="Password"
                      className="f-label"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={logInData.password}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </div>
                  <div className="fPassDiv">
                    <div
                      className={`fade-out ${loginError ? "" : "hidden"}`}
                      role="alert"
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      {loginError}
                    </div>
                    <Link
                      to="/ForgotPass"
                      className="fPassLink"
                      onClick={handleLoginModalClose}
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="d-grid gap-2 btnDiv-l">
                    <Button variant="outline-dark" type="submit">
                      Login
                    </Button>
                  </div>
                </form>
                <div className="signUpDiv">
                  <p>
                    Don't have an account yet?{" "}
                    <Link
                      to="/signup"
                      className="r-link"
                      onClick={handleLoginModalClose}
                    >
                      Register here
                    </Link>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </ModalDialog>
      </MUIModal>
    </>
  );
}

export default NavBar;
