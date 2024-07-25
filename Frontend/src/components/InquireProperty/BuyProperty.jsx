import { useState, useEffect } from "react";

//MUI IMPORTS
import {
  Box,
  Container,
  Typography,
  Stack,
  InputAdornment,
  Grid,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  OutlinedInput,
  Slider,
  Button,
  Modal,
} from "@mui/material";

//Icons
import EditNoteIcon from "@mui/icons-material/EditNote";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

import BuyCondo from "./BuyCondo";
import BuyHouseLot from "./BuyHouseLot";
import BuyLot from "./BuyLot";
import BuyWarehouse from "./BuyWarehouse";
import BuyCommSpace from "./BuyCommSpace";
import BuyOffice from "./BuyOffice";

export const BuyProperty = () => {
  const [selectedProperty, setSelectedProperty] = useState("condominium");

  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container component="section" sx={{ mt: 9, height: "100%" }}>
      <Box component="header" sx={{ mt: 11, mb: 6 }}>
        <h2 style={{ fontWeight: "bold", fontSize: "35px" }}>
          <ConfirmationNumberIcon sx={{ color: "#DB4437" }} /> Buy a Property
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
              onChange={(e) => setSelectedProperty(e.target.value)}
              defaultValue={selectedProperty}
            >
              <MenuItem value="condominium">Condominium</MenuItem>
              <MenuItem value="houseandLot">House and Lot</MenuItem>
              <MenuItem value="lot">Lot</MenuItem>
              <MenuItem value="warehouse">Warehouse</MenuItem>
              <MenuItem value="commspace">Commercial Space</MenuItem>
              <MenuItem value="office">Office</MenuItem>
            </Select>
          </Grid>

          {selectedProperty === "condominium" && <BuyCondo />}
          {selectedProperty === "houseandLot" && <BuyHouseLot />}
          {selectedProperty === "lot" && <BuyLot/>}
          {selectedProperty === "warehouse" && <BuyWarehouse/>}
          {selectedProperty === "commspace" && <BuyCommSpace/> }
          {selectedProperty === "office" && <BuyOffice/>}
        </Grid>
      </Stack>
    </Container>
  );
};
