import { useState } from "react";
import { Button, Card, CardFooter, CardHeader, CardBody, Col, Container, Row } from "reactstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { numInLakh, priceFormat } from "../../priceformat"
import { useRouter } from 'next/router';
import { responsive, baseImageurl, responsiveSimilarPriceCars } from "../../env.js"
import { BiGasPump, BiCalendar, BiTachometer, BiChevronRight, BiChevronLeft } from "react-icons/bi";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Spinner from 'react-bootstrap/Spinner';
import Link from "next/link";
import { useEffect } from "react";
import {useSelector  } from "react-redux";

function SliderCarousal({ nohead = "", headtext, data }) {
    const city = useSelector((state) => state.homepage.locations);
    const navigate = useRouter();
    const [location,setLocation] = useState();

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

    // Function for navigation to product details page with slug
    // function NavigateDetailPage(item) {
    //     navigate.push(`/${item?.productBrands?.[0]?.BrandName.toLowerCase()}-${item.ProductName.toLowerCase()}/${item.id}`)
    // }
    useEffect(() => {
        setLocation(JSON.parse(localStorage.getItem('location')))
    },[])
    return (
        <Container id='feature-vechiles' className="mb-2">
            {!nohead && <>
                <div className="section-header my-4">
                    <p className="text-uppercase">Helps you to find your Next Car Easily</p>
                    <h2 className="sub-heading">{headtext} <span>Vehicles</span></h2>
                </div>
            </>}

            {data ? <Carousel
                swipeable={true}
                draggable={false}
                showDots={false}
                responsive={headtext == 'Cars with Similar Price' ? responsiveSimilarPriceCars : responsive}
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
                {data && data?.map((item, id) => {
                    return (
                        <Col className="m-2" key={id}>
                            <Link href={{pathname: '/[brand]/[slug]/[id]/[location]/model',
                                        query: {brand: item?.productBrands?.[0]?.BrandName.toLowerCase(),
                                                slug: item.ProductName.toLowerCase(),
                                                id: item?.id,
                                                location: city?.label},
                                        }}>
                            <Card className="cust-card-item rounded-0">
                                <CardBody>
                                    <div className="cc-item-img">
                                        <img alt=""
                                            src={item?.Images?.images?.[0]}
                                        />
                                    </div>
                                </CardBody>
                                <CardHeader>
                                    <h3>{item?.productBrands?.[0]?.BrandName} {item?.ProductName} A</h3>
                                    {/* <p>₹ {numInLakh(item.initialPrice).slice(0,-1)} - {numInLakh(item.finalPrice)}</p> */}
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip id="tooltip-disabled">
                                                {" "}
                                                {priceFormat(item.initialPrice)} - {priceFormat(item.finalPrice)}
                                                 </Tooltip>
                                        }
                                    >
                                        <span className="d-inline-block">
                                            <div
                                                style={{ pointerEvents: "none" }}
                                            >
                                                <p>₹ {numInLakh(item.initialPrice).slice(0,-1)} - {numInLakh(item.finalPrice)}</p>
                                            </div>
                                        </span>
                                    </OverlayTrigger>
                                </CardHeader>
                                <CardFooter>
                                    <Row>
                                        <Col className={headtext=='Feature' ? "border-end border-3 bottom-icons-view feauture-bottom" : "text-center  border-end border-3 bottom-icons-view" }>
                                            <BiTachometer />
                                            <span className="fs-13">{item.Mileage} KMPL</span>
                                        </Col>
                                        <Col className="text-center border-end border-3 bottom-icons-view">
                                            <BiTachometer />
                                            <span className="fs-13">{item.TopSpeed} KMPH</span>
                                        </Col>
                                        <Col className="text-center bottom-icons-view">
                                            <BiGasPump />
                                            <span className="fs-13">{item?.fuelType?.[0]?.fuelType}</span>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                            </Link>
                        </Col>
                    )
                })}
            </Carousel> : <div className='spinner'><div class="loading-bar"></div></div> }

            <Row>
                <Col className="text-center">
                    <Link href={{pathname: "/search",query: {slug: headtext ? headtext :  'upcoming'}}}
                          as={{pathname: `/search/${headtext ? headtext?.replaceAll(' ', '-') : 'upcoming'}`}}> 
                        <Button className="btn btn-submit px-4 rounded-0">View All</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default SliderCarousal;