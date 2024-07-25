import BalconyIcon from "@mui/icons-material/Balcony";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GarageIcon from "@mui/icons-material/Garage";
import CountertopsIcon from "@mui/icons-material/Countertops";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";
import PoolIcon from "@mui/icons-material/Pool";
import GroupsIcon from "@mui/icons-material/Groups";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import CameraOutdoorOutlinedIcon from "@mui/icons-material/CameraOutdoorOutlined";
import DeckOutlinedIcon from "@mui/icons-material/DeckOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import KebabDiningOutlinedIcon from "@mui/icons-material/KebabDiningOutlined";
import AcUnitIcon from "@mui/icons-material/AcUnit";

export default function ViewingAmenities({ propData }) {
  const hasAmenities = propData && propData.amenities;

  return (
    <div id="g-map">
      <h4 className="title-details">Amenities</h4>
      <table className="table">
        <tbody>
          <tr>
            <td   style={{
                opacity:
                  hasAmenities && propData.amenities.includes("Balcony")
                    ? 1
                    : 0.3,
              }}>
              <BalconyIcon /> Balcony
            </td>
            <td
              style={{
                opacity:
                  hasAmenities && propData.amenities.includes("Parking")
                    ? 1
                    : 0.3,
              }}
            >
              <DirectionsCarIcon /> Parking
            </td>
          </tr>
          <tr>
            <td
              style={{
                opacity:
                  hasAmenities && propData.amenities.includes("Garage")
                    ? 1
                    : 0.3,
              }}
            >
              <GarageIcon /> Car Garage
            </td>
            <td
              style={{
                opacity:
                  hasAmenities && propData.amenities.includes("Dishwasher")
                    ? 1
                    : 0.3,
              }}
            >
              <CountertopsIcon /> Dishwasher
            </td>
          </tr>
          <tr>
            <td style={{
                opacity:
                  hasAmenities && propData.amenities.includes("Disposal")
                    ? 1
                    : 0.3,
              }}>
              <DeleteOutlineIcon /> Disposal
            </td>
            <td  style={{
                opacity:
                  hasAmenities && propData.amenities.includes("Gym")
                    ? 1
                    : 0.3,
              }}>
              <FitnessCenterIcon /> Gym
            </td>
          </tr>
          <tr>
            <td style={{
                opacity:
                  hasAmenities && propData.amenities.includes("Playroom")
                    ? 1
                    : 0.3,
              }}>
              <SportsEsportsIcon /> Playroom
            </td>
            <td style={{
                opacity:
                  hasAmenities && propData.amenities.includes("Bar")
                    ? 1
                    : 0.3,
              }}>
              <SportsBarIcon /> Bar
            </td>
          </tr>
          <tr>
            <td style={{
                opacity:
                  hasAmenities && propData.amenities.includes("Pool")
                    ? 1
                    : 0.3,
              }}>
              <PoolIcon /> Pool
            </td>
            <td style={{
                opacity:
                  hasAmenities && propData.amenities.includes("Concierge")
                    ? 1
                    : 0.3,
              }}>
              <GroupsIcon /> Concierge
            </td>
          </tr>
          <tr>
            <td style={{
                opacity:
                  hasAmenities && propData.amenities.includes("Thermostat")
                    ? 1
                    : 0.3,
              }}>
              <ThermostatIcon /> Thermostat
            </td>
            <td style={{
                opacity:
                  hasAmenities && propData.amenities.includes("RooftopGarden")
                    ? 1
                    : 0.3,
              }}>
              <YardOutlinedIcon /> Rooftop Garden
            </td>
          </tr>
          <tr>
            <td style={{
                opacity:
                  hasAmenities && propData.amenities.includes("Playground")
                    ? 1
                    : 0.3,
              }}>
              <ChildCareOutlinedIcon /> Playground
            </td>
            <td style={{
                opacity:
                  hasAmenities && propData.amenities.includes("Security")
                    ? 1
                    : 0.3,
              }}>
              <CameraOutdoorOutlinedIcon /> 24/7 Security
            </td>
          </tr>
          <tr>
            <td style={{
                opacity:
                  hasAmenities && propData.amenities.includes("RooftopDeck")
                    ? 1
                    : 0.3,
              }}>
              <DeckOutlinedIcon /> Rooftop Deck
            </td>
            <td style={{
                opacity:
                  hasAmenities && propData.amenities.includes("Lounge")
                    ? 1
                    : 0.3,
              }}>
              <WeekendOutlinedIcon /> Lounge
            </td>
          </tr>
          <tr>
            <td style={{
                opacity:
                  hasAmenities && propData.amenities.includes("StudyHall")
                    ? 1
                    : 0.3,
              }}>
              <MenuBookOutlinedIcon /> Study Hall
            </td>
            <td style={{
                opacity:
                  hasAmenities && propData.amenities.includes("BbqArea")
                    ? 1
                    : 0.3,
              }}>
              <KebabDiningOutlinedIcon /> Barbeque Area
            </td>
          </tr>
          <tr>
            <td style={{
                opacity:
                  hasAmenities && propData.amenities.includes("AirConditioning")
                    ? 1
                    : 0.3,
              }}>
              <AcUnitIcon /> Air Conditioning
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
