import { useState, useEffect } from "react";
import { Button, Col, img, Container, Row } from "reactstrap";
import axios from "axios";
import Head from 'next/head';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { baseUrl } from '../../env';
import {
  BiListUl,BiGridAlt,
  BiSearch,
  BiGridSmall,
  BiChevronsRight,
  BiCalendarAlt,BiMailSend
} from "react-icons/bi";

function Sidefilters() {
  const [isMobile, setIsMobile] = useState(false);
  const [totalProducts,setTotalProducts] = useState();
  const [latestnews, setLatestNews] = useState([]);
  const [trendingnews, setTrendingNews] = useState([]);
  
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/api/products/noOfProductsBasedOnCategory`
      )
      .then((res) => {
        
        setTotalProducts(res.data.data)
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/api/news/latestnews`
      )
      .then((res) => {
        setLatestNews(res.data.data)
      });
  }, []);
  
  useEffect(() => {
    axios.get(`${baseUrl}/api/news/trendingnews`).then((res) => {
      setTrendingNews(res?.data?.data)
    })
  }, [])
  return (
    <section className="white-bg-1 section pt-0 innernal-container2 p-0">
        <Row>
          <Col className="col-lg-12 d-none d-sm-block d-lg-block">
            <div className="aside-right p-3">
              <div>
                <h4 className="bottom-line mb-2">Search By</h4>
                <InputGroup className="mb-3 search-input-text">
                  <Form.Control
                    placeholder="Search here"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <button className="blog-search">
                    <InputGroup.Text id="basic-addon1">GO</InputGroup.Text>
                  </button>
                </InputGroup>
              </div>
              {/* Categories starts hear -------------------------------- */}
              <div className="mt-4">
                <h4 className="bottom-line mb-2">Categories</h4>
                <div className="p-3">
                  <h4 className="sub-categories mb-2">
                    {" "}
                    <BiChevronsRight className="fs-18" /> Cars <span>({totalProducts})</span>
                  </h4>
                  <h4 className="sub-categories mb-2">
                    {" "}
                    <BiChevronsRight className="fs-18" /> Bikes{" "}
                    <span>(50)</span>
                  </h4>
                  <h4 className="sub-categories mb-2">
                    {" "}
                    <BiChevronsRight className="fs-18" /> Heavy vehicles{" "}
                    <span>(50)</span>
                  </h4>
                </div>
              </div>
              <div className="mt-3">
                <h4 className="bottom-line mb-2">Latest Posts</h4>
                <div className="p-2">
                  {
                    latestnews?.map((newsdata, id) => {
                      return (
                        <div key={id}>
                          <Row className="mb-3">
                    <Col className="col-4">
                      <div className="post-img">
                        <img src={newsdata?.news_image} alt='Nayagadi'/>
                      </div>
                    </Col>
                    <Col className="col-8 p-0">
                      <h4 className="post-heading">{newsdata?.news_title}</h4>
                      <div className="pt-1">
                        <h4 className="post-date d-flex">
                          <BiCalendarAlt className="callender-icon" />
                          {new Date(newsdata?.date).toLocaleDateString('en-us', { day: 'numeric', year: "numeric", month: "short" })}
                         
                        </h4>
                      </div>
                    </Col>
                  </Row>
                        </div>
                      )
                    })
                  }
                  {/* latest blog details list view ------------*/}
                  <div className="blog-add">
                    <img src="../car_add.jpg" />
                  </div>
                </div>
                 {/* Trending  Blogs--------------- */}
              <div className="mt-3">
                <h4 className="bottom-line mb-2">Trending Now</h4>
                <div className="p-2">
                  {/* latest blog details list view ------------*/}
                  {trendingnews?.map((trendingnewsdata, index) => {
                    return (
                      <div key={index}>
                        <Row className="mb-3">
                          <Col className="col-4">
                            <div className="post-img">
                              <img src={trendingnewsdata?.news_image} />
                            </div>
                          </Col>
                          <Col className="col-8 p-0">
                            <h4 className="post-heading">{trendingnewsdata?.short_text}</h4>
                            <div className="pt-1">
                              <h4 className="post-date d-flex">
                                <BiCalendarAlt className="callender-icon" />

                                {new Date(trendingnewsdata?.date).toLocaleDateString('en-us', { day: 'numeric', year: "numeric", month: "short" })}
                              </h4>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* News letter--------------- */}
              <div className="mt-3 newsletter">
                <h4 className="bottom-line mb-2">News Letter Subscribe</h4>
                <div className="p-2">
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><BiMailSend className="black fs-18" /></InputGroup.Text>
                    <Form.Control
                      placeholder="Enter Your email to "
                      aria-label="Username"
                      aria-describedby="basic-addon1" />
                  </InputGroup>
                  <Button
                    className="btn-red btn-news-subscribe fs-13 "
                    size="md"
                  >
                    <span>SUBSCRIBE NOW</span>
                  </Button>
                </div>
              </div>
              {/* <img src="../vb_1.jpg" /> */}
              </div>
              {/* <img src="../vb_1.jpg" /> */}
            </div>
          </Col>
        </Row>
    </section>
  )
}

export default Sidefilters;