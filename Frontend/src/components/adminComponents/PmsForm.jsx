import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Typography,
  FormLabel,
  Input,
  Grid,
  Sheet,
  Table,
  Snackbar,
} from "@mui/joy";


// MUI Joy
import {
  Pagination,
  FormHelperText, Alert, styled,
  Select, MenuItem
} from "@mui/material";

//Color Variables
import { colors } from "../../utility/scriptUtility";

//MUI ICONS
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DangerousIcon from "@mui/icons-material/Dangerous";
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'; import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RoomIcon from '@mui/icons-material/Room';
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import PestControlIcon from "@mui/icons-material/PestControl";
import HandymanIcon from "@mui/icons-material/Handyman";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AcUnitIcon from "@mui/icons-material/AcUnit";


import axios from "../../utility/axios";
import { getApp } from "../../utility/AppManager";

const PmsForm = () => {
  //CUSTOM CSS THEME
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const ImageBanner = styled("img")({
    height: "30rem",
    width: "30rem",
    objectFit: "cover",
  });

  //IMAGE COMPRESSOR
  const [isImage, setIsImage] = useState(false);

  const handleImageChange = (event) => {
    setIsImage(true);
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      setServicesInfo((prevState) => ({
        ...prevState,
        imagePrev: e.target.result,
        image: file,
      }));
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  };

  function closeModal() {
    setSnackSuccess((prevState) => ({
      ...prevState,
      open: false,
    }));
  }

  const [snackSuccess, setSnackSuccess] = useState({
    open: false,
    message: "",
    color: "success",
    icon: <DoneAllIcon />,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setServicesInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [servicesInfo, setServicesInfo] = useState({
    comp_Name: "",
    address: "",
    city: "Manila",
    email: "",
    contact_Num: "",
    service: "Unit Cleaning",
    image: null,
    imagePrev: null,
    validation_errs: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [fetchedService, setFetchedService] = useState(null);

  const InsertServices = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("comp_Name", servicesInfo.comp_Name);
      formData.append("address", servicesInfo.address);
      formData.append("city", servicesInfo.city);
      formData.append("email", servicesInfo.email);
      formData.append("contact_Num", servicesInfo.contact_Num);
      formData.append("service", servicesInfo.service);
      formData.append("image", servicesInfo.image);

      const App = getApp();
      const config = {
        headers: {
          Authorization: `Bearer ${App}`,
        },
      };

      const response = await axios.post("/api/post-services", formData, config);

      if (response.data.status === 200) {
        setServicesInfo((prevState) => ({
          ...prevState,
          comp_Name: "",
          address: "",
          city: "Manila",
          email: "",
          contact_Num: "",
          service: "Unit Cleaning",
          image: null,
          imagePrev: null,
          validation_errs: [],
        }));
        setIsImage(false);
        setSnackSuccess({
          open: true,
          message: "Form submitted Successfully",
          color: "success",
          icon: <DoneAllIcon />,
        });
      } else {
        setServicesInfo((prevState) => ({
          ...prevState,
          validation_errs: response.data.validation_errs,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const App = getApp();
        const config = {
          headers: {
            Authorization: `Bearer ${App}`,
          },
          params: {
            page: currentPage,
          },
        };

        const response = await axios.get(`/api/fetch-Services`, config);

        if (response.status >= 200 && response.status < 300) {
          setFetchedService(response.data);
          setTotalPages(response.data.meta.last_page);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchServicesData();
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const isExpired = (expiredAt) => {
    const currentDate = new Date();
    const expiredAtDate = new Date(expiredAt);
    return expiredAtDate.getTime() <= currentDate.getTime();
  };

  const handleBanner = async (BannerName) => {
    try {
      const App = getApp();
      const config = {
        headers: {
          Authorization: `Bearer ${App}`,
        },
      };

      const data = {
        comp_Name: BannerName,
      };

      const response = await axios.post("/api/display-banner", data, config);

      if (response.data.status === 200) {
        setSnackSuccess({
          open: true,
          message: "Successfully Added Banner",
          color: "success",
          icon: <DoneAllIcon />,
        });
      } else {
        setSnackSuccess({
          open: true,
          message: response.data.message,
          color: "danger",
          icon: <DangerousIcon />,
        });
      }
    } catch (error) {
      setSnackSuccess({
        open: true,
        message: "Server error. Please try again later",
        color: "danger",
        icon: <DangerousIcon />,
      });
    }
  };

  const handleRemove = async (BannerName) => {
    try {
      const App = getApp();
      const config = {
        headers: {
          Authorization: `Bearer ${App}`,
        },
      };

      const data = {
        comp_Name: BannerName,
      };

      const response = await axios.post("/api/remove-banner", data, config);

      if (response.data.status === 200) {
        // snackSuccess
        setSnackSuccess({
          open: true,
          message: "Successfully Remove Banner",
          color: "success",
          icon: <DoneAllIcon />,
        });
      } else {
        setSnackSuccess({
          open: true,
          message: response.data.message,
          color: "danger",
          icon: <DangerousIcon />,
        });
      }
    } catch (error) {
      setSnackSuccess({
        open: true,
        message: "Server error. Please try again later",
        color: "danger",
        icon: <DangerousIcon />,
      });
    }
  };

  return (
    <form onSubmit={InsertServices}>
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
            startDecorator={<SettingsSuggestOutlinedIcon />}
            sx={{ fontFamily: '"Poppins", sans-serif', letterSpacing: .5 }}
          >
            Property Management and Services
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            minHeight: "35rem",
            alignItems: "center",
            display: "flex",
            borderRadius: 5,
            padding: "30px 0 30px 0",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            mb: 3,
            backgroundColor:'#fff',
          }}
        >
          <Grid
            container
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Grid item md={10}>
              <FormLabel sx={{ fontWeight: "bold", mb: 1 }}>
                Company Name:
              </FormLabel>
              <Input
                placeholder="Enter Company Name"
                variant="outlined"
                fullWidth
                value={servicesInfo.comp_Name}
                onChange={handleInput}
                name="comp_Name"
              />
              {servicesInfo.validation_errs.comp_Name && (
                <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                  {servicesInfo.validation_errs.comp_Name}
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={10}>
              <FormLabel sx={{ fontWeight: "bold", mb: 1 }}>
                Address:
              </FormLabel>
              <Input
                placeholder="Enter Address"
                variant="outlined"
                fullWidth
                value={servicesInfo.address}
                onChange={handleInput}
                name="address"
              />
              {servicesInfo.validation_errs.address && (
                <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                  {servicesInfo.validation_errs.address}
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={10}>
              <FormLabel sx={{ fontWeight: "bold", mb: 1 }}>City:</FormLabel>
              <Select
                startDecorator={<RoomIcon />}
                variant="outlined"
                labelid="Prop-Type-Select"
                value={servicesInfo.city}
                onChange={handleInput}
                size="md"
                name="city"
                fullWidth
                sx={{
                  height: "2.4rem",
                  borderRadius: 1.5,
                  border: '1px solid #DDE7EE',
                  fontSize: "17px",
                }}
              >
                <MenuItem value="Manila">Manila</MenuItem>
                <MenuItem value="Pasay">Pasay</MenuItem>
                <MenuItem value="Pasig">Pasig</MenuItem>
                <MenuItem value="Taguig">Taguig</MenuItem>
                <MenuItem value="Mandaluyong">Mandaluyong</MenuItem>
                <MenuItem value="Pateros">Pateros</MenuItem>
                <MenuItem value="San Juan">San Juan</MenuItem>
                <MenuItem value="Quezon">Quezon</MenuItem>
                <MenuItem value="Makati">Makati</MenuItem>
                <MenuItem value="Cavite">Cavite</MenuItem>
                <MenuItem value="Parañaque">Parañaque</MenuItem>
                <MenuItem value="Laguna">Laguna</MenuItem>
                <MenuItem value="Tagaytay">Tagaytay</MenuItem>
                <MenuItem value="Cebu">Cebu</MenuItem>
                <MenuItem value="Davao">Davao</MenuItem>
                <MenuItem value="Las Piñas">Las Piñas</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={10}>
              <FormLabel id="email" sx={{ fontWeight: "bold", mb: 1 }}>
                Email:
              </FormLabel>
              <Input
                labelid="email"
                fullWidth
                required
                type="email"
                placeholder="Email Address"
                name="email"
                onChange={handleInput}
                value={servicesInfo.email}
              />
              {servicesInfo.validation_errs.email && (
                <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                  {servicesInfo.validation_errs.email}
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={10}>
              <FormLabel sx={{ fontWeight: "bold", mb: 1 }}>
                Contact Number:
              </FormLabel>
              <Input
                placeholder="Enter Contact Number"
                variant="outlined"
                fullWidth
                inputProps={{
                  maxLength: 10,
                }}
                value={servicesInfo.contact_Num}
                onChange={handleInput}
                name="contact_Num"
              />
              {servicesInfo.validation_errs.contact_Num && (
                <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                  {servicesInfo.validation_errs.contact_Num}
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={10}>
              <FormLabel id="PropFurnish" sx={{ fontWeight: "bold", mb: 1 }}>
                Service:
              </FormLabel>
              <Select
                labelid="PropFurnish"
                id="PropFurnish"
                fullWidth
                value={servicesInfo.service}
                onChange={handleInput}
                name="service"
                sx={{
                  height: "2.4rem",
                  borderRadius: 1.5,
                  border: '1px solid #DDE7EE',
                  fontSize: "17px",
                }}
              >
                <MenuItem value="Unit Cleaning"><CleaningServicesIcon /> Unit Cleaning</MenuItem>
                <MenuItem value="Pest Control"><PestControlIcon /> Pest Control</MenuItem>
                <MenuItem value="Renovation"><HandymanIcon /> Renovation</MenuItem>
                <MenuItem value="Lock Smith"><VpnKeyIcon /> Lock Smith</MenuItem>
                <MenuItem value="Grease Trap Cleaning">
                  <WaterDropIcon /> Grease Trap Cleaning
                </MenuItem>
                <MenuItem value="Aircon Cleaning and Repair">
                  <AcUnitIcon /> Aircon Cleaning and Repair
                </MenuItem>
              </Select>
              {servicesInfo.validation_errs.service && (
                <FormHelperText sx={{ color: "tomato", fontSize: 13 }}>
                  {servicesInfo.validation_errs.service}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "center", gap: 2 }}
          >
            <Grid
              item
              md={10}
              sx={{
                width: "100%",
                minHeight: "23rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: '1px solid #97C3F0',
                borderRadius: 5,
              }}
            >
              {isImage ? (
                <ImageBanner
                  src={servicesInfo.imagePrev}
                  alt={servicesInfo.imagePrev}
                />
              ) : (
                <Alert severity="info">Select Company Logo</Alert>
              )}
            </Grid>
            <Grid
              item
              md={10}
              sx={{
                display: "flex",
                flexDirection: { md: "row", xs: "column" },
                gap: 1,
              }}
            >
              <Button
                variant="solid"
                fullWidth
                startDecorator={<InsertPhotoOutlinedIcon />}
                sx={{ position: "relative" }}
              >
                Select Image
                <VisuallyHiddenInput
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                />
              </Button>
              <Button
                type="submit"
                variant="solid"
                fullWidth
                startDecorator={<PublishOutlinedIcon />}
                sx={{ position: "relative" }}
              >
                Submit Service
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Sheet sx={{ p: 3, backgroundColor: '#fff', border: "1px solid #d3d3d3", borderRadius: "10px", overflow: 'auto', height: 'auto', boxShadow: "0 5px 5px rgba(0, 0, 0, 0.2)" }}>
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
                  <th style={{ width: '30%' }}>Company Name:</th>
                  <th>Email:</th>
                  <th>Service:</th>
                  <th>Status:</th>
                  <th style={{ width: "30%" }}></th>
                </tr>
              </thead>
              <tbody>
                {fetchedService ? (
                  fetchedService.data.map((services, index) => (
                    <tr key={index}>
                      <td>{services.comp_Name}</td>
                      <td>{services.email}</td>
                      <td>{services.service}</td>
                      <td>
                        {services.expired_at !== null &&
                          isExpired(services.expired_at) ? (
                          <Typography sx={{ color: "green" }}>
                            DISPLAYED
                          </Typography>
                        ) : (
                          <Typography sx={{ color: "tomato" }}>
                            NOT DISPLAYED
                          </Typography>
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <Button
                          variant="outlined"
                          color="success"
                          className="me-1"
                          onClick={() => {
                            handleBanner(services.comp_Name);
                          }}
                        >
                          Display Banner
                        </Button>
                        <Button
                          variant="outlined"
                          color="danger"
                          onClick={() => {
                            handleRemove(services.comp_Name);
                          }}
                        >
                          Remove Banner
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div style={{ padding: '20px 20px 20px 20px' }}>
                    <Typography level='title-md' sx={{ fontFamily: '"Poppins", sans-serif' }} color="danger" startDecorator={<ErrorOutlineOutlinedIcon />}>No services added yet.</Typography>
                  </div>
                )}
              </tbody>
            </Table>
          </Sheet>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={totalPages}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
        <Snackbar
          open={snackSuccess.open}
          autoHideDuration={5000}
          color={snackSuccess.color}
          variant="solid"
          onClose={closeModal}
        >
          {snackSuccess.icon} {snackSuccess.message}
        </Snackbar>
      </Box>
    </form>
  );
};

export default PmsForm;
