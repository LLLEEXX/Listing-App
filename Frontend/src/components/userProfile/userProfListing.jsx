import * as React from "react";

import {
  Typography,
  IconButton,
  Grid,
  Container,
  Table,
  Button,
  Divider,
  Box,
  Sheet,
  Modal,
  ModalDialog,
  ModalClose,
} from "@mui/joy";

import Snackbar from "@mui/joy/Snackbar";
import Pagination from "@mui/material/Pagination";

import { useNavigate } from "react-router-dom";

//Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ErrorIcon from "@mui/icons-material/Error";

import { useState, useEffect } from "react";

const getPropertyName = (modelName) => {
  switch (modelName) {
    case "Rent_Condo":
      return "Condominium";
    case "PostHouseLot":
      return "House and Lot";
    case "PostLot":
      return "Lot";
    case "PostWareHouse":
      return "Warehouse";
    case "PostCommSpace":
      return "Commercial Space";
    case "PostOffice":
      return "Office";
    case "SaleCondo":
      return "Condominium";
    case "SaleHouseLot":
      return "House And Lot";
    case "SaleLot":
      return "Lot";
    case "SaleWareHouse":
      return "Warehouse";
    case "SaleCommSpace":
      return "Commercial Space";
    case "SaleOffice":
      return "Office";
    default:
      return "Unknown";
  }
};

import axios from "../../utility/axios";
import { getApp } from "../../utility/AppManager";

//Use Queries MUI IMPORT
import { useBreakpoint } from "../../utility/scriptUtility";

export default function UserProfListing() {
  const navigate = useNavigate();
  const { isSmallScreen } = useBreakpoint();

  // RETRIEVE USER DATA
  const [userListing, setUserListing] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [snackbar, setSnackBar] = useState({
    open: false,
    color: "success",
    message: "",
    icon: "",
  });

  const fetchPropListing = async () => {
    try {
      const App = getApp();
      const config = {
        headers: {
          Authorization: `Bearer ${App}`,
        },
      };

      const response = await axios.get(
        `/api/user-Listing?page=${currentPage}`,
        config
      );
      if (response.status >= 200 && response.status < 300) {
        setUserListing(response.data);
        setTotalPages(response.data.meta.last_page);
      } else {
        console.error("Failed to retrieve user data:", response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPropListing();
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  //Modal Style
  const [open, setOpen] = useState(false);

  const circleStyle = {
    backgroundColor: "#F7C5C5", // Change to your desired background color
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const [revUserListing, setRevUserListing] = useState({
    id: "",
    property: "",
  });

  const deleteListing = async () => {
    try {
      const App = getApp();
      const config = {
        headers: {
          Authorization: `Bearer ${App}`,
        },
      };

      const response = await axios.delete(
        `/api/user-revListing?id=${revUserListing.id}&property=${revUserListing.property}`,
        config
      );

      if(response.status === 200){
        console.log(response.data.message);
        setOpen(false);
        setRevUserListing({
          id: '',
          property: ''
        })
        setSnackBar({
          open: true,
          color: "success",
          message: response.data.message,
          icon: <DoneAllIcon />,
        });
        fetchPropListing();
      }
    } catch (error) {
      if (error.response) {
        setSnackBar({
          open: true,
          color: "danger",
          message: error.response.data.message,
          icon: <ErrorIcon />,
        });
      } else {
        console.error("Error:", error.message); // This will log any other errors
      }
    }
  };

  const alertDelete = (id, property) => {
    setOpen(true);
    setRevUserListing({
      id: id,
      property: property,
    });
  };

  const abortRev = () => {
    setOpen(false);
    setRevUserListing({
      id: "",
      property: "",
    });
  };

  return (
    <Container sx={{ padding: "20px 20px 20px 20px" }}>
      <Divider
        inset="context"
        sx={{
          backgroundColor: "#636B74",
          mt: { xs: 0, md: 1.5 },
          display: { xs: "none", md: "block" },
        }}
      />
      <Box sx={{ mt: { md: 4, xs: 0 } }}>
        <Typography
          startDecorator={<HomeWorkRoundedIcon color="success" />}
          level="h3"
        >
          Listed Properties
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Sheet
          sx={{
            border: "1px solid #d3d3d3",
            borderRadius: "10px",
            overflow: "auto",
            height: "auto",
          }}
        >
          <Table
            borderAxis="x"
            color="primary"
            stickyHeader
            variant="soft"
            size="lg"
            sx={{
              "@media (max-width: 600px)": {
                overflowX: "auto",
                display: "block",
                tableLayout: "auto",
              },
            }}
          >
            <thead>
              <tr>
                <th style={{ width: "45%" }}>Property Name</th>
                <th>Property Type</th>
                <th>Property Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userListing && userListing.data.length > 0 ? (
                userListing.data.map((listing) => (
                  <tr key={listing.id}>
                    <td sx={{ wordBreak: "break-word" }}>{listing.title}</td>
                    <td>{getPropertyName(listing.modelName)}</td>
                    <td>{listing.listingStatus}</td>
                    <td>
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 2,
                        }}
                      >
                        {/* Edit Button */}
                        {isSmallScreen ? (
                          <IconButton
                            className="IconEditBtn"
                            onClick={() =>
                              navigate(
                                `/viewing/${listing.id}/${listing.modelName}`
                              )
                            }
                          >
                            <VisibilityIcon sx={{ fill: "white" }} />
                          </IconButton>
                        ) : (
                          <Button
                            className="editBtn"
                            onClick={() =>
                              navigate(
                                `/viewing/${listing.id}/${listing.modelName}`
                              )
                            }
                          >
                            <span className="editLabel">View</span>
                          </Button>
                        )}
                        {/* Delete Button*/}
                        <IconButton
                          className="deleteBtn"
                          onClick={() =>
                            alertDelete(listing.id, listing.modelName)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 69 14"
                            className="svgIcon bin-top delIcon"
                          >
                            <g clipPath="url(#clip0_35_24)">
                              <path
                                fill="black"
                                d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_35_24">
                                <rect
                                  fill="white"
                                  height="14"
                                  width="69"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 69 57"
                            className="svgIcon bin-bottom delIcon"
                          >
                            <g clipPath="url(#clip0_35_22)">
                              <path
                                fill="black"
                                d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_35_22">
                                <rect
                                  fill="white"
                                  height="57"
                                  width="69"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                        </IconButton>
                      </Grid>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No listings found</td>
                </tr>
              )}

              {/* Repeat the above structure for other rows */}
            </tbody>
          </Table>
          <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              color="primary"
              onChange={handlePageChange}
            />
          </Box>
        </Sheet>
      </Box>

      {/*Modal Confirmation*/}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => abortRev()}
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
            <Typography level="h4">Delete Property?</Typography>
            <Divider
              inset="context"
              sx={{ backgroundColor: "#636B74", mt: 1.5 }}
            />
            <Typography level="title-md" sx={{ mt: 2 }}>
              Are you sure you want to delete this property?
            </Typography>
            <Button fullWidth sx={{ mt: 2 }} size="md" onClick={deleteListing}>
              Yes
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        color={snackbar.color}
        variant="solid"
        onClose={() => setSnackBar({ open: false })}
      >
        {snackbar.icon} {snackbar.message}
      </Snackbar>
    </Container>
  );
}
