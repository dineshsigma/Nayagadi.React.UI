import { Breadcrumb, BreadcrumbItem, Container, Row, img } from "reactstrap";
import { useRouter } from 'next/router';
import { Button, Col } from "reactstrap";
import axios from 'axios';
import { baseUrl } from "/env.js";

import Link from "next/link";
import { useEffect, useState } from 'react';

function Innerbanner() {
  const [homepageAddsData, setHomepageAddsData] = useState();
  let [backgroundcol, setBackgroundColor] = useState();
  useEffect(() => {
    axios.get(`${baseUrl}/api/homepage/homepageads`).then((homepageads) => {
      setHomepageAddsData(homepageads.data.data[0].add3)
      setBackgroundColor(homepageads.data.data[0].add3.background_color3)
    })
  }, [])

  return (
    <Container className="banner-container">
      <div className="banner-img">
          <img src='https://www.iipl.work/wp-content/uploads/2022/12/Hero.jpg'/>
          <h5>About us </h5>
          </div>
        
    </Container>
  )
}

export default Innerbanner;