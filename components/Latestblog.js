import { Breadcrumb, BreadcrumbItem, Container, Row, img } from "reactstrap";
import { useRouter } from "next/router";
import { Button, Col } from "reactstrap";

import Link from "next/link";

function Latestblog() {
  return (
    <Container className="mt-2 latestblog-container p-4">
      <Row>
        <Col>
          <div className="section-header text-center mb-5">
            <p className="text-uppercase">Everything you need to know</p>
            <h2>
              Our Latest <span>Blogs</span>
            </h2>
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        {/* Carousel image div--------------------------------------- */}
        <Col className="col-12 col-sm-7 col-lg-7">
          <div className="blog-img">
            <img src="../car1.png" />
            <h4 className="blog-head">Hyundai Venue Petrol DCT vs Renault Duster Petrol CVT:
                      Comparison Review</h4>
          </div>
        </Col>
        {/* Side blog list div--------------------------------------- */}

        <Col className="col-12 col-sm-5 col-lg-5 bg-white p-3">
          <div className="mt-3 d-flex align-items-center blogcard">
            <Row className="border point_cursor bloglist-card">
              <Col className="col-12 col-sm-4 col-lg-4 advertizing-header">
                <div className="blog-list-img">
                  <img
                    className="tile-img"
                    src="../car4.png"
                    width={"100%"}
                    height={"auto"}
                  />
                </div>
              </Col>
              <Col className="col-12 col-sm-8 col-lg-8 d-flex align-items-center ">
                <div className="position-relative grid-body">
                  <h5 className="card-heading">
                    Hundai Venue Petrol DCT vs Renault Duster Petrol CVT:
                      Comparison Review                    
                  </h5>
                  <p className="search-card-content d-none d-sm-block d-lg-block">
                    Hyundai Venue Petrol DCT vs Re
                  </p>
                </div>
              </Col>
            </Row>
            </div>
      

         
          
        </Col>
        
      </Row>
    </Container>
  );
}

export default Latestblog;
