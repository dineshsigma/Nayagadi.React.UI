import EmiModal from "../popupModal";
import ReactStars from "react-stars";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { Col, Container, Row, Select, Button, Card, CardBody, CardImg, Label } from "reactstrap";
import { useState, useEffect } from "react";
import { BiVideo, BiAdjust } from "react-icons/bi";
import { FaSyncAlt, FaPrint, FaShareAlt, FaRegCheckCircle } from "react-icons/fa";
import { numInLakh, priceFormat } from "../../priceformat";
import Details from "./details";
import SpecsVariant from "./SpecsVariant";
// import { toast } from "react-toastify";
import PriceVariant from "./PriceVariant";
import CompareVariant from "./CompareVariant";
import Gallery from "../../pages/gallery";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import useDownloader from 'react-use-downloader';
import { FaCarAlt, FaPalette } from "react-icons/fa";
import { GiCarSeat } from "react-icons/gi";
import { BiCalculator, BiPencil, BiShieldQuarter, BiGitCompare } from "react-icons/bi";
import Head from "next/head";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { baseUrl } from "../../env";
import {useSelector} from "react-redux";


function VariantLayout({ product, variantsData }) {
  const city = useSelector((state) => state.homepage.locations);
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();

  const [brouchermodal, setbrouchermodal] = useState(false);
  const [modal, setModal] = useState(false);
  const [leadFormopen, setLeadFormopen] = useState(false);
  const [leadResponse, setLeadResponse] = useState();
  const [userDetail, setUserDetail] = useState({ city: "", name: "", phone: "" });
  const [reviewmodal, setReviewmodal] = useState(false);
  const [allCity, setAllcity] = useState();
  const [selectedCity,setSelectedCity] = useState();
  const [displayLeadForm,setDisplayLeadForm] = useState(true)
  const toggle = () => setModal(!modal);
  const togglebroucher = () => setbrouchermodal(!brouchermodal);


  const images = [
    {
      original: product?.[0]?.Images?.images[0],
      thumbnail: product?.[0]?.Images?.images[0],
    },
  ];

  const [show, setShow] = useState(false);
  const [click, setClick] = useState('');

  const view = '360 view';
  const exterior = 'exterior';
  const interior = 'interior';
  const colors = 'colors';
  const road = 'road test';
  const video = 'videos';

  const filename = product?.[0]?.ModelVariantName
  function showModel(value) {
    setShow(true)
    setClick(value)
  }
  //EMI CALUCALTIONS
  // const productPrice = useSelector((state) => state.searchproducts.productDetails?.[0]?.initialPrice);
  const [downpayment, setDownpayment] = useState(150000)
  const [bankinterest, setBankInterest] = useState(9.8)
  const [loanperiod, setLoanPeriod] = useState(5)
  const [price, setPrice] = useState(product?.[0]?.Price)
  const [emicalculation, setEmicalculation] = useState({})


  useEffect(() => {
    setPrice(product?.[0]?.Price)
  }, [product])

  useEffect(() => {
    let latestPrice = price - downpayment;
    let InterestValue = (latestPrice * bankinterest * loanperiod / 100)
    InterestValue.toFixed(2)
    let TotalAmount = InterestValue + latestPrice
    TotalAmount.toFixed(2)
    let EMIAmount = TotalAmount / (loanperiod * 12);
    EMIAmount.toFixed(1)
    setEmicalculation(
      { latestPrice: latestPrice, InterestValue: InterestValue, TotalAmount: TotalAmount, EMIAmount: EMIAmount })
  }, [downpayment, bankinterest, loanperiod, price])
  //Share product functionality
  const handleShare = () => {
    // Check if navigator.share is supported by the browser
    if (navigator.share) {
      // console.log("Congrats! Your browser supports Web Share API");
      navigator
        .share({
          url: window.location.href
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
  function print() {
    window.print();
  }
  const leadForm = () => {
    setLeadFormopen(true);
  }
  const onValueChange = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };
  const SubmitForm = (e) => {
    e.preventDefault()
    axios.post(`${baseUrl}/api/modelvarient/downloadBrochureAPI`, {
      state: userDetail.city,
      username: userDetail.name,
      phone: userDetail.phone,
      varientId: product?.[0]?.id
    }).then((res) => {
      setLeadResponse(res.data)
      setDisplayLeadForm(false)
      download(product?.[0]?.brochure, `${filename}.pdf`)
      // toast.success(res.data.message)
      setLeadFormopen(false);
      setUserDetail({ city: "", name: "", phone: "" })
    }).catch(err => toast.error(err))
    // SubmitLeadForm(userDetail)
  }
  const mileageRating = (newRating) => {
    setMileageRate()
  }
  const maintenanceRating = (newRating) => {
    setMaintenanceRate(newRating)
  }
  const safetyRating = (newRating) => {
    setSafetyRate(newRating)
  }
  const featuresRating = (newRating) => {
    setFeaturesRate(newRating)
  }
  const comfortRating = (newRating) => {
    setComfortRate(newRating)
  }
  const performanceRating = (newRating) => {
    setPerformanceRate(newRating)
  }

  const openLeadform = () => {
    let cities = []
    let selectCity;

    setbrouchermodal(!brouchermodal)
    axios
      .get(`${baseUrl}/api/locationtaxes/getcities`)
      .then((response) => {
        cities = response.data.data.map(item => {
          item["label"] = item["city"];
          item["value"] = item["id"];
          delete item["city"];
          delete item["id"];
          return item;
        })
        setAllcity(cities);
        selectCity = cities.find((item) => {
         return item.label == city.label
        })
        setSelectedCity(selectCity)
      });
      
    
  }
  return (
    <>
      <Head>
        <title>{product?.[0]?.ModelVariantName}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Nayagadi_Icon.png" />
      </Head>
      <style jsx>
        {`
          .tab_head {
            color: rgba(0, 0, 0, 0.5) !important;
          }

          .tab_head.active {
            border-bottom: 3px solid red;
            padding-bottom: 0;
          }
        `}
      </style>
      <Container className="variant_page">
        <Row className="g-5 p-0 ">
          <Col lg="8">
            <Row className="bg-white my-3 py-3">
              <Row className="mb-2 title-card row">
                <Col className="col-12 col-sm-8">
                  <p className="m-0">{product?.[0]?.category}</p>
                  <h3 className="fw-500">
                    {product?.[0]?.ModelVariantName}{" "}
                    <span className="red">{product?.[0]?.ProductName}</span>
                  </h3>
                </Col>
                <Col className="col-6 col-sm-2 pl-5 border-end float-end justify-content-end">
                  <p className="m-0">
                    <b>PRICE</b>
                  </p>
                  <h3 className="m-0 mt-2 black title-sides-p justify-content-center">
                    {/* <b>₹ {numInLakh(product?.[0]?.Price)}</b> */}
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="tooltip-disabled">
                          {" "}
                          {priceFormat(product?.[0]?.Price)}
                        </Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <div
                          style={{ pointerEvents: "none" }}
                        >
                          <b>₹ {numInLakh(product?.[0]?.Price)}</b>
                        </div>
                      </span>
                    </OverlayTrigger>
                    <span className="red">*</span>
                  </h3>
                </Col>
                <Col lg={2} className="col-6 col-sm-2 d-grid justify-content-end">
                  <p className="m-0 title-sides">
                    <b>Reviews</b>
                  </p>
                  <div className="d-flex justify-content-center">
                    <ReactStars
                      count={5}
                      size={18}
                      color2={"#D01818"}
                      value={product?.[0]?.Review}
                    /><label className='d-flex align-items-center mb-2'>{product?.[0]?.Review}</label>
                  </div>
                  {/* <p onClick={() => setReviewmodal(true)} >Write a review</p> */}
                </Col>
              </Row>

              <Row className="m-0 p-0 product-container">
                <Col lg={10} className="gallery-container">
                  <ImageGallery
                    items={images}
                    slideOnThumbnailOver={true}
                    showNav={false}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showBullets={false}
                    thumbnailPosition={"left"}
                  />

                  {/* <div className="strip-nav">
                                                <Button className="thumbnail-img-btn" onClick={() => router.push('/gallery#pills-360view')}>
                                                    <div className="thumbnail-img">
                                                        <img src="/car3.png" />
                                                    </div>
                                                    <div className="content">
                                                        <FaSyncAlt />
                                                        <span>360 View</span>
                                                    </div>
                                                </Button>

                                                <Button className="thumbnail-img-btn" onClick={() => router.push('/gallery#pills-videos')}>
                                                    <div className="thumbnail-img">
                                                        <img src="/car3.png" />
                                                    </div>
                                                    <div className="content">
                                                        <BiVideo />
                                                        <span>Videos</span>
                                                    </div>
                                                </Button>

                                                <Button className="thumbnail-img-btn thumbnail-img-btn_2" onClick={() => router.push('/gallery#pills-colours')}>
                                                    <div className="thumbnail-img">
                                                        <img src="/car3.png" />
                                                    </div>
                                                    <div className="content">
                                                        <BiAdjust />
                                                        <span>Colors</span>
                                                    </div>
                                                </Button>
                                            </div> */}
                  <div className="strip-nav">
                    <Button
                      className="thumbnail-img-btn"
                      value="360view"
                      onClick={() => showModel(view)}
                    >
                      <div className="thumbnail-img">
                        <img src="/car3.png" />
                      </div>
                      <div className="content">
                        <FaSyncAlt />
                        <span className="fs-10">360 View</span>
                      </div>
                    </Button>

                    <Button
                      className="thumbnail-img-btn"
                      onClick={() => showModel(exterior)}
                    >
                      <div className="thumbnail-img">
                        <img src="/car3.png" />
                      </div>
                      <div className="content">
                        <FaCarAlt />
                        <span className="fs-10">Exterior</span>
                      </div>
                    </Button>

                    <Button
                      className="thumbnail-img-btn"
                      onClick={() => showModel(interior)}
                    >
                      <div className="thumbnail-img">
                        <img src="/car3.png" />
                      </div>
                      <div className="content">
                        <GiCarSeat />
                        <span className="fs-10">Interior</span>
                      </div>
                    </Button>

                    <Button
                      className="thumbnail-img-btn"
                      onClick={() => showModel(colors)}
                    >
                      <div className="thumbnail-img">
                        <img src="/car3.png" />
                      </div>
                      <div className="content">
                        <FaPalette />
                        <span className="fs-10">Colors</span>
                      </div>
                    </Button>

                    {/* <Button
                            className="thumbnail-img-btn"
                            onClick={() => showModel(road)}
                          >
                            <div className="thumbnail-img">
                              <img src="/car3.png" />
                            </div>
                            <div className="content">
                              <FaSyncAlt />
                              <span>Road Test</span>
                            </div>
                          </Button> */}

                    <Button
                      className="thumbnail-img-btn"
                      onClick={() => showModel(video)}
                    >
                      <div className="thumbnail-img">
                        <img src="/car3.png" />
                      </div>
                      <div className="content">
                        <BiVideo />
                        <span className="fs-10">Videos</span>
                      </div>
                    </Button>

                    {/* <Button
                            className="thumbnail-img-btn thumbnail-img-btn_2"
                            onClick={() =>
                              router.push("/gallery#pills-colours")
                            }
                          >
                            <div className="thumbnail-img">
                              <img src="/car3.png" />
                            </div>
                            <div className="content">
                              <BiAdjust />
                              <span>Colors</span>
                            </div>
                          </Button> */}
                  </div>
                </Col>
                <Col className="text-end mt-3 side-slider-spec wrap-overflow car-side-specs col">
                  <p className="m-0 fw-500 sepc-headings">Engine</p>
                  <p className="fw-500 sepc-ranges">
                    <span className="h4">{product?.[0]?.Engine}</span>{" "}
                    <small className="black rang-extentions">cc</small>
                  </p>

                  <p className="m-0 mt-3 fw-500 sepc-headings">Max Power</p>
                  <p className="fw-500 sepc-ranges">
                    <span className="h4">{product?.[0]?.MaxPower}</span>{" "}
                    <small className="black rang-extentions">BHP</small>
                  </p>

                  <p className="m-0 mt-3 fw-500 sepc-headings">Top Speed</p>
                  <p className="fw-500 sepc-ranges">
                    <span className="h4">{product?.[0]?.TopSpeed}</span>{" "}
                    <small className="black rang-extentions">KMPH</small>
                  </p>

                  <p className="m-0 mt-3 fw-500 sepc-headings">1-100 KMPH</p>
                  <p className="fw-500 sepc-ranges">
                    <span className="h4">{product?.[0]?.speedRange}</span>{" "}
                    <small className="black rang-extentions">secs</small>
                  </p>

                  <p className="m-0 mt-3 fw-500 sepc-headings">Fuel Economy</p>
                  {/* <p className="fw-500">
                        City <span className="h4">{product?.[0]?.city}</span>{" "}
                        <small className="black">KMS</small>
                      </p> */}
                  <p className="fw-500 fuel-range">
                    {" "}
                    {" "}
                    <span className="h4">{product?.[0]?.highway}</span>{" "}
                    <small className="black rang-extentions">KMPL </small>
                  </p>
                  <small className="black rang-extentions float-end">(Highway)</small>
                </Col>
              </Row>

              <Modal
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-custom-modal-styling-title"
                className="modal-popup"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-custom-modal-styling-title modal-title-head">
                    {click}
                  </Modal.Title>
                </Modal.Header>
                <Gallery forGallery={click} />
              </Modal>

              <Row className="m-0 p-0 mb-2 mt-2">
                <hr />
                <Col className="text-end">
                  <div className="d-flex gap-2 float-end">
                    {product?.[0]?.brochure && <BsFillFileEarmarkPdfFill className="icon-btns-variants" onClick={openLeadform} />}
                    <FaPrint className="icon-btns-variants" onClick={print} />
                    <FaShareAlt className="icon-btns-variants" onClick={handleShare} />

                  </div>
                  {/* <img alt="pdf-icon" className="mx-2" src="/pdf-icon.svg" /> */}

                  {/* <img alt="like-icon" className="mx-2" src="/like-icon.svg" /> */}

                </Col>
              </Row>
            </Row>
            {/* boruchr modals starts hear */}
            <Modal isOpen={brouchermodal} className="broucher-modal-download">
              <ModalHeader toggle={togglebroucher}></ModalHeader>
              <ModalBody>

                <div className='top_icons_container'>
                  <div className="borucher-form">
                 {displayLeadForm &&   <div>
                    <p>
                      Download Brochure for
                    </p>
                    <h4> {product?.[0]?.ProductName} {product?.[0]?.ModelVariantName}</h4>
                    <Form validate="true" onSubmit={(e) => SubmitForm(e)} className='mt-2'>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Name <span class="red">*</span></Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={userDetail.name} required
                          onChange={onValueChange}
                          name="name" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Phone Number <span class="red">*</span></Form.Label>
                        <Form.Control type="number" placeholder="Enter Mobile Number" value={userDetail.phone} required
                          onChange={onValueChange}
                          name="phone" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>City at <span class="red">*</span></Form.Label>
                        {/* <Form.Control type="text" placeholder="Enter City" value={userDetail.city}
                    required
                    onChange={onValueChange}
                    name="city" /> */}
                        <Form.Control aria-label="Default select example"
                         as="select"
                         name="city"
                         value={userDetail.city}
                         onChange = { onValueChange}
                         >
                          {allCity && allCity.map((item,id) => {
                            return(
                              <>
                            <option value = {item.label}>{item.label}</option>
                            {/* <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option> */}
                            </>
                            )
                          })}
                          
                        </Form.Control>

                      </Form.Group>
                      <Button type="submit" className="btn-red btn-product-emi my-2 btn btn-secondary btn-lg"><a href={product?.[0]?.brochure} download></a>
                        Download Brochure
                      </Button>
                    </Form>
                    </div>}
                    {/* after the form submittion */}
                  {leadResponse &&  <div className="d-flex">
                      <img src="/check.svg" />
                      <h4>Thanks for your interest in {product?.[0]?.ProductName} {product?.[0]?.ModelVariantName}</h4>
                    </div>}
                    {leadResponse && <div className="whats-app p-4 mt-3">
                      <img src="/wapp.svg" />
                      <p>Thank You! We would keep you updated on latest cars and offers through Whatsapp</p>
                    </div>}
                  </div>
                </div>
              </ModalBody>

            </Modal>
            {leadFormopen && <Row>
              <p onClick={() => setLeadFormopen(false)}>skip</p>
              <Form validate="true" onSubmit={(e) => SubmitForm(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="Enter City" value={userDetail.city}
                    required
                    onChange={onValueChange}
                    name="city" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" value={userDetail.name} required
                    onChange={onValueChange}
                    name="name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="number" placeholder="Enter Mobile Number" value={userDetail.phone} required
                    onChange={onValueChange}
                    name="phone" />
                </Form.Group>
                <Button variant="primary" type="submit"><a href={product?.[0]?.brochure} download></a>
                  Download Brochure
                </Button>
              </Form>
            </Row>}
            <Row className="bg-white mt-3">
              <ul className="nav p-2" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link tab_head active fw-bold"
                    id="pills-profile-tab"
                    href=""
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    {" "}
                    SPECIFICATIONS
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link tab_head fw-bold"
                    id="pills-contact-tab"
                    href=""
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    PRICE
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link tab_head fw-bold"
                    id="pills-compare-tab"
                    href=""
                    data-bs-toggle="pill"
                    data-bs-target="#pills-compare"
                    role="tab"
                    aria-controls="pills-compare"
                    aria-selected="false"
                  >
                    COMPARE MODEL
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link tab_head fw-bold"
                    id="pills-home-tab"
                    href=""
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    DETAILS
                  </a>
                </li>
              </ul>
            </Row>

            <Row className="mt-3">
              <div className="tab-content p-0" id="pills-tabContent">
                <div
                  className="tab-pane p-0 fade show active"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <SpecsVariant product={product} />
                </div>
                <div
                  className="tab-pane p-0 fade"
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                >
                  <PriceVariant product={product} EMIAmount={emicalculation?.EMIAmount} />
                </div>
                <div
                  className="tab-pane p-0 fade"
                  id="pills-compare"
                  role="tabpanel"
                  aria-labelledby="pills-compare-tab"
                >
                  <CompareVariant product={product} variantsData={variantsData} />
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <Details product={product} />
                </div>
                <div
                  className="tab-pane p-0 fade"
                  id="pills-more"
                  role="tabpanel"
                  aria-labelledby="pills-more-tab"
                >
                  <p>Fifth</p>
                </div>
              </div>
            </Row>

            {/* <Row className="bg-white mt-3 py-4">
              <h5>Features</h5>
              <h5>
                {product?.[0]?.attributes?.car_features?.data?.map(
                  (features, id) => {
                    return (
                      <div key={id}>
                        <ul className="features-list">
                          <li>
                            <BiVideo />
                            {features?.attributes?.Features}
                          </li>
                        </ul>
                      </div>
                    );
                  }
                )}
              </h5>
            </Row> */}
          </Col>
          <Col lg="4" className="emi-container">
            <Row className="px-3 p-2 bg-white mt-3">
              <div className=" m-0 p-0 gap-1 d-flex justify-content-between">
                <Button
                  className="btn-red  btn-product-emi my-2"
                  size="lg"
                  onClick={() => setModal(true)}
                >
                  <BiCalculator className="btn-icons" /> EMI CALCULATOR
                </Button>
                <Button className="btn-black  btn-product-emi my-2" size="lg">
                  <BiShieldQuarter className="btn-icons" /> INSURANCE
                </Button>
              </div>
              <Card className="emi-card my-2">
                <CardBody>
                  <Row >
                    <Col className="col-7  p-0 m-0 ">
                      <h5 className="m-0 text-white fw-400">EMI Details </h5>
                      <h5 className="m-0 mt-2  d-flex align-items-center pencil-btn">
                        <button className="emi-pencil-btn"><BiPencil className="btn-icons" onClick={() => setModal(true)} /></button>
                        <label className="amt"> <span className="fs-18"></span>{priceFormat(emicalculation?.EMIAmount)?.split('.')[0]}<span className="fs-13">/Month</span> </label>
                      </h5>
                    </Col>
                    <Col className="m-0 p-0 " >
                      <div>
                        <CardImg src="/../emiimg.svg" className="" />
                      </div>
                    </Col>
                  </Row>
                  <h6 className="fs-13 mt-1">
                    Interest calculated starts at 9.8% for 60 months
                  </h6>
                </CardBody>
                <Button className="btn-knowmore mb-2" size="lg">
                  <span> Find More Finance companies</span>

                </Button>
              </Card>
              <img src="/ad6.png" className="p-0" />

              {/* <img src="/../car_add.jpg" className="p-0 my-2" /> */}

            </Row>
          </Col>
        </Row>
      </Container>

      <EmiModal
        product={product}
        open={modal}
        toggle={toggle}
        backdrop={true}
      />
      <Modal
        show={reviewmodal}
        onHide={() => setReviewmodal(false)}
        aria-labelledby="example-custom-modal-styling-title"
        className="modal-popup"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title modal-title-head">
            Rate and Review <span>{product?.[0]?.ModelVariantName}</span>
          </Modal.Title>
          <Modal.Body>
            <p>Modal body text goes here.</p>
            <p>Mileage <span><ReactStars
              count={5}
              size={18}
              color2={"#D01818"}
              onChange={mileageRating}
            // value={3}
            /></span> </p>
            <p>Maintenance Cost <span><ReactStars
              count={5}
              size={18}
              color2={"#D01818"}
              onChange={maintenanceRating}
            // value={3}
            /></span> </p>
            <p>Safety <span><ReactStars
              count={5}
              size={18}
              color2={"#D01818"}
              onChange={safetyRating}
            // value={3}
            /></span> </p>
            <p>Features and Styling <span><ReactStars
              count={5}
              size={18}
              color2={"#D01818"}
              onChange={featuresRating}
            // value={3}
            /></span> </p>
            <p>Comfort <span><ReactStars
              count={5}
              size={18}
              color2={"#D01818"}
              onChange={comfortRating}
            // value={3}
            /></span> </p>
            <p>Performance <span><ReactStars
              count={5}
              size={18}
              color2={"#D01818"}
              onChange={performanceRating}

            // value={3}
            /></span> </p>
          </Modal.Body>

        </Modal.Header>

      </Modal>
    </>
  );
}

export default VariantLayout;
