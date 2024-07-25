import { useState, useEffect } from "react";
import "../../assets/postingRentSale.css";
//MUI IMPORTS
import {
  Box,
  Container,
  Typography,
  Stack,
} from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Chip } from "@mui/joy";

//Child Component
import SaleCondo from "./SaleCondo";
import SaleHouseLot from "./SaleHouseLot";
import SaleLot from "./SaleLot";
import SaleWarehouse from "./SaleWarehouse";
import SaleCommSpace from "./SaleCommSpace";
import SaleOffice from "./SaleOffice";

//Icons
import EditNoteIcon from '@mui/icons-material/EditNote';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';

export default function postingSale() {
  
  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Selected Property Type
  const [selectedProp, setSelectedProp] = useState("condominium");

  return (
    <Container component="section" sx={{ mt: 11, height: "100%" }}>
      <Box component="header">
        <h2 style={{ fontWeight: "bold", fontSize: "35px" }}>Post a Property</h2>
        <Chip color="primary" variant="soft" size="lg"><HouseOutlinedIcon /> For Sale</Chip>
      </Box>
      <Stack sx={{ mt: 4 }} direction="column">
        <Stack sx={{ mb: 2, borderBottom: 1, py: 2 }}>
          <Typography
            sx={{ fontFamily: '"Poppins",sans-serif', textTransform: "uppercase", fontWeight: "bold" }}
          >
            <EditNoteIcon /> Property Description
          </Typography>
        </Stack>
        <Stack component="section">
          <Box sx={{ mb: 4 }}>
            <InputLabel id="Prop-Type-Select" sx={{ fontWeight: "bold", mb: 1 }}>
              <MapsHomeWorkIcon sx={{ marginRight: "5px" }} />Select Property Type:
            </InputLabel>
            <Select
              labelid="Prop-Type-Select"
              id="Property-Type-Select"
              sx={{ width: { lg: "15rem", xs: "100%" } }}
              onChange={(e) => setSelectedProp(e.target.value)}
              defaultValue={selectedProp}
            >
              <MenuItem value="condominium">Condominium</MenuItem>
              <MenuItem value="houseandLot">House and Lot</MenuItem>
              <MenuItem value="lot">Lot</MenuItem>
              <MenuItem value="warehouse">Warehouse</MenuItem>
              <MenuItem value="commspace">Commercial Space</MenuItem>
              <MenuItem value="office">Office</MenuItem>
            </Select>
          </Box>

          {selectedProp === 'condominium' && (<SaleCondo />)}
          {selectedProp === 'houseandLot' && (<SaleHouseLot />)}
          {selectedProp === 'lot' && (<SaleLot />)}
          {selectedProp === 'warehouse' && (<SaleWarehouse />)}
          {selectedProp === 'commspace' && (<SaleCommSpace />)}
          {selectedProp === 'office' && (<SaleOffice />)}
        </Stack>
      </Stack>
    </Container>
  );
}
