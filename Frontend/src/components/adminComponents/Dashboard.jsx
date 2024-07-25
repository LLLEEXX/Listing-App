import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Divider,
  Table,
  Sheet
} from "@mui/joy";

import { CSVLink } from "react-csv";

//Import Array of colors
import { colors } from "../../utility/scriptUtility";

//MUI CHART
import { BarChart } from "@mui/x-charts/BarChart";

import { useState, useEffect } from "react";
import axios from "../../utility/axios";
import { getApp } from "../../utility/AppManager";

//MUI ICONS
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import LoopIcon from '@mui/icons-material/Loop';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'; import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const ActivateAccount = () => {
  const forRent = [20, 32, 13, 32, 15, 30, 12, 60, 32, 20, 13, 30];
  const forSale = [30, 22, 43, 42, 25, 20, 2, 50, 22, 10, 3, 20];
  const xLabelsOne = [
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
  ];

  const [propCount, setPropCount] = useState({
    RentCount: 0,
    SaleCount: 0,
    OverAll: 0,
  });

  const [propListing, setPropListing] = useState([]);

  useEffect(() => {
    fetchPropCount();
  }, []);

  const fetchPropCount = async () => {
    try {
      const App = getApp();
      const config = {
        headers: {
          Authorization: `Bearer ${App}`,
        },
      };

      const response = await axios.get("/api/prop-count", config);

      if (response.status === 200) {
        setPropCount({
          RentCount: response.data.countForRent,
          SaleCount: response.data.countForSale,
          OverAll: response.data.countForOverAll,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPropDetails = async () => {
    try {
      const App = getApp();
      const config = {
        headers: {
          Authorization: `Bearer ${App}`,
        },
      };

      const response = await axios.get("/api/prop-listing", config);

      if (response.status === 200) {
        setPropListing(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPropMonthDetails = async () => {
    try {
      const App = getApp();
      const config = {
        headers: {
          Authorization: `Bearer ${App}`,
        },
      };

      const response = await axios.get("/api/prop-listing-Monthly", config);

      if (response.status === 200) {
        setPropListing(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshData = () => {
    fetchPropCount();
  };

  const [errorMessage, setErrorMessage] = useState('');

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
      default:
        return "Unknown";
    }
  };

  return (
    <Box
      component="section"
      sx={{
        p: 2,
        minHeight: "100vh",
        maxHeight: "100vh",
        overflow: "auto",
      }}
    >
      <Box
        component="header"
        sx={{
          minHeight: 70,
          p: 2.5,
          backgroundColor: "#fff",
          borderRadius: 5,
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          level="h2"
          startDecorator={<LeaderboardOutlinedIcon />}
          sx={{ fontFamily: '"Poppins", sans-serif', letterSpacing: .5 }}
        >
          Dashboard
        </Typography>
        <Button
          color="primary"
          variant="outlined"
          onClick={refreshData}
          sx={{ width: "150px" }}
          startDecorator={<LoopIcon />}
        >
          Refresh
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, }}>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mb: 2,
            width: "50%",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              backgroundColor: '#fff',
              borderRadius: 5,
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: "space-between",
              p: 3,
              border: "1px solid #0B6BCB",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, width: "86%", }}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="assets/town.png"
                  sx={{ width: 86, height: 86 }}
                />
              </Box>
              <Stack direction="column" sx={{ width: "86%" }}>
                <Typography
                  level="title-lg"
                  sx={{ color: colors.black, fontWeight: "Bold", p: 1.5, fontFamily: '"Poppins",sans-serif' }}
                >
                  Total Properties
                </Typography>
                <Divider
                  sx={{ borderRadius: 5, border: `3px solid ${colors.black}` }}
                />
                <Stack
                  sx={{ width: "100%", p: 1.5, gap: 2 }}
                  direction="row"
                ></Stack>
              </Stack>
            </Box>
            <Box sx={{ width: "fit-content" }}>
              <Typography
                level="h3"
                sx={{ color: colors.black, fontWeight: "bold" }}
              >
                {propCount && propCount.OverAll}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2,}}>
            {/*BOX FOR TOTAL PROPERTY RENT*/}
            <Box
              sx={{
                minHeight: 100,
                width: "50%",
                backgroundColor: "#fff",
                border: "1px solid #0B6BCB",
                borderRadius: 5,
                p: 2.5,
                display: "flex",
                gap: 2,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Stack direction="column">
                <Typography
                  level="h4"
                  sx={{ fontWeight: "bold", width: "10rem" }}
                >
                  {propCount && propCount.RentCount}
                </Typography>
                <Typography sx={{ width: "10rem" }}>
                  Properties for Rent
                </Typography>
              </Stack>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                }}
              >
                <HomeWorkOutlinedIcon
                  sx={{ width: 80, height: 80, color: "#0B6BCB" }}
                />
              </Box>
            </Box>
            {/*BOX FOR TOTAL PROPERTY SALE*/}
            <Box
              sx={{
                minHeight: 100,
                width: "50%",
                backgroundColor: "#fff",
                border: "1px solid #0B6BCB",
                borderRadius: 5,
                p: 2.5,
                display: "flex",
                gap: 2,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Stack direction="column">
                <Typography
                  level="h4"
                  sx={{ fontWeight: "bold", width: "10rem" }}
                >
                  {propCount && propCount.SaleCount}
                </Typography>
                <Typography sx={{ width: "12rem" }}>
                  Properties for Sale
                </Typography>
              </Stack>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                }}
              >
                <HomeWorkOutlinedIcon
                  sx={{ width: 80, height: 80, color: "#0B6BCB" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "50%", backgroundColor: '#fff', p: 1.5, borderRadius: 5, border: "1px solid #0B6BCB", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", }}>
          <Box >
            <BarChart
              width={600}
              height={284}
              series={[
                {
                  id: "forRent",
                  data: forRent,
                  label: "For Rent",
                  area: true,
                  color: colors.primary,
                },
                {
                  id: "forSale",
                  data: forSale,
                  label: "For Sale",
                  area: true,
                  color: colors.accent,
                },
              ]}
              xAxis={[{ scaleType: "band", data: xLabelsOne }]}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          {/*LISTINGBUTTON*/}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button startDecorator={<AssignmentOutlinedIcon />} onClick={fetchPropDetails}>Weekly Posting <KeyboardArrowRightOutlinedIcon /> </Button>
            <Button startDecorator={<CalendarMonthOutlinedIcon />} onClick={fetchPropMonthDetails}>Monthly Posting <KeyboardArrowRightOutlinedIcon /></Button>
          </Box>
          <Box>
            {propListing.length > 0 ? (<CSVLink style={{ textDecoration: 'none', color: '#1F7A1F' }} data={propListing} filename={'Property_Web_Hub.csv'}><FileDownloadOutlinedIcon /> Download CSV</CSVLink>) :
              <Typography level='title-md' sx={{ fontFamily: '"Poppins", sans-serif' }} color="danger" startDecorator={<ErrorOutlineOutlinedIcon />}>No property displayed yet.</Typography>}
          </Box>
        </Box>
        <Box>
          <Sheet sx={{ mt: 2, p: 3, backgroundColor: '#fff', border: "1px solid #d3d3d3", borderRadius: "10px", overflow: 'auto', height: 'auto', boxShadow: "0 5px 5px rgba(0, 0, 0, 0.2)"  }}>
            {propListing.length === 0 ? ( // Check for empty array
              <tr>
                <th colSpan={4}><Typography sx={{ p: 2 }}>Loading...</Typography></th>
              </tr>
            ) : (
              <Table
                borderAxis="both"
                color="primary"
                stickyHeader
                variant="soft"
                size="lg"
                sx={{
                  '@media (max-width: 600px)': {
                    overflowX: 'auto',
                    display: 'block',
                    tableLayout: 'auto',
                  },
                }}
              >
                <thead>
                  <tr>
                    <th style={{ width: '32%' }}>Property Title</th>
                    <th>Posted By</th>
                    <th>Property Type</th>
                    <th>Property Status</th>
                  </tr>
                </thead>
                <tbody>
                  {propListing.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.users}</td>
                      <td>{getPropertyName(item.modelName)}</td>
                      <td>{item.listingStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Sheet>
        </Box>
      </Box>
    </Box>
  );
};

export default ActivateAccount;
