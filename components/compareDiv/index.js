import { Button, Card, CardBody, Col, Row, Container } from "reactstrap";
import ReactStars from "react-stars";
import { useRouter } from "next/router";
import { BiTransferAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { numInLakh, priceFormat } from "../../priceformat.js";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { baseUrl } from "../../env.js";

function CompareDiv() {
  const navigate = useRouter();
  let selectedCompare_ids_first = [];
  let selectedCompare_ids_second = [];
  let selectedCompare_ids_third = [];
  let selectedCompare_ids_fourth = [];
  const [compareproducts, setCompareproducts] = useState();
  function NavigateDetailPage() {
    navigate.push("/compare/compareCard");
  }

  let i = 4;
  let carsArray = [
    {
      name: "Mercedes-Benz",
      src: "/mercedes.png",
      cost: "80 Lac",
    },
    {
      name: "Mercedes-Benz",
      src: "/benz.png",
      cost: "80 Lac",
    },
  ];
  let ids = [];
  // function to navigate compare page
  const getcamparedetails = (id) => {
    ids.push(id);
    navigate.push(`/compare/${ids}`);
  };

  useEffect(() => {
    axios
      .get(
        `${baseUrl}/api/products/CompareModels`
      )
      .then((res) => {
        setCompareproducts(res.data.data);
      });
  }, []);
  return (
    <Container>
      {/* block section */}
      <Row>
        <Col>
          <div className="section-header text-center mb-5">
            {/* <p className="text-uppercase">Search by</p> */}
            <h2 className="sub-heading">
              Compare to buy the right <span>Vehicles</span>
            </h2>
          </div>
        </Col>
      </Row>

      {/* products display starts from here */}
      {compareproducts ? (
        <Row className="g-4 row-cols-sm-2 row-cols-1">
          <Col>
            <Card className="card-compare border-0 rounded-0">
              <div className="icon-compare d-flex align-items-center justify-content-center rounded-pill">
                <BiTransferAlt />
              </div>
              <CardBody>
                <Row className="row-cols-2">
                  {compareproducts &&
                    compareproducts[0]?.Modellist.map((car, index) => {
                      selectedCompare_ids_first.push(car.variants[0]);
                      return (
                        <Col
                          key={index}
                          className="p-3 compare-card-click"
                          onClick={() =>
                            getcamparedetails(selectedCompare_ids_first)
                          }
                        >
                          <div className="img-box">
                            <img
                              src={car.Images.images[0]}
                              className="img-fluid"
                            />
                          </div>
                          <h6 className="comapir-car-name">
                            {car.BrandName} {car.ProductName}
                          </h6>

                          <small className="d-flex align-items-center justify-content-center">
                            {/* <span>₹ {numInLakh(car.initialPrice).slice(0,-1)}- {numInLakh(car.finalPrice)}</span> */}
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip id="tooltip-disabled">
                                  {" "}
                                  {priceFormat(car.initialPrice)}-{" "}
                                  {priceFormat(car.finalPrice)}
                                </Tooltip>
                              }
                            >
                              <span className="d-inline-block">
                                <div
                                  className="fs-13"
                                  style={{ pointerEvents: "none" }}
                                >
                                  <span className="compare-div-price">
                                    ₹ {numInLakh(car.initialPrice).slice(0, -1)}
                                    - {numInLakh(car.finalPrice)}
                                  </span>
                                </div>
                              </span>
                            </OverlayTrigger>
                            <div className="rattings"> 
                              <ReactStars
                                className="d-inline-block lh-18"
                                count={5}
                                size={16}
                                color2={"#ED2169"}
                                value={3}
                              />
                              <span className="compare-div-price">(30k)</span>
                            </div>

                          </small>
                        </Col>
                      );
                    })}
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card className="card-compare border-0 rounded-0">
              <div className="icon-compare d-flex align-items-center justify-content-center rounded-pill">
                <BiTransferAlt />
              </div>
              <CardBody>
                <Row className="row-cols-2">
                  {compareproducts &&
                    compareproducts[1]?.Modellist.map((car, index) => {
                      selectedCompare_ids_second.push(car.variants[0]);
                      return (
                        <div
                          key={index}
                          className="p-3 compare-card-click"
                          onClick={() =>
                            getcamparedetails(selectedCompare_ids_second)
                          }
                        >
                          <div className="img-box">
                            <img
                              src={car.Images.images[0]}
                              className="img-fluid"
                            />
                          </div>
                          <h6>
                            {car.BrandName} {car.ProductName}
                          </h6>
                          <small className="d-flex align-items-center justify-content-center">
                            {/* <span>₹ {numInLakh(car.initialPrice).slice(0,-1)} - {numInLakh(car.finalPrice)}</span> */}
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip id="tooltip-disabled">
                                  {" "}
                                  {priceFormat(car.initialPrice)}-{" "}
                                  {priceFormat(car.finalPrice)}
                                </Tooltip>
                              }
                            >
                              <span className="d-inline-block">
                                <div style={{ pointerEvents: "none" }}>
                                  <span className="compare-div-price">
                                    ₹ {numInLakh(car.initialPrice).slice(0, -1)}
                                    - {numInLakh(car.finalPrice)}
                                  </span>
                                </div>
                              </span>
                            </OverlayTrigger>
                            <div className="rattings"> 

                            <ReactStars
                              className="d-inline-block lh-18"
                              count={5}
                              size={16}
                              color2={"#ED2169"}
                              value={3}
                            />
                            <span className="compare-div-price">(30k)</span>
                          </div>
                          </small>
                        </div>
                      );
                    })}
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card className="card-compare border-0 rounded-0">
              <div className="icon-compare d-flex align-items-center justify-content-center rounded-pill">
                <BiTransferAlt />
              </div>
              <CardBody>
                <Row className="row-cols-2">
                  {compareproducts &&
                    compareproducts[2]?.Modellist.map((car, index) => {
                      selectedCompare_ids_third.push(car.variants[0]);
                      return (
                        <div
                          key={index}
                          className="p-3 compare-card-click"
                          onClick={() =>
                            getcamparedetails(selectedCompare_ids_third)
                          }
                        >
                          <div className="img-box">
                            <img
                              src={car?.Images?.images?.[0]}
                              className="img-fluid"
                            />
                          </div>
                          <h6>
                            {car.BrandName} {car.ProductName}
                          </h6>
                          <small className="d-flex align-items-center justify-content-center">
                            {/* <span>₹ {numInLakh(car.initialPrice).slice(0,-1)} - {numInLakh(car.finalPrice)}</span> */}
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip id="tooltip-disabled">
                                  {" "}
                                  {priceFormat(car.initialPrice)}-{" "}
                                  {priceFormat(car.finalPrice)}
                                </Tooltip>
                              }
                            >
                              <span className="d-inline-block">
                                <div style={{ pointerEvents: "none" }}>
                                  <span className="compare-div-price">
                                    ₹ {numInLakh(car.initialPrice).slice(0, -1)}
                                    - {numInLakh(car.finalPrice)}
                                  </span>
                                </div>
                              </span>
                            </OverlayTrigger>
                            <div className="rattings"> 
                            <ReactStars
                              className="d-inline-block lh-18"
                              count={5}
                              size={16}
                              color2={"#ED2169"}
                              value={3}
                            />
                            <span className="compare-div-price">(30k)</span>
                            </div>
                          </small>
                        </div>
                      );
                    })}
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card className="card-compare border-0 rounded-0">
              <div className="icon-compare d-flex align-items-center justify-content-center rounded-pill">
                <BiTransferAlt />
              </div>
              <CardBody>
                <Row className="row-cols-2">
                  {compareproducts &&
                    compareproducts[3]?.Modellist.map((car, index) => {
                      selectedCompare_ids_fourth.push(car.variants[0]);
                      return (
                        <div
                          key={index}
                          className="p-3 compare-card-click"
                          onClick={() =>
                            getcamparedetails(selectedCompare_ids_fourth)
                          }
                        >
                          <div className="img-box">
                            <img
                              src={car.Images.images[0]}
                              className="img-fluid"
                            />
                          </div>
                          <h6>
                            {car.BrandName} {car.ProductName}
                          </h6>
                          <small className="d-flex align-items-center justify-content-center">
                            {/* <span>₹ {numInLakh(car.initialPrice).slice(0,-1)} - {numInLakh(car.finalPrice)}</span> */}
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip id="tooltip-disabled">
                                  {" "}
                                  {priceFormat(car.initialPrice)}-{" "}
                                  {priceFormat(car.finalPrice)}
                                </Tooltip>
                              }
                            >
                              <span className="d-inline-block">
                                <div style={{ pointerEvents: "none" }}>
                                  <span className="compare-div-price">
                                    ₹ {numInLakh(car.initialPrice).slice(0, -1)}
                                    - {numInLakh(car.finalPrice)}
                                  </span>
                                </div>
                              </span>
                            </OverlayTrigger>
                            <div className="rattings"> 
                            <ReactStars
                              className="d-inline-block lh-18"
                              count={5}
                              size={16}
                              color2={"#ED2169"}
                              value={3}
                            />
                            <span className="compare-div-price">(30k)</span>
                            </div>
                          </small>
                        </div>
                      );
                    })}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : (
        <div className="spinner">
          <div class="loading-bar"></div>
        </div>
      )}

      {/* compare more cars  */}
      <Row className="text-center my-4 mt-5">
        <Col>
          <Button
            className="btn btn-submit rounded-0"
            onClick={NavigateDetailPage}
          >
            Compare More Cars
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CompareDiv;
