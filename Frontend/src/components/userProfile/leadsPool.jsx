import * as React from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import {
  Container,
  Divider,
  Box,
  Sheet,
  Table,
  Option,
  Grid,
  FormLabel,
  Typography,
  Button,
  IconButton,
} from "@mui/joy";

import Pagination from "@mui/material/Pagination";

import { getApp } from "../../utility/AppManager";
import axios from "../../utility/axios";

import LeadsModal from "./LeadsModal";

//MUI Icons
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import RoomIcon from "@mui/icons-material/Room";
import PersonPinRoundedIcon from "@mui/icons-material/PersonPinRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";

//Use Queries MUI IMPORT
import { useBreakpoint } from "../../utility/scriptUtility";

export default function UserLeadsPool() {
  //Modal
  const [open, setOpen] = React.useState(false);

  //View Button
  const { isSmallScreen } = useBreakpoint();

  const [userLeads, setUserLeads] = React.useState();
  const [userLeadsInfo, setUserLeadsInfo] = React.useState();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const closeModal = () => {
    setOpen(false);
  };

  const fetchLeads = async (formData) => {
    try {
      let city = formData.get("city");
      let sortBy = formData.get("sortBy");

      const App = getApp();
      const config = {
        headers: {
          Authorization: `Bearer ${App}`,
        },
      };
      const response = await axios.get(
        `/api/fetch-leads?city=${city}&sortBy=${sortBy}&page=${currentPage}`,
        config
      );

      if (response.status === 200) {
        setUserLeads(response.data);
        setTotalPages(response.data.meta.last_page);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserLead = async (user, propType, action) => {
    try {
      const App = getApp();
      const config = {
        headers: {
          Authorization: `Bearer ${App}`,
        },
      };
      const response = await axios.get(
        `/api/fetch-userLead?id=${user}&propType=${propType}&action=${action}`,
        config
      );

      if (response.status === 200) {
        setUserLeadsInfo(response.data);
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchLeads(new FormData());
  }, [currentPage]);

  const cityChange = (e, newValue) => {
    const formData = new FormData();
    formData.append("city", newValue);
    fetchLeads(formData);
  };

  const statusChange = (e, newValue) => {
    const formData = new FormData();
    formData.append("sortBy", newValue);
    fetchLeads(formData);
  };

  const getPropertyName = (modelName) => {
    switch (modelName) {
      case "BuyCondo":
        return "Condominium";
      case "BuyHouseLot":
        return "House and Lot";
      case "BuyLot":
        return "Lot";
      case "BuyWareHouse":
        return "Warehouse";
      case "BuyCommSpace":
        return "Commercial Space";
      case "BuyOffice":
        return "Office";
      case "RentCondo":
        return "Condominium";
      case "RentHouseLot":
        return "House And Lot";
      default:
        return "Unknown";
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-PH", options);
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
          startDecorator={<PersonPinRoundedIcon color="success" />}
          level="h3"
        >
          Leads Pool
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={8} md={9}>
            <FormLabel>Filter Properties by City</FormLabel>
            <Select
              startDecorator={<RoomIcon />}
              placeholder="Select City"
              indicator={<KeyboardArrowDown />}
              onChange={cityChange}
              name="city"
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
            >
              <Option value="Manila">Manila</Option>
              <Option value="Pasay">Pasay</Option>
              <Option value="Pasig">Pasig</Option>
              <Option value="Taguig">Taguig</Option>
              <Option value="Mandaluyong">Mandaluyong</Option>
              <Option value="Muntinlupa">Muntinlupa</Option>
              <Option value="San Juan">San Juan</Option>
              <Option value="Quezon">Quezon</Option>
              <Option value="Makati">Makati</Option>
              <Option value="Cavite">Cavite</Option>
              <Option value="Parañaque">Parañaque</Option>
              <Option value="Valenzuela">Valenzuela</Option>
              <Option value="Laguna">Laguna</Option>
              <Option value="Tagaytay">Tagaytay</Option>
              <Option value="Cebu">Cebu</Option>
              <Option value="Las Piñas">Las Piñas</Option>
            </Select>
          </Grid>
          <Grid item xs={4} md={3}>
            <FormLabel>Listing Status</FormLabel>
            <Select
              indicator={<KeyboardArrowDown />}
              onChange={statusChange}
              placeholder="sort by"
              name="sortBy"
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
            >
              <Option value="desc">Newest</Option>
              <Option value="asc">Oldest</Option>
            </Select>
          </Grid>
        </Grid>
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
                <th>Name</th>
                <th>City</th>
                <th>Property Type</th>
                <th>Action</th>
                <th>Budget(&#8369;)</th>
                <th>Date Listed</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userLeads &&
                userLeads.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.fullname}</td>
                    <td>{item.city}</td>
                    <td>{getPropertyName(item.propType)}</td>
                    <td>{item.action}</td>
                    <td style={{ fontWeight: "bold" }}>
                      {item.budgetFrom} - {item.budgetTo}
                    </td>
                    <td>{formatDate(item.created_at)}</td>
                    <td>
                      {isSmallScreen ? (
                        <IconButton
                          className="IconEditBtn"
                          onClick={() =>
                            fetchUserLead(item.id, item.propType, item.action)
                          }
                        >
                          <VisibilityIcon sx={{ fill: "white" }} />
                        </IconButton>
                      ) : (
                        <Button
                          className="editBtn"
                          onClick={() =>
                            fetchUserLead(item.id, item.propType, item.action)
                          }
                        >
                          <span className="editLabel">View</span>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
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

      <LeadsModal
        open={open}
        onClose={closeModal}
        userLeadsInfo={userLeadsInfo}
      />
    </Container>
  );
}
