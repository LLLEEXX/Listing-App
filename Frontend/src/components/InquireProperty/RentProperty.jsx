import { useState, useEffect } from "react";

//MUI IMPORTS
import {
  Box,
  Container,
  Typography,
  Stack,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

//Icons
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EditNoteIcon from "@mui/icons-material/EditNote";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";

import RentCondo from "./RentCondo";
import RentHouseLot from "./RentHouseLot";
import RentLot from "./RentLot";
import RentWarehouse from "./RentWarehouse";
import RentCommSpace from "./RentCommSpace";
import RentOffice from "./RentOffice";

export const RentProperty = () => {
  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedRentProperty, setSelectedRentProperty] =
    useState("condominium");

  return (
    <Container component="section" sx={{ mt: 9, height: "100%" }}>
      <Box component="header" sx={{ mt: 11, mb: 6 }}>
        <h2 style={{ fontWeight: "bold", fontSize: "35px" }}>
          <ConfirmationNumberIcon sx={{ color: "#DB4437" }} /> Rent a Property
        </h2>
      </Box>

      <Stack component="section">
        <Stack sx={{ mb: 2, borderBottom: 1, py: 2 }}>
          <Typography
            sx={{
              fontFamily: '"Poppins",sans-serif',
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            <EditNoteIcon /> Property Description
          </Typography>
        </Stack>

        <Grid container sx={{ gap: 2 }}>
          <Grid item md={2} xs={12}>
            <InputLabel
              id="Prop-Type-Select"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              <MapsHomeWorkIcon sx={{ marginRight: "5px" }} />
              Select Property Type:
            </InputLabel>
            <Select
              labelid="Prop-Type-Select"
              id="Property-Type-Select"
              fullWidth
              onChange={(e) => setSelectedRentProperty(e.target.value)}
              defaultValue={selectedRentProperty}
            >
              <MenuItem value="condominium">Condominium</MenuItem>
              <MenuItem value="houseandLot">House and Lot</MenuItem>
              <MenuItem value="lot">Lot</MenuItem>
              <MenuItem value="warehouse">Warehouse</MenuItem>
              <MenuItem value="commspace">Commercial Space</MenuItem>
              <MenuItem value="office">Office</MenuItem>
            </Select>
          </Grid>

          {selectedRentProperty === "condominium" && <RentCondo />}
          {selectedRentProperty === "houseandLot" && <RentHouseLot />}
          {selectedRentProperty === "lot" && <RentLot />}
          {selectedRentProperty === "warehouse" && <RentWarehouse />}
          {selectedRentProperty === "commspace" && <RentCommSpace />}
          {selectedRentProperty === "office" && <RentOffice />}
        </Grid>
      </Stack>
    </Container>
  );
};
