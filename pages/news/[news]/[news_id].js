import DetailsLayout from "../../../components/DetailsComponents/detailsLayout";
import VariantLayout from "../../../components/VariantComponents/variantLayout";
import SliderCarousal from "../../../components/sliderCarousal";
import { useRouter } from "next/router";
import axios from "axios";
import RowAd from "/components/rowAds";
import { useEffect, useState } from "react";
import { wrapper } from "../../../store";
import { getNewsData } from "../../../store/searchslice";
import { useSelector } from "react-redux";
import { Col, Container, Row, Button, CardImg } from "reactstrap";
import { BsFillEyeFill } from "react-icons/bs";
import Head from "next/head";
import { baseUrl } from "/env";
import { BiUserCircle, BiShareAlt, BiCalendarAlt } from "react-icons/bi";
import { FaComment, FaRegEye } from "react-icons/fa";

function NewsDetails() {
  const newsData = useSelector((state) => state.searchproducts.newsData);

  function handleShare(){
    let urlBase = window.location.href;
      if (navigator.share) {
          // console.log("Congrats! Your browser supports Web Share API");
          navigator
            .share({
              url: urlBase
            })
            .then(() => {
              // console.log("Sharing successfull");
            })
            .catch(() => {
              // console.log("Sharing failed");
            });
        } else {
          alert("Sorry! Your browser does not support Web Share API")
          // console.log("Sorry! Your browser does not support Web Share API");
        }
    }

  return (
    <div className="container">
      <Head>
        <title>Latest News Nayagadi</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Nayagadi_Icon.png" />
      </Head>
      <RowAd Imgsrc="/ad2.png" bgColor="bg-ash" />
      <Row>
        <Col lg='8' className="col-12 col-sm-8 ">
          <div className="card-news innernal-container new-news-card">
            <div className="m-3 card-news-heading" dangerouslySetInnerHTML={{
                  __html: newsData?.data?.[0]?.news_title,
                }} />
              <div className="img-box3">
                  <img src={newsData?.data?.[0]?.news_image} alt="" className="img-fluid" />
              </div>
              <div className="blog-details-bottom-div p-2">
              <Row className="p-2">
                <Col className="col-4">
                  <div>
                    <h6 className="d-flex align-items-center">
                      <BiCalendarAlt className="blog-icon-user pr-2" />
                      {new Date(newsData?.data?.[0].date).toLocaleDateString('en-us', {day: 'numeric', year:"numeric", month:"short"})}
                    </h6>
                  </div>
                </Col>
                <Col className="col-8">
                  <ul className="d-flex justify-content-between blog-bottom-data">
                    <li>
                      <h6 className="d-flex align-items-center">
                        {" "}
                        <BiUserCircle className="blog-icons fs-18 pr-2" /> Admin{" "}
                      </h6>
                    </li>
                    <li>
                      <h6 className="d-flex align-items-center">
                        {" "}
                        <FaComment className="blog-icons pr-2" /> No Comments{" "}
                      </h6>
                    </li>
                    <li>
                      <h6 className="d-flex align-items-center">
                        {" "}
                        <FaRegEye className="blog-icons pr-2" /> {newsData?.data?.[0].Views}{" "}
                      </h6>
                    </li>
                    <li>
                      <h6>
                        {" "}
                          <BiShareAlt className="blog-icons pr-2" onClick = {() => handleShare()}/>
                      </h6>
                    </li>
                  </ul>
                  {/* <Row>
                        <Col className="col-3">
                            <h6 className="d-flex align-items-center"> <BiUserCircle className="blog-icons pr-2"/> Admin </h6>
                        </Col>
                   
                        <Col className="col-5">
                            <h6 className="d-flex align-items-center"> < FaComment className="blog-icons pr-2"/> No Comments </h6>
                        </Col>
                        <Col className="col-3">
                            <h6 className="d-flex align-items-center"> <FaRegEye className="blog-icons pr-2"/> 1234 </h6>
                        </Col>
                        <Col className="col-1"> 
                            <h6> <BiShareAlt className="blog-icons pr-2"/></h6>
                        </Col>    
                        </Row> */}
                </Col>
              </Row>
            </div>
              <div className="m-3 mt-3 text-center "  dangerouslySetInnerHTML={{
                __html: newsData?.data?.[0]?.news_content,
              }}/>
           </div>
        </Col>
        <Col className="col-lg-4 col-4 mt-3 d-none d-sm-block d-lg-block bg-white overflow-hidden">
            <div className="aside-right news-details-add">
              <img src="https://i.pinimg.com/736x/4e/17/9a/4e179aacc3a714ef95b38f58270d7b7c.jpg" />
            </div>
          </Col>
      </Row>
      {/* <Row>
        <Col lg="8" className="col-12 col-sm-8 ">
          <div className="card-news innernal-container new-news-card ">
            <div className="d-flex justify-content-between">
              <div
                className="p-0 m-0 d-flex card-news-heading m-3 mt-3 text-center"
                dangerouslySetInnerHTML={{
                  __html: newsData?.data?.[0]?.news_title,
                }}
              />
              <div className="p-0 m-0 d-flex ml-3 mt-3 d-flex justify-content-center d-none d-sm-block d-lg-block">
                {" "}
                <BsFillEyeFill className="m-1 eye-icon" />
                <p>{newsData?.data?.[0]?.Views} views</p>
              </div>
            </div>
            <div className="img-box3">
              <img
                src={newsData?.data?.[0]?.news_image}
                alt=""
                className="img-fluid"
              />
            </div>
            <div
              className="m-3"
              dangerouslySetInnerHTML={{
                __html: newsData?.data?.[0]?.news_content,
              }}
            />
          </div>
        </Col>
        <Col className="col-lg-4 col-4 mt-3 d-none d-sm-block d-lg-block bg-white overflow-hidden">
            <div className="aside-right news-details-add">
              <img src="https://i.pinimg.com/736x/4e/17/9a/4e179aacc3a714ef95b38f58270d7b7c.jpg" />
            </div>
          </Col>
      </Row> */}
    </div>
  );
}

// api for get news Details by id
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    let id = context.query.news_id;

    if (!id.includes(".")) {
      const response = await axios.get(
        `${baseUrl}/api/homepage/getNewsById?id=${id}`
      );
      store.dispatch(getNewsData(response.data));
    }
  }
);

export default NewsDetails;
