import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Container, Row, Col } from "react-bootstrap";

const FurnishFilter = () => {
  const [checkedItems, setCheckedItems] = React.useState({
    unfurnished: true,
    semiFurnished: true,
    fullyFurnished: true,
  });

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const checkboxStyles = {
    checkbox: {
      "& .MuiIconButton-root": {
        color: "#000",
      },
    },
  };

  return (
    <Container style={{ width: "80%", margin: "0 auto" }}>
      <FormGroup sx={checkboxStyles.checkbox}>
        <Row>
          <Col>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.unfurnished}
                  onChange={handleChange}
                  name="unfurnished"
                  style={{ color: '#000' }}
                />
              }
              label="Unfurnished"
            />
          </Col>
          <Col>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.semiFurnished}
                  onChange={handleChange}
                  name="semiFurnished"
                  style={{ color: '#000' }}
                />
              }
              label="Semi-Furnished"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.fullyFurnished}
                  onChange={handleChange}
                  name="fullyFurnished"
                  style={{ color: '#000' }}
                />
              }
              label="Fully-Furnished"
            />
          </Col>
        </Row>
      </FormGroup>
    </Container>
  );
};

export default FurnishFilter;