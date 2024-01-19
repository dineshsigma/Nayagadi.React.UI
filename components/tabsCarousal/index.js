import { Card, CardBody, CardHeader, CardFooter, Col, Container, Row, Button } from "reactstrap";
import Carousel from "react-multi-carousel";
import { useRouter } from 'next/router';
import SliderCarousal from "../sliderCarousal";
import { BiCalendar, BiTachometer, BiGasPump, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { responsive } from "../../env";
import Link from "next/link";

function TabsCarousal({ data }) {
    const navigate = useRouter();

    const CustomRightArrow = ({ onClick, ...rest }) => {
        const {
            onMove,
            carouselState: { currentSlide }
        } = rest;
        // onMove means if dragging or swiping in progress.
        return <button onClick={() => onClick()} className="arrow-btn-r position-absolute end-0 border-0">
            <BiChevronRight />
        </button>;

        // <button onClick={() => onClick()} className={"position-absolute end-0 top-0 btn-light border-0 " + sliderCarousalStyles.arrow_btn} >
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


    function NavigateDetailPage() {
        navigate.push('/productDetail');
    }

    return (
        <>
            <style jsx>{`
                    .nav-link.active{
                        background-color:red !important;
                        color:white !important;
                    }
                `}
            </style>
            <div className="white-bg-1 section">
                <Container className="disable-container">
                    <Row>
                        <Col className="col-12">
                            <div className="section-header g-5 m-0">
                                <p className="text-uppercase">Helps you to find your Next Car Easily</p>
                                <h2 className="sub-heading">Upcoming <span>Vehicles</span></h2>
                            </div>
                        </Col>
                        <Col className="text-center mt-4  rounded-pill-custnav mx-auto" lg={6}>
                            <ul className="nav nav-pills white-bg rounded-pill d-inline-flex justify-content-center align-center p-3" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <Link className="nav-link ash active rounded-pill p-0 px-3" id="pills-home1-tab" href="" data-bs-toggle="pill" data-bs-target="#pills-home1" role="tab" aria-controls="pills-home1" aria-selected="true">
                                        Cars
                                    </Link>
                                </li>
                                <li className="nav-item " role="presentation">
                                    <Link className="nav-link ash rounded-pill p-0 px-3" id="pills-profile1-tab" href="" data-bs-toggle="pill" data-bs-target="#pills-profile1" role="tab" aria-controls="pills-profile1" aria-selected="false">
                                        Bikes
                                    </Link>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <Link className="nav-link ash rounded-pill p-0 px-3" id="pills-contact1-tab" href="" data-bs-toggle="pill" data-bs-target="#pills-contact1" role="tab" aria-controls="pills-contact1" aria-selected="false">
                                        Carriers
                                    </Link>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <Link className="nav-link ash rounded-pill p-0 px-3" id="pills-compare1-tab" href="" data-bs-toggle="pill" data-bs-target="#pills-compare1" role="tab" aria-controls="pills-compare1" aria-selected="false">
                                        Trucks
                                    </Link>
                                </li>
                            </ul>
                        </Col>
                        <Col className="col-12">
                            <div className="tab-content" id="pills-tabContent1">
                                <div className="tab-pane fade show active text-center" id="pills-home1" role="tabpanel" aria-labelledby="pills-home1-tab">
                                    <SliderCarousal nohead="true" data={data} />
                                </div>

                                <div className="tab-pane fade text-center" id="pills-profile1" role="tabpanel" aria-labelledby="pills-profile1-tab">
                                    <p className="p-5">COMING SOON</p>
                                    {/* <Container>
                                        <Carousel
                                            swipeable={true}
                                            draggable={false}
                                            showDots={false}
                                            responsive={responsive}
                                            ssr={true}
                                            infinite={true}
                                            autoPlaySpeed={5000}
                                            autoPlay={true}
                                            keyBoardControl={true}
                                            transitionDuration={500}
                                            renderButtonGroupOutside={true}
                                            customRightArrow={<CustomRightArrow />}
                                            customLeftArrow={<CustomLeftArrow />}
                                            className="p-0"
                                            customTransition="transform 300ms ease-in-out"
                                        >
                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://bd.gaadicdn.com/processedimages/yamaha/yamaha-yzf-r1/494X300/m_yzf-r1_11548224217.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>Yamaha YZF R1</h3>
                                                        <p>Rs.20.39 Lakh</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>

                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://bd.gaadicdn.com/processedimages/ktm/duke-250/640X309/duke-2505fd47ada209b5.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>KTM 250 Duke</h3>
                                                        <p>Rs.2.37 Lakh</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>

                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://bd.gaadicdn.com/processedimages/jawa-motorcycles/42-bobber/494X300/42-bobber6337d3957bb64.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>Jawa 42 Bobber</h3>
                                                        <p>Rs.2.09 Lakh</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>

                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://bd.gaadicdn.com/processedimages/harley-davidson/custom-1250/source/custom-12506368ddd1eee4d.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>Harley Davidson Sportster S</h3>
                                                        <p>Rs.16.51 Lakh</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>


                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://bd.gaadicdn.com/processedimages/hero-motocorp/hero-motocorp-splendor/494X300/hero-motocorp-splendor632195611b57c.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>Hero Splendor Plus</h3>
                                                        <p>Rs.72,076 - 76,346</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>

                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://bd.gaadicdn.com/processedimages/honda/activa-6g/640X309/activa-6g62fdd088e2ab1.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>Honda Activa 6G</h3>
                                                        <p>Rs.73,086 - 76,587</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>

                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://bd.gaadicdn.com/processedimages/hero/xpulse-200/640X309/xpulse-20062d7a58d8693c.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>Hero XPulse 200</h3>
                                                        <p>Rs.1.38 - 1.52 Lakh</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>

                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://bd.gaadicdn.com/processedimages/royal-enfield/scram/640X309/scram62381d1eb7d11.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>Royal Enfield Scram 411</h3>
                                                        <p>Rs.2.03 - 2.09 Lakh</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>
                                        </Carousel>

                                        <Row>
                                            <Col className="text-center">
                                                <Button className="btn btn-submit px-4 rounded-0" onClick={() => navigate.push('/search')}>View All</Button>
                                            </Col>
                                        </Row>
                                    </Container> */}
                                </div>

                                <div className="tab-pane fade text-center" id="pills-contact1" role="tabpanel" aria-labelledby="pills-contact1-tab">
                                    <p className="p-5">COMING SOON</p>
                                    {/* <Container>
                                        <Carousel
                                            swipeable={true}
                                            draggable={false}
                                            showDots={false}
                                            responsive={responsive}
                                            ssr={true}
                                            infinite={true}
                                            autoPlaySpeed={5000}
                                            autoPlay={true}
                                            keyBoardControl={true}
                                            transitionDuration={500}
                                            renderButtonGroupOutside={true}
                                            customRightArrow={<CustomRightArrow />}
                                            customLeftArrow={<CustomLeftArrow />}
                                            className="p-0"
                                            customTransition="transform 300ms ease-in-out"
                                        >
                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://cvimg1.cardekho.com/p/630x420/in/mahindra/bolero-pikup-extralong-bs6/mahindra-bolero-pikup-extralong-bs6-72354.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>Mahindra Bolero Pikup ExtraLon</h3>
                                                        <p>₹8.46 - ₹8.72 Lakh</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>

                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://cvimg1.cardekho.com/p/630x420/in/mahindra/big-bolero-pik-up/mahindra-big-bolero-pik-up-51171.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>Mahindra Bolero Pikup 4x4</h3>
                                                        <p>₹8.80 Lakh</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>

                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://cvimg1.cardekho.com/p/630x420/in/maruti-suzuki/super-carry/maruti-suzuki-super-carry-88671.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>Maruti Suzuki Super Carry</h3>
                                                        <p>₹4.14 Lakh Starts</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>

                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://cvimg1.cardekho.com/p/630x420/in/mahindra/jeeto/mahindra-jeeto-54868.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>Mahindra Jeeto</h3>
                                                        <p>₹4.38 - ₹5.08 Lakh*</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>

                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://cvimg1.cardekho.com/p/630x420/in/tata/ace-gold/tata-ace-gold-21473.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>Tata Ace gold</h3>
                                                        <p>₹3.99 - ₹6.35 Lakh</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>
                                        </Carousel>

                                        <Row>
                                            <Col className="text-center">
                                                <Button className="btn btn-submit px-4 rounded-0" onClick={() => navigate.push('/search')}>View All</Button>
                                            </Col>
                                        </Row>
                                    </Container> */}
                                </div>

                                <div className="tab-pane fade text-center" id="pills-compare1" role="tabpanel" aria-labelledby="pills-compare1-tab">
                                    <p className="p-5">COMING SOON</p>
                                    {/* <Container>
                                        <Carousel
                                            swipeable={true}
                                            draggable={false}
                                            showDots={false}
                                            responsive={responsive}
                                            ssr={true}
                                            infinite={true}
                                            autoPlaySpeed={5000}
                                            autoPlay={true}
                                            keyBoardControl={true}
                                            transitionDuration={500}
                                            renderButtonGroupOutside={true}
                                            customRightArrow={<CustomRightArrow />}
                                            customLeftArrow={<CustomLeftArrow />}
                                            className="p-0"
                                            customTransition="transform 300ms ease-in-out"
                                        >
                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://cvimg1.cardekho.com/p/630x420/in/bharat-benz/2823c-bs6/bharat-benz-2823c-bs6-19540.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>BharatBenz 2823C</h3>
                                                        <p>₹44.37 Lakh starts</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>

                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://cvimg1.cardekho.com/p/630x420/in/tata/lpk-1212-crx/tata-lpk-1212-crx-95296.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>Tata 1212 LPK</h3>
                                                        <p>₹15.09 - ₹17.00 Lakh</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>

                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://cvimg1.cardekho.com/p/630x420/in/tata/signa-2823-k-hd-9s/tata-signa-2823-k-hd-9s-39314.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>Tata Signa 2823.K HD 9S</h3>
                                                        <p>₹36.26 Lakh</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>

                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://cvimg1.cardekho.com/p/630x420/in/eicher/pro-2059-cng/eicher-pro-2059-cng-71260.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>Eicher Pro 2059 CNG</h3>
                                                        <p>₹12.92 Lakh</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>

                                            <Col className="m-2">
                                                <Card onClick={NavigateDetailPage} className="cust-card-item rounded-0">
                                                    <CardBody>
                                                        <div className="cc-item-img">
                                                            <img alt=""
                                                                src="https://cvimg1.cardekho.com/p/630x420/in/ashok-leyland/partner-super-914/ashok-leyland-partner-super-914.jpg"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                    <CardHeader>
                                                        <h3>Ashok Leyland Partner Super 914</h3>
                                                        <p>Price Coming Soon</p>
                                                    </CardHeader>
                                                    <CardFooter>
                                                        <Row>
                                                            <Col className="text-center  border-end border-3">
                                                                <BiCalendar />
                                                                <span className="fs-13"> 2022</span>
                                                            </Col>
                                                            <Col className="text-center border-end border-3">
                                                                <BiTachometer />
                                                                <span className="fs-13">120</span>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <BiGasPump />
                                                                <span className="fs-13">Petrol</span>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </Col>
                                        </Carousel>

                                        <Row>
                                            <Col className="text-center">
                                                <Button className="btn btn-submit px-4 rounded-0" onClick={() => navigate.push('/search')}>View All</Button>
                                            </Col>
                                        </Row>
                                    </Container> */}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default TabsCarousal;