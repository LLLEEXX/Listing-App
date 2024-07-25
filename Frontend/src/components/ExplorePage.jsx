import {
  Image,
  Col,
  Row,
  Carousel,
  InputGroup,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import "../assets/ExplorePage.css";
import * as Icon from "react-bootstrap-icons";

//Router Navigate
import { useNavigate } from "react-router-dom";
import { lazy, useState, useEffect } from "react";

//utility
import useScreenWidth from "../utility/scriptUtility";

export default function ExplorePage() {
  const useExplorePageWidth = useScreenWidth();

  //Modal JS
  const [showFilterExplore, setShowFilterExplore] = useState(false);

  //Automatic on top condition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="MainExplorePageCont">
      <Modal
        size="lg"
        show={showFilterExplore}
        onHide={() => setShowFilterExplore(false)}
        aria-labelledby="Filter"
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <h3 className="mb-4">Filters</h3>
          <Row>
            <Col>
              <Form.Select
                aria-label="Buy or Rent Select"
                className="mb-3 p-2 border border-dark"
              >
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Enter City or Address"
                  aria-describedby="SearchBar"
                  className="border border-dark"
                />
                <Button
                  variant="outline-dark"
                  id="SearchBar"
                  className="border border-dark"
                >
                  <Icon.Search />
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Row className="mt-3 mb-2 bg-light">
            <h5>Property Type</h5>
          </Row>
          <Row className="form-check">
            <div className="form-check">
              <input
                className="form-check-input border border-dark"
                type="checkbox"
                value="condominium"
                id="checkPropType"
              />
              <label className="form-check-label" htmlFor="checkPropType">
                Condominium
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input border border-dark"
                type="checkbox"
                value="HouseAndLot"
                id="checkPropType"
              />
              <label className="form-check-label" htmlFor="checkPropType">
                House and Lot
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input border border-dark"
                type="checkbox"
                value="Lot"
                id="checkPropType"
              />
              <label className="form-check-label" htmlFor="checkPropType">
                Lot
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input border border-dark"
                type="checkbox"
                value="WareHouse"
                id="checkPropType"
              />
              <label className="form-check-label" htmlFor="checkPropType">
                WareHouse
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input border border-dark"
                type="checkbox"
                value="CommSpace"
                id="checkPropType"
              />
              <label className="form-check-label" htmlFor="checkPropType">
                Commercial Space
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input border border-dark"
                type="checkbox"
                value="Office"
                id="checkPropType"
              />
              <label className="form-check-label" htmlFor="checkPropType">
                Office
              </label>
            </div>
          </Row>
          <Row className="mt-3 mb-2 bg-light">
            <h5>Bedrooms</h5>
          </Row>
          <Row className="d-flex justify-content-center flex-row">
            <Col xs={5}>
              <Form.Select
                aria-label="Default select example"
                className="mb-3 border border-dark"
              >
                <option hidden>Min</option>
                <option value="Studio">Studio</option>
                <option value="1Bedroom">1 Bedroom</option>
                <option value="2Bedrooms">2 Bedrooms</option>
                <option value="3Bedrooms">3 Bedrooms</option>
                <option value="4Bedrooms">4 Bedrooms</option>
                <option value="5Bedrooms">5 Bedrooms</option>
              </Form.Select>
            </Col>
            <Col xs={1} className="mb-3 text-center">
              to
            </Col>
            <Col xs={5}>
              <Form.Select
                aria-label="Default select example"
                className="mb-3 border border-dark"
              >
                <option hidden>Max</option>
                <option value="Studio">Studio</option>
                <option value="1Bedroom">1 Bedroom</option>
                <option value="2Bedrooms">2 Bedrooms</option>
                <option value="3Bedrooms">3 Bedrooms</option>
                <option value="4Bedrooms">4 Bedrooms</option>
                <option value="5Bedrooms">5 Bedrooms</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-3 mb-2 bg-light">
            <h5>Rental Rate</h5>
          </Row>
          <Row className="d-flex justify-content-center flex-row">
            <Col xs={5}>
              <Form.Select
                aria-label="Default select example"
                className="mb-3 border border-dark"
              >
                <option hidden>Min</option>
                <option value="10,000">&#8369; 10,000/Month</option>
                <option value="20,000">&#8369; 20,000/Month</option>
                <option value="30,000">&#8369; 30,000/Month</option>
                <option value="40,000">&#8369; 40,000/Month</option>
                <option value="50,000">&#8369; 50,000/Month</option>
                <option value="60,000">&#8369; 60,000/Month</option>
                <option value="70,000">&#8369; 70,000/Month</option>
                <option value="80,000">&#8369; 80,000/Month</option>
                <option value="90,000">&#8369; 90,000/Month</option>
                <option value="100,000">&#8369; 100,000/Month</option>
                <option value="150,000">&#8369; 150,000/Month</option>
                <option value="200,000">&#8369; 200,000/Month</option>
                <option value="250,000">&#8369; 250,000/Month</option>
              </Form.Select>
            </Col>
            <Col xs={1} className="mb-3 text-center">
              to
            </Col>
            <Col xs={5}>
              <Form.Select
                aria-label="Default select example"
                className="mb-4 border border-dark"
              >
                <option hidden>Max</option>
                <option value="10,000">&#8369; 10,000/Month</option>
                <option value="20,000">&#8369; 20,000/Month</option>
                <option value="30,000">&#8369; 30,000/Month</option>
                <option value="40,000">&#8369; 40,000/Month</option>
                <option value="50,000">&#8369; 50,000/Month</option>
                <option value="60,000">&#8369; 60,000/Month</option>
                <option value="70,000">&#8369; 70,000/Month</option>
                <option value="80,000">&#8369; 80,000/Month</option>
                <option value="90,000">&#8369; 90,000/Month</option>
                <option value="100,000">&#8369; 100,000/Month</option>
                <option value="150,000">&#8369; 150,000/Month</option>
                <option value="200,000">&#8369; 200,000/Month</option>
                <option value="250,000">&#8369; 250,000/Month</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Button variant="outline-success" className="w-75">
              Filter
            </Button>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}
