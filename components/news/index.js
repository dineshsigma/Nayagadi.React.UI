import { Button, Card, CardBody, CardText, CardTitle, Col, Container, Row } from "reactstrap"
import { useQuery } from '@apollo/client';
import { BiShareAlt } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { gql } from "@apollo/client"
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {responsive} from "../../env.js"
import { BiGasPump, BiCalendar, BiTachometer, BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { baseUrl } from "../../env.js";


const getAllnews = gql`
query{
    newsContents{
      data{
        id
        attributes{
       Image{
        data{
          attributes{
            url
          }
        }
      }
          Title
          Description
          news_detail{
            data{
              id
              attributes{
                NewsDetail
                Title
              }
            }
          }
        }
      }
    }
  }`

function News() {
    const navigate = useRouter();
    // News query
    const getAllnewslist = useQuery(getAllnews);
    const [newsList, setNewsList] = useState();
    useEffect(() => {
        axios.get( `${baseUrl}/api/homepage/getnews?page=1`).then((res) => {
          setNewsList(res.data.data)
        })
       },[])

     // Function for navigation to News page 
     function NavigateNewsPage(item){ 
        navigate.push(`/news/${item?.news_title[3,5]}/${item.id}`)
        // navigate.push(`/${item?.attributes?.ProductName}/${item.id}`)
    }
    const CustomRightArrow = ({ onClick, ...rest }) => {
        const {
            onMove,
            carouselState: { currentSlide }
        } = rest;
        // onMove means if dragging or swiping in progress.
        return <button onClick={() => onClick()} className="arrow-btn-r position-absolute end-0 border-0">
            <BiChevronRight />
        </button>;
    };

    const CustomLeftArrow = ({ onClick, ...rest }) => {
        const {
            onMove,
            carouselState: { previousSlide }
        } = rest;
        // onMove means if dragging or swiping in progress.
        return <button onClick={() => onClick()} className="arrow-btn-l position-absolute end-0 border-0">
            <BiChevronLeft />
        </button>;
    };
    function handleShare(item){
        let urlBase = window.location.href + `news/${item?.news_title?.replaceAll(' ', '-')?.split(',')[0]?.toLowerCase()}/${item?.id}`;
        if (navigator.share) {
            // console.log("Congrats! Your browser supports Web Share API");
            navigator
              .share({
                url: urlBase
                // url: `http://localhost:3000/variant/${product?.[0].ModelVariantName}/${product?.[0].id}`
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
        <div className="bg-white py-3">
            <Container>
                <Row>
                    <Col>
                        <div className="section-header text-center mb-5">
                            <p className="text-uppercase">Everything you need to know</p>
                            <h2 className="sub-heading">Our Latest <span>News</span></h2>
                        </div>
                    </Col>
                </Row>
                {/* <Row className="row-cols-lg-12 row-cols-md-12"> */}
                {newsList? <Carousel
                swipeable={true}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlaySpeed={2000}
                autoPlay={true}
                keyBoardControl={true}
                transitionDuration={500}
                renderButtonGroupOutside={true}
                customRightArrow={<CustomRightArrow />}
                customLeftArrow={<CustomLeftArrow />}
                className="p-0"
                customTransition="transform 300ms ease-in-out"
            >
                    {newsList && newsList.map((item, id) => {
                        return (
                            <Col  key = {id}>
                                <Card className="card-news p-1 rounded-0 border-0">
                                    <Link href={{pathname: '/news/[news_title]/[news_id]',
                                        query: {news_title: item?.news_title?.replaceAll(' ', '-')?.split(',')[0]?.toLowerCase(),
                                                news_id: item?.id}
                                        }}>
                                        <div className="img-box2">
                                            <img src={item.news_image} alt="" className="img-fluid" />
                                            <span>{new Date(item?.date).toLocaleDateString('en-us', {day: 'numeric', year:"numeric", month:"short"})}</span>
                                        </div>
                                        </Link>
                                        <Card className="mx-auto mb-3 rounded-0 border-0">
                                            <CardBody className="text-center">
                                                <div className="d-flex justify-content-between news-cards-header">
                                                    <div className="pe-3">
                                                        <h5 className="fs-13 news-by-ng">By Naya Gadi</h5>
                                                        </div>
                                                        <div className="d-flex justify-content-center text-align-center">
                                                        <Link href="" className="border-front border-end link_cn d-none d-sm-block d-lg-block">
                                                        <label className=" mr-3">
                                                            <FaComment/>&nbsp;
                                                            <span>3</span></label>
                                                        </Link>
                                                        <button className="btn btn-share">
                                                            <BiShareAlt onClick = {() => handleShare(item)}/>
                                                        </button>
                                                        </div>
                                                </div>
                                                <Row>
                                                    <hr />
                                                </Row>
                                                <CardTitle>
                                                    <Link href={{pathname: '/news/[news_title]/[news_id]',
                                                                query: {news_title: item?.news_title?.replaceAll(' ', '-')?.split(',')[0]?.toLowerCase(),
                                                                        news_id: item?.id}
                                                                }} className="link_cn">
                                                        <h3 dangerouslySetInnerHTML={{__html: item && item.news_title}}/>
                                                        <p dangerouslySetInnerHTML={{__html: item && item.short_text}}/>
                                                    </Link>
                                                </CardTitle>
                                            </CardBody>
                                        </Card>
                                    
                                </Card>
                            </Col>
                        )
                    })}
         </Carousel> : <div className='spinner'><div class="loading-bar"></div></div>}

                    {/* <Col>
                        <Card className="card-news rounded-0 border-0">
                            <div className="img-box2">
                                <img src="./car1.png" alt="" className="img-fluid" />
                            </div>
                            <Card className="mx-auto rounded-0 border-0">
                                <CardBody className="text-center">
                                    <Row className="pb-2">
                                        <Col sm={8} className="border-end">
                                            <h5>By Naya Gadi</h5>
                                        </Col>
                                        <Col className="border-end d-flex align-items-center">
                                            <Link href="" className="link_cn d-flex align-items-center justify-content-center">
                                                <FaComment />
                                                <span>3</span>
                                            </Link>
                                        </Col>
                                        <Col>
                                            <button className="btn btn-share">
                                                <BiShareAlt />
                                            </button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <hr />
                                    </Row>
                                    <CardTitle>
                                        <Link href="" className="link_cn">
                                            <h3>Buy Your Dream Car</h3>
                                            <p>Some quick example text to build on the card title and make up the bulk of the card‘s content.</p>
                                        </Link>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Card>
                    </Col>

                    <Col>
                        <Card className="card-news rounded-0 border-0">
                            <div className="img-box2">
                                <img src="./car1.png" alt="" className="img-fluid" />
                            </div>
                            <Card className="mx-auto rounded-0 border-0">
                                <CardBody className="text-center">
                                    <Row className="pb-2">
                                        <Col sm={8} className="border-end">
                                            <h5>By Naya Gadi</h5>
                                        </Col>
                                        <Col className="border-end d-flex align-items-center">
                                            <Link href="" className="link_cn d-flex align-items-center justify-content-center">
                                                <FaComment />
                                                <span>3</span>
                                            </Link>
                                        </Col>
                                        <Col>
                                            <button className="btn btn-share">
                                                <BiShareAlt />
                                            </button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <hr />
                                    </Row>
                                    <CardTitle>
                                        <Link href="" className="link_cn">
                                            <h3>Buy Your Dream Car</h3>
                                            <p>Some quick example text to build on the card title and make up the bulk of the card‘s content.</p>
                                        </Link>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Card>
                    </Col> */}
                {/* </Row> */}

                <Row className="mt-3">
                    <Col className="text-center">
                        <Link href={{ pathname: "/news", query: { page: 1 }}}>
                          <Button className="btn btn-submit rounded-0">View All News</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default News