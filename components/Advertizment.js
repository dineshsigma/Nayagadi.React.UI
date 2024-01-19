import { Breadcrumb, BreadcrumbItem, Container, Row, img } from "reactstrap";
import { useRouter } from 'next/router';
import { Button, Col } from "reactstrap";
import axios from 'axios';
import { baseUrl } from "/env.js";

import Link from "next/link";
import { useEffect, useState } from 'react';

function Advertizment() {
  const [homepageAddsData, setHomepageAddsData] = useState();
  let [backgroundcol, setBackgroundColor] = useState();
  useEffect(() => {
    axios.get(`${baseUrl}/api/homepage/homepageads`).then((homepageads) => {
      setHomepageAddsData(homepageads.data.data[0].add3)
      setBackgroundColor(homepageads.data.data[0].add3.background_color3)
    })
  }, [])

  return (
    <Container className="mt-2 advertizing-container p-4" >
      <Row>
        <Col className="col-12 col-sm-4 col-lg-4 d-flex justify-content-center">
          <img src={homepageAddsData?.icon3} className="float-end" height={100} />
        </Col>
        <Col className="col-12 col-sm-8 col-lg-8">
          <Row className="mt-3 d-flex align-items-center">
            <Col className="col-12 col-sm-6 col-lg-6 advertizing-header">
              <h5>{homepageAddsData?.title3} </h5>
              <p> {homepageAddsData?.shorttext3}</p>
            </Col>
            <Col className="col-12 col-sm-6 col-lg-6 advert-div ">
              <Button className="btn p-3 btn-advertizement rounded-0 btn btn-secondary" >
                {homepageAddsData?.buttontext3}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Advertizment;