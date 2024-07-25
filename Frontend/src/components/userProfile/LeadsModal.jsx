import {
  Modal,
  List,
  ListItem,
  ListItemDecorator,
  ModalDialog,
  Avatar,
  ModalClose,
  Box,
  Typography,
  Divider,
  Sheet,
} from "@mui/joy";

import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

export default function LeadsModal({ open, onClose, userLeadsInfo }) {
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-PH", options);
  };
  
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
      }}
    >
      <ModalDialog sx={{ p: 3, width: "650px", overflowY: 'auto' }}>
        <ModalClose></ModalClose>
        <Box sx={{ display: "inline-flex" }}>
          <Avatar
            size="lg"
            alt="Remy Sharp"
            src={`http://127.0.0.1:8000/storage/${
              userLeadsInfo && userLeadsInfo.data.image
            }`}
            sx={{ width: "75px", height: "75px" }}
          />
          <Box sx={{ marginLeft: "10px" }}>
            <Typography color="primary" level="title-lg" variant="plain">
              {userLeadsInfo && userLeadsInfo.data.fullname}
            </Typography>
            <Typography
              color="neutral"
              startDecorator={
                <MailOutlinedIcon sx={{ width: "15px", height: "15px" }} />
              }
              level="body-sm"
            >
              {userLeadsInfo && userLeadsInfo.data.email}
            </Typography>
            <Typography
              color="neutral"
              startDecorator={
                <CallOutlinedIcon sx={{ width: "15px", height: "15px" }} />
              }
              level="body-sm"
            >
              {userLeadsInfo && userLeadsInfo.data.number}
            </Typography>
          </Box>
        </Box>
        <Divider
          inset="context"
          sx={{ backgroundColor: "#636B74", mt: 1, mb: 1 }}
        />
        <Box>
          <Box>
            <Typography level="title-md" sx={{ fontSize: "14px" }}>
              <strong>Date Listed: </strong>
              {userLeadsInfo && formatDate(userLeadsInfo.data.created_at)}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Sheet
              color="success"
              variant="soft"
              sx={{ borderRadius: "5px", p: 1.4 }}
            >
              <Typography
                id="decorated-list-demo"
                level="body-xs"
                textTransform="uppercase"
                fontWeight="lg"
                mb={1}
              >
                Lead Details
              </Typography>
              <List aria-labelledby="decorated-list-demo">
                <ListItem>
                  <ListItemDecorator
                    sx={{ marginRight: "1px", fontWeight: "bold" }}
                  >
                    <DoneOutlineIcon color="success" className="me-2" />
                    Property Type:
                  </ListItemDecorator>
                  {userLeadsInfo &&
                    getPropertyName(userLeadsInfo.data.propType)}
                </ListItem>
                {userLeadsInfo && userLeadsInfo.data.Building && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Building:
                    </ListItemDecorator>
                    {userLeadsInfo && userLeadsInfo.data.Building}
                  </ListItem>
                )}
                {userLeadsInfo && userLeadsInfo.data.Purpose && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Purpose:
                    </ListItemDecorator>
                    {userLeadsInfo && userLeadsInfo.data.Purpose}
                  </ListItem>
                )}
                {userLeadsInfo && userLeadsInfo.data.LotPref && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Lot Preference:
                    </ListItemDecorator>
                    {userLeadsInfo && userLeadsInfo.data.LotPref}
                  </ListItem>
                )}
                {userLeadsInfo && userLeadsInfo.data.LotUse && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Lot Use:
                    </ListItemDecorator>
                    {userLeadsInfo && userLeadsInfo.data.LotUse}
                  </ListItem>
                )}
                {userLeadsInfo && userLeadsInfo.data.LotArea && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Lot Area(sqft):
                    </ListItemDecorator>
                    {userLeadsInfo && userLeadsInfo.data.LotArea}
                  </ListItem>
                )}
                {userLeadsInfo && userLeadsInfo.data.FloorArea && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Floor Area(sqft):
                    </ListItemDecorator>
                    {userLeadsInfo && userLeadsInfo.data.FloorArea}
                  </ListItem>
                )}
                {userLeadsInfo && userLeadsInfo.data.Size && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Size:
                    </ListItemDecorator>
                    {userLeadsInfo && userLeadsInfo.data.Size}
                  </ListItem>
                )}
                {userLeadsInfo && userLeadsInfo.data.Village && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Village:
                    </ListItemDecorator>
                    {userLeadsInfo && userLeadsInfo.data.Village}
                  </ListItem>
                )}
                {userLeadsInfo && userLeadsInfo.data.Baths && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Bathrooms:
                    </ListItemDecorator>
                    {userLeadsInfo && userLeadsInfo.data.Baths}
                  </ListItem>
                )}
                {userLeadsInfo && userLeadsInfo.data.Beds && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Beds:
                    </ListItemDecorator>
                    {userLeadsInfo && userLeadsInfo.data.Beds}
                  </ListItem>
                )}
                {userLeadsInfo && userLeadsInfo.data.Furnish && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Furnishing:
                    </ListItemDecorator>
                    {userLeadsInfo && userLeadsInfo.data.Furnish}
                  </ListItem>
                )}
                {userLeadsInfo && userLeadsInfo.data.Balcony && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Balcony:
                    </ListItemDecorator>
                    {userLeadsInfo &&
                      (userLeadsInfo.data.Balcony === "Balcony" ? "Yes" : "No")}
                  </ListItem>
                )}
                {userLeadsInfo && userLeadsInfo.data.MoveIn && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Move in Date:
                    </ListItemDecorator>
                    {userLeadsInfo && formatDate(userLeadsInfo.data.MoveIn)}
                  </ListItem>
                )}
                {userLeadsInfo && userLeadsInfo.data.stay && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Length of Stay:
                    </ListItemDecorator>
                    {userLeadsInfo && userLeadsInfo.data.stay}
                  </ListItem>
                )}
                {userLeadsInfo && userLeadsInfo.data.Occupants && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Occupants:
                    </ListItemDecorator>
                    {userLeadsInfo && userLeadsInfo.data.Occupants}
                  </ListItem>
                )}
                {userLeadsInfo && userLeadsInfo.data.PetTypes && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Pet Restriction:
                    </ListItemDecorator>
                    {userLeadsInfo && userLeadsInfo.data.PetTypes}
                  </ListItem>
                )}
                {userLeadsInfo &&
                  (userLeadsInfo.data.Parking || userLeadsInfo.data.Garage) && (
                    <ListItem>
                      <ListItemDecorator
                        sx={{ marginRight: "1px", fontWeight: "bold" }}
                      >
                        <DoneOutlineIcon color="success" className="me-2" />
                        Parking or Garage:
                      </ListItemDecorator>
                      {userLeadsInfo.data.Parking === "Parking" ||
                      userLeadsInfo.data.Garage === "Garage"
                        ? "Yes"
                        : "No"}
                    </ListItem>
                  )}
                {userLeadsInfo && userLeadsInfo.data.city && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Location:
                    </ListItemDecorator>
                    {userLeadsInfo.data.city} City
                  </ListItem>
                )}
                {userLeadsInfo && userLeadsInfo.data.neighbor && (
                  <ListItem>
                    <ListItemDecorator
                      sx={{ marginRight: "1px", fontWeight: "bold" }}
                    >
                      <DoneOutlineIcon color="success" className="me-2" />
                      Neighborhood:
                    </ListItemDecorator>
                    {userLeadsInfo.data.neighbor}
                  </ListItem>
                )}
                {userLeadsInfo &&
                  userLeadsInfo.data.budgetFrom &&
                  userLeadsInfo.data.budgetTo && (
                    <ListItem>
                      <ListItemDecorator
                        sx={{ marginRight: "1px", fontWeight: "bold" }}
                      >
                        <DoneOutlineIcon color="success" className="me-2" />
                        Budget:
                      </ListItemDecorator>
                      {userLeadsInfo.data.budgetFrom.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 0,
                      })}
                      -
                      {userLeadsInfo.data.budgetTo.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 0,
                      })}
                    </ListItem>
                  )}
              </List>
            </Sheet>
          </Box>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
