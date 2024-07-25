import * as Icon from "react-bootstrap-icons";
import { useState, useEffect, useRef, lazy } from "react";
import { Button, Row, Col, ButtonGroup } from "react-bootstrap";
import "./../assets/viewing.css";
import useScreenWidth from "../utility/scriptUtility";
import { useNavigate, useParams } from "react-router-dom";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import * as React from "react";

import ModalButton from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { ModalDialog, Divider } from "@mui/joy";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/joy/Box";

import ViewingAmenities from "./ViewingAmenities";

//Icons
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import HouseSidingOutlinedIcon from "@mui/icons-material/HouseSidingOutlined";
import HolidayVillageOutlinedIcon from "@mui/icons-material/HolidayVillageOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ErrorIcon from "@mui/icons-material/Error";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import Snackbar from "@mui/joy/Snackbar";

import { getApp } from "../utility/AppManager";
import axios from "../utility/axios";

const Viewing = () => {
  const { id, property } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  {
    /*Modal Function*/
  }
  const Navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const toggleContent = () => {
    setShowFullContent(!showFullContent);

    //Modal Style
    const modalStyle = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
  };

  //Contact Agent FullScreen
  const useViewWidth = useScreenWidth();
  // if(useViewWidth === 951){
  //   window.location.reload
  // }
  const elementRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (useViewWidth <= 950) {
        elementRef.current.classList.add("fixedBottom");
      } else {
        elementRef.current.classList.remove("fixedBottom");

        if (scrollPosition >= 770) {
          elementRef.current.classList.add("fixedTOp");
        } else {
          elementRef.current.classList.remove("fixedTOp");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [useViewWidth]);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const [propData, setPropData] = useState({});

  const takeSrc = (GoogleLink) => {
    const srcRegex = /src="([^"]*)"/;
    const srcMatch = GoogleLink.match(srcRegex);
    const src = srcMatch ? srcMatch[1] : null;
    return src;
  };

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
          `/api/fetch-OneProp?id=${id}&property=${property}`,
          config
        );

        if (response.status === 200) {
          setPropData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProp();
  }, [id, property]);

  let previewImage = [];

  if (propData && propData.images) {
    previewImage = propData.images.map((image) => ({
      original: `http://127.0.0.1:8000/storage/${image.path}`,
      thumbnail: `http://127.0.0.1:8000/storage/${image.path}`,
    }));
  }

  const [snackbar, setSnackBar] = useState({
    open: false,
    color: "success",
    message: "",
    icon: "",
  });

  const insertFav = async (id, property) => {
    try {
      const App = getApp();
      const config = {
        headers: {
          Authorization: `Bearer ${App}`,
        },
      };

      const data = {
        Prop_id: id,
        Property: property,
      };

      const response = await axios.post(`/api/insert-favorite`, data, config);

      if (response.status === 200) {
        setSnackBar({
          open: true,
          color: "success",
          message: "Successfully added to your favorites",
          icon: <DoneAllIcon />,
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 422) {
        setSnackBar({
          open: true,
          color: "danger",
          message: error.response.data.message,
          icon: <ErrorIcon />,
        });
      }
    }
  };

  const circleStyle = {
    backgroundColor: "#F7C5C5", // Change to your desired background color
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="viewingContainer">
      <Row className="row-header-con mx-auto align-items-center">
        <Col xs={12} md={9} className="viewingHeader">
          <h1 style={{ wordWrap: "break-word" }}>
            {propData && propData.title}
          </h1>
          <span className="sub">{propData && propData.address}</span>
          <div className="priceListing">
            <Typography
              fontSize={{
                md: "xl4",
                xs: "xl3",
              }}
              lineHeight={1}
              sx={{
                alignItems: "flex-start",
                mt: 2,
                fontWeight: "700",
                color: "#0B6BCB",
              }}
            >
              {propData &&
                propData.rate &&
                propData.rate.toLocaleString("en-PH", {
                  style: "currency",
                  currency: "PHP",
                  minimumFractionDigits: 0,
                })}
            </Typography>
          </div>
        </Col>

        <Col xs={12} md={3} className="viewing-buttons">
          <Button
            variant="outline-danger"
            onClick={() => insertFav(id, property)}
          >
            <Icon.Bookmark className="me-2" />
            Favorites
          </Button>
        </Col>
      </Row>

      {/*Gallery Images*/}
      {isFullscreen === false && propData.images ? (
        <div id="gallery">
          {propData.images.slice(0, 5).map((image, index) => (
            <div
              className={index === 0 ? "photo photo-span" : "photo"}
              key={index}
            >
              {index === 0 && (
                <img
                  src={`http://127.0.0.1:8000/storage/${image.path}`}
                  alt={`Image ${index + 1}`}
                />
              )}
              {index !== 0 && (
                <img
                  src={`http://127.0.0.1:8000/storage/${image.path}`}
                  alt={`Image ${index + 1}`}
                />
              )}
            </div>
          ))}
          <div className="modal-view-btn">
            <Button
              variant="light"
              className="v-btn"
              onClick={() => setIsFullscreen(true)}
            >
              <Icon.Grid3x3Gap className="me-1" />
              See All Photos
            </Button>
          </div>
        </div>
      ) : (
        <Row className="d-flex justify-content-end">
          <Button
            variant="dark"
            className="mb-2 ImageGalleryBtn"
            onClick={() => setIsFullscreen(false)}
          >
            <Icon.XLg />
          </Button>
          <ImageGallery
            items={propData && propData.images ? previewImage : []}
            lazyLoad={true}
            showPlayButton={false}
          />
        </Row>
      )}

      <div className="details-container">
        <Row>
          <Col xs={12} md={9}>
            <ButtonGroup
              id="scrollspy-items"
              className="d-flex gap-1 flex-row text-center overflow-auto s-items"
            >
              <Button
                variant="outline-primary"
                className="p-1 rounded"
                href="#key-details"
              >
                Key Details
              </Button>
              <Button
                variant="outline-primary"
                className="p-1 rounded"
                href="#overview-unit"
              >
                Overview
              </Button>
              <Button
                variant="outline-primary"
                className="p-1 rounded"
                href="#amenities"
              >
                Amenities
              </Button>
              <Button
                variant="outline-primary"
                className="p-1 rounded"
                href="#g-map"
              >
                Location
              </Button>
            </ButtonGroup>

            <div
              data-bs-spy="scroll"
              data-bs-target="#simple-list-example"
              data-bs-offset="0"
              data-bs-smooth-scroll="true"
              className="scrollspy-details"
              tabIndex="0"
            >
              {/*Key-Details*/}
              <div id="overview-unit">
                <h4 className="title-details">Key Details</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="row" className="th-details">
                        Property Type
                      </th>
                      <th
                        scope="row"
                        className="th-details"
                        style={{
                          opacity:
                            (propData && propData.buildName) ||
                            (propData && propData.officeType)
                              ? 1
                              : 0.3,
                        }}
                      >
                        {propData && (propData.buildName || propData.officeType)
                          ? propData.buildName
                            ? "Building Name"
                            : "Office Type"
                          : "Building Name"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <HomeWorkOutlinedIcon className="me-1" />
                        {propData && propData.proptype}
                      </td>
                      <td
                        style={{
                          opacity:
                            (propData && propData.buildName) ||
                            (propData && propData.officeType)
                              ? 1
                              : 0.3,
                        }}
                      >
                        <ApartmentRoundedIcon className="me-1" />
                        {propData && (propData.buildName || propData.officeType)
                          ? propData.buildName || propData.officeType
                          : "N/A"}
                      </td>
                    </tr>
                  </tbody>

                  <thead>
                    <tr>
                      <th scope="row" className="th-details">
                        Location
                      </th>
                      <th
                        scope="row"
                        className="th-details"
                        style={{
                          opacity: propData && propData.size ? 1 : 0.3,
                        }}
                      >
                        Size
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <RoomOutlinedIcon className="me-1" />
                        {propData && propData.city}
                      </td>
                      <td
                        style={{ opacity: propData && propData.size ? 1 : 0.3 }}
                      >
                        <AutoAwesomeMosaicOutlinedIcon className="me-2" />
                        {propData && propData.size ? propData.size : "N/A"} SQM
                      </td>
                    </tr>
                  </tbody>

                  {/*mas maganda if Lalabas sa House Lot */}
                  <thead>
                    <tr>
                      <th
                        scope="row"
                        className="th-details"
                        style={{ opacity: propData && propData.vill ? 1 : 0.3 }}
                      >
                        Village Name
                      </th>
                      <th
                        scope="row"
                        className="th-details"
                        style={{
                          opacity: propData && propData.houseType ? 1 : 0.3,
                        }}
                      >
                        House Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{ opacity: propData && propData.vill ? 1 : 0.3 }}
                      >
                        <HolidayVillageOutlinedIcon className="me-2" />
                        {propData && propData.vill ? propData.vill : "N/A"}
                      </td>
                      <td
                        style={{
                          opacity: propData && propData.houseType ? 1 : 0.3,
                        }}
                      >
                        <HouseSidingOutlinedIcon className="me-2" />
                        {propData && propData.houseType
                          ? propData.houseType
                          : "N/A"}
                      </td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th
                        scope="row"
                        className="th-details"
                        style={{
                          opacity: propData && propData.lotArea ? 1 : 0.3,
                        }}
                      >
                        Lot Area
                      </th>
                      <th
                        scope="row"
                        className="th-details"
                        style={{
                          opacity: propData && propData.floorArea ? 1 : 0.3,
                        }}
                      >
                        Floor Area
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          opacity: propData && propData.lotArea ? 1 : 0.3,
                        }}
                      >
                        <CropFreeOutlinedIcon className="me-2" />
                        {propData && propData.lotArea
                          ? propData.lotArea
                          : "N/A"}
                      </td>
                      <td
                        style={{
                          opacity: propData && propData.floorArea ? 1 : 0.3,
                        }}
                      >
                        <OtherHousesOutlinedIcon className="me-2" />
                        {propData && propData.floorArea
                          ? propData.floorArea
                          : "N/A"}
                      </td>
                    </tr>
                  </tbody>

                  <thead>
                    <tr>
                      <th
                        scope="row"
                        className="th-details"
                        style={{
                          opacity: propData && propData.furnish ? 1 : 0.3,
                        }}
                      >
                        Furnishing
                      </th>
                      <th
                        scope="row"
                        className="th-details"
                        style={{ opacity: propData && propData.pet ? 1 : 0.3 }}
                      >
                        Pet Restrictions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          opacity: propData && propData.furnish ? 1 : 0.3,
                        }}
                      >
                        <WeekendOutlinedIcon className="me-2" />
                        {propData && propData.furnish
                          ? propData.furnish
                          : "N/A"}
                      </td>
                      <td
                        style={{ opacity: propData && propData.pet ? 1 : 0.3 }}
                      >
                        <PetsRoundedIcon className="me-2" />{" "}
                        {propData && propData.pet ? propData.pet : "N/A"}
                      </td>
                    </tr>
                  </tbody>

                  <thead>
                    <tr>
                      <th
                        scope="row"
                        className="th-details"
                        style={{ opacity: propData && propData.beds ? 1 : 0.3 }}
                      >
                        Bedroom
                      </th>
                      <th
                        scope="row"
                        className="th-details"
                        style={{
                          opacity: propData && propData.baths ? 1 : 0.3,
                        }}
                      >
                        Bathroom
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{ opacity: propData && propData.beds ? 1 : 0.3 }}
                      >
                        <BedOutlinedIcon className="me-2" />{" "}
                        {propData && propData.beds ? propData.beds : "N/A"}
                      </td>
                      <td
                        style={{
                          opacity: propData && propData.baths ? 1 : 0.3,
                        }}
                      >
                        <BathtubOutlinedIcon className="me-2" />{" "}
                        {propData && propData.baths ? propData.baths : "N/A"}
                      </td>
                    </tr>
                  </tbody>

                  <thead>
                    <tr>
                      <th
                        scope="row"
                        colSpan={5}
                        className="th-details"
                        style={{
                          opacity:
                            propData &&
                            propData.inclusions &&
                            JSON.parse(propData.inclusions).length > 0
                              ? 1
                              : 0.3,
                        }}
                      >
                        Selected Inclusion
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          opacity:
                            propData &&
                            propData.inclusions &&
                            JSON.parse(propData.inclusions).length > 0
                              ? 1
                              : 0.3,
                        }}
                      >
                        <RoomServiceOutlinedIcon className="me-2" />
                        {propData &&
                        propData.inclusions &&
                        JSON.parse(propData.inclusions).length > 0
                          ? JSON.parse(propData.inclusions).join(", ")
                          : "N/A"}
                        {propData && propData.otherInclu
                          ? `,${propData.otherInclu}`
                          : ""}
                      </td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th
                        scope="row"
                        colSpan={5}
                        className="th-details"
                        style={{
                          opacity: propData && propData.purpose ? 1 : 0.3,
                        }}
                      >
                        Purpose
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          opacity: propData && propData.purpose ? 1 : 0.3,
                        }}
                      >
                        <BorderColorOutlinedIcon className="me-2" />
                        {propData && propData.purpose
                          ? propData.purpose
                          : "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/*Overview*/}
              <div id="amenities">
                <h4 className="title-details">Overview</h4>
                <div className="deets">
                  <p style={{ wordWrap: "break-word" }}>
                    {propData && propData.desc}
                  </p>
                </div>
              </div>

              {/*Amenties*/}
              <ViewingAmenities propData={propData} />

              {/*Location*/}
              <div>
                <h4 className="title-details">Location</h4>
                <div className="embed-responsive embed-responsive-16by9">
                  {propData && propData.googleLink ? (
                    <iframe
                      title="Google Maps"
                      src={takeSrc(propData.googleLink)}
                      style={{ width: "100%", height: "400px", border: "0" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  ) : (
                    "No Map Provided"
                  )}
                </div>
              </div>
            </div>
          </Col>

          <Col ref={elementRef} className="rightDiv">
            <section>
              <div className="box1 box">
                <div className="content">
                  <div
                    className={`image ${useViewWidth <= 448 ? "d-none" : ""}`}
                  >
                    <Avatar
                      alt="PropfileImage"
                      src={`http://127.0.0.1:8000/storage/${
                        propData && propData.profile
                      }`}
                      sx={{ width: 80, height: 80, mr: 1 }}
                    />
                  </div>
                  <div className="text-details">
                    <p className="name">{propData.users}</p>
                    <p className="m-year">
                      Member Since {propData.created_year}
                    </p>
                  </div>
                  <div className="button-contact">
                    <ModalButton
                      variant="outlined"
                      color="neutral"
                      onClick={() => setOpen(true)}
                    >
                      <Icon.Telephone className="me-1" />
                      Contact Person
                    </ModalButton>
                  </div>
                </div>
              </div>
            </section>
          </Col>
        </Row>

        {/*Modal*/}
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "'Poppins',sans-serif",
          }}
        >
          <ModalDialog>
            <Box>
              <div style={circleStyle}>
                <ErrorOutlineIcon sx={{ color: "#C41C1C" }} />
              </div>
              <ModalClose variant="plain" sx={{ mt: 2 }} />
            </Box>

            <Box sx={{ mt: 1 }}>
              <Typography level="h4">Send Additional Inquiry?</Typography>
              <Divider
                inset="context"
                sx={{ backgroundColor: "#636B74", mt: 1.5 }}
              />
              <Typography level="title-md" sx={{ mt: 2 }}>
                Are you sure you want to send additional inquiry to the lister?
              </Typography>
              <ModalButton
                fullWidth
                sx={{ mt: 2 }}
                size="md"
                onClick={() => {
                  const sanitizedUsers = propData.users.replace(/\s+/g, "_"); 
                  Navigate(
                    `/inquiries-form-and-contact-details/${sanitizedUsers}`
                  );
                }}
              >
                Yes
              </ModalButton>
            </Box>
          </ModalDialog>
        </Modal>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        color={snackbar.color}
        variant="solid"
        onClose={() => setSnackBar({ open: false })}
      >
        {snackbar.icon} {snackbar.message}
      </Snackbar>
    </div>
  );
};
export default Viewing;
