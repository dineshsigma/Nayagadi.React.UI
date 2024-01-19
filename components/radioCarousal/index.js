import { Button, Card, Col, Container, Row } from "reactstrap";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaRegCircle } from "react-icons/fa";
import Multiselect from "multiselect-react-dropdown";
import Carousel from "react-multi-carousel";
import { responsive, responsiveFilters } from "../../env";
import Link from "next/link";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import { baseUrl } from "../../env";

function RadioCarousal() {
  let list1 = [
    { name: "Newest First" },
    { name: "Latest First" },
    { name: "Oldest First" },
  ];
  const navigate = useRouter();
  const [brandsCarousel, setBrandsCarousel] = useState(true);
  const [bodyCarousel, setBodyCarousel] = useState(false);
  const [brandsList, setBrandsList] = useState([]);

  // const [Allvarients,setAllvarients] = useState([]);
  const [carLogos, setCarLogos] = useState();
  const [AllBodies, setAllBodies] = useState();
  const [Allmodels, setAllModels] = useState([]);
  const [logoNames, setLogoNames] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const [logoId, setlogoId] = useState();
  const [carType, setcarType] = useState();
  const [modelId, setmodelId] = useState();
  const [fuelId, setfuelId] = useState();
  const [Allfuels, setAllfuels] = useState([]);
  const [AllPrices, setAllPrices] = useState([]);
  const [price, setPrice] = useState();
  const [bodyActive, setBodyActive] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [page, setPage] = useState(1);

  function NavigateDetailPage() {
    // navigate.push('/productDetail');
    setBrandsCarousel(!brandsCarousel);
  }
  // Api to get car logos
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/api/homepage/getbrandLogosBasedOnCategory?category=Cars`
      )
      .then((response) => {
        setCarLogos(response.data.data);
      });
  }, [])
  // Api to get Fuel Types
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/api/homepage/listofFuelTypes`
      )
      .then((response) => {
        setAllfuels(response.data.data);
      });
  }, []);
  // Api to get Price Ranges
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/api/products/getpricerange`
      )
      .then((response) => {
        setAllPrices(response.data.data);
      });
  }, []);

  // Api to get ALL BODIES after selection of brand
  const selectedBrand = (e) => {
    if (e.target) {
      carLogos[e.target.selectedIndex - 1]["isselected"] = true;
      carLogos.forEach((item, index) => {
        if (index != e.target.selectedIndex) {
          item["isselected"] = false;
        }
      });
    } else {
      e["isselected"] = true;
      carLogos.forEach((item) => {
        if (item.id != e.id) {
          item["isselected"] = false;
        }
      });
    }
    setCarLogos(carLogos);
    // setSelectedValue(e[0])
    if (e.target) {
      let brandId = carLogos[e.target.selectedIndex - 1]?.id;
      axios
        .get(
          `${baseUrl}/api/homepage/getCarTypeBasedOnBrand?product_brands=${brandId}`
        )
        .then((res) => {
          setAllBodies(res.data.data);
          setlogoId(brandId);
        });
    } else {
      axios
        .get(
          `${baseUrl}/api/homepage/getCarTypeBasedOnBrand?product_brands=${e?.id}`
        )
        .then((res) => {
          setAllBodies(res.data.data);
          setlogoId(e?.id);
        });
    }
    setBrandsCarousel(false);
    setBodyCarousel(true);
    setError(true);
    setErrorMsg(false);
  };

  // API to get models after body selection
  const selectedBody = (e,index) => {
    setBodyActive(e.id);
    if (e.target) {
      AllBodies[e.target.selectedIndex - 1]["isselected"] = true;
      AllBodies.forEach((item, index) => {
        if (index != e.target.selectedIndex - 1) {
          item["isselected"] = false;
        }
      });
    } else {
      e["isselected"] = true;
      AllBodies.forEach((item) => {
        if (item.id != e.id) {
          item["isselected"] = false;
        }
      });
    }
    setAllBodies(AllBodies);
    if (e.target) {
      let bodyId = AllBodies[e.target.selectedIndex - 1].car_type;
      axios
        .get(
          `${baseUrl}/api/homepage/getModelNameBasedOnBrandAndCarType?product_brands=${logoId}&car_type=${bodyId}`
        )
        .then((res) => {
          setAllModels(res.data.data);
          setcarType(bodyId);
        });
    } else {
      axios
        .get(
          `${baseUrl}/api/homepage/getModelNameBasedOnBrandAndCarType?product_brands=${logoId}&car_type=${e.car_type}`
        )
        .then((res) => {
          setAllModels(res.data.data);
          setcarType(e.car_type);
        });
    }
    setError(true);
    setErrorMsg(false);
  };
  // Select Model Function
  const selectedModel = (e) => {
    let reqModelId = Allmodels[e.target.selectedIndex - 1]?.productList?.[0].id;
    setmodelId(reqModelId);
    setError(true);
    setErrorMsg(false);
    // axios
    //   .get(
    //     `${baseUrl}/api/homepage/listofFuelTypes`
    //   )
    //   .then((res) => {
    //     setAllfuels(res.data.data);
    //     console.log(res.data.data, "FUELS");
    //   });
  };
  // Selct Fuel Function
  const selectedFuel = (e) => {
    setfuelId(Allfuels[e.target.selectedIndex - 1]?.id);
    setError(true);
    setErrorMsg(false);
    // axios
    //   .get(
    //     `${baseUrl}/api/products/getpricerange`
    //   )
    //   .then((res) => {
    //     setAllPrices(res.data.data);
    //     console.log(res.data.data, "PRICES");
    //   });
  };
  // Select Price Range Function
  const selectedPrice = (e) => {
    setPrice(AllPrices[e.target.selectedIndex - 1]?.pricerange);
    setError(true);
    setErrorMsg(false);
  };

  async function handleSearch() {
    // console.log(logoId,"---", carType, "---",modelId, "---",fuelId,"---", price, "---");
    setErrorMsg(true);
    // if(logoId || carType || modelId || fuelId || price){
    //   let query_text = `car_type=${carType}&priceRange=${price}&products_brand=${logoId}&fuel_types=${fuelId}&id=${modelId}`;
    //   navigate.push(`/search/searchVehiclesWithLogos?${query_text}`);
    // }else{
    //   setErrorMsg(true);
    // }
    
    // await axios
    //   .get(
    //     `${baseUrl}/api/homepage/searchVehiclesWithLogos?car_type=${carType}&priceRange=${price}&products_brand=${logoId}&fuel_types=${fuelId}&id=${modelId}`
    //   )
    //   .then((res) => {
    //     console.log(res.data.data, "SEARCH DATA");
    //   });
  }
  // console.log("carLogos", logoId,"---", carType, "---",modelId, "---",fuelId,"---", price, "---", AllBodies);
  return (
    <>
      <style jsx>
        {`
          .nav-link.active img:last-child {
            display: initial;
          }

          .nav-link.active img:first-child {
            display: none;
          }

          .nav-link img:last-child {
            display: none;
          }
        `}
      </style>
      <div className="brand-selection" id="radioCarousal">
        <Container className="radioSlideDiv position-relative">
          <Row className="text-center">
            <h5>
              <span className="primary-bg text-white">
                WHICH VEHICLE YOU ARE LOOKING FOR? FIND IT HERE
              </span>
            </h5>
          </Row>
          {/*Radio button TABS */}
          <Row className="g-2 bg-white mt-1">
            <ul
              className="nav justify-content-center"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <Link
                  className="nav-link tab_head active"
                  id="pills-home-tab"
                  href=""
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  <FaRegCircle />
                  Cars
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  className="nav-link tab_head"
                  id="pills-profile-tab"
                  href=""
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  <FaRegCircle />
                  Bikes
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  className="nav-link tab_head"
                  id="pills-contact-tab"
                  href=""
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  <FaRegCircle />
                  Carriers
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  className="nav-link tab_head"
                  id="pills-compare-tab"
                  href=""
                  data-bs-toggle="pill"
                  data-bs-target="#pills-compare"
                  role="tab"
                  aria-controls="pills-compare"
                  aria-selected="false"
                >
                  <FaRegCircle />
                  Trucks
                </Link>
              </li>
            </ul>
          </Row>

          <Row className="m-0 mt-2">
            <div className="tab-content p-0" id="pills-tabContent">
              {/* Type Car Section */}
              <div
                className="tab-pane fade show active text-center"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                { brandsCarousel ? 
                <Carousel
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                  responsive={responsiveFilters}
                  ssr={true}
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={2000}
                  keyBoardControl={true}
                  transitionDuration={500}
                  renderButtonGroupOutside={true}
                  className='p-4 vehicles_icons'
                  customTransition="transform 300ms ease-in-out"
                  arrows={true}
                >
                  {carLogos && carLogos?.length ? carLogos?.map((data, index) => {
                      return (
                        <Col className="m-2" key={index}>
                          <Card className="border-0 box-shadow-0 vi-box">
                            <img
                              alt=""
                              src={data.image}
                              onClick={() => selectedBrand(data)}
                            />
                          </Card>
                        </Col>
                      );
                    }) : <></>}
                </Carousel> :  
                <Carousel
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                  responsive={responsiveFilters}
                  ssr={true}
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={2000}
                  keyBoardControl={true}
                  transitionDuration={500}
                  renderButtonGroupOutside={true}
                  className={bodyCarousel && AllBodies?.length ?'p-4 vehicles_icons body_icons' : 'p-4 vehicles_icons body_icons body-loader' }
                  customTransition="transform 300ms ease-in-out"
                  arrows={true}
              >
                {bodyCarousel && AllBodies?.length ? AllBodies?.map((data, index) => {
                      return (
                        <Col className="m-2" key={index}>
                          <Card
                            className={`border-0 box-shadow-0 vi-box body ${
                              data.id == bodyActive
                                ? "body_active"
                                : ""
                            }`}
                          >
                            <img
                              alt=""
                              src={data.bodyimage}
                              onClick={() => selectedBody(data,index)}
                            />
                            <p className="car-body-text">{data?.cartypeList[0]?.cartype}</p>
                          </Card>
                        </Col>
                      );
                    }) : 
                    <div className="justify-content-center">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>}
              </Carousel>}
              {/* Search filter section */}
          <Row className="justify-content-center filter-droptowns-row">
            {/* SELECT BRAND DROP DOWN */}
            <Col className="col-6 col-sm-2 mt-2">
              <form>
                <select
                  class="form-select home-form-select"
                  style={{
                    border: "1px solid #f0f0f0",
                    borderRadius: "50px",
                    width: "100%",
                    padding: "2%",
                    display: "flex",
                  }}
                  aria-label="Select Brand"
                  placeholder="Any Make"
                  onChange={selectedBrand}
                  // onChange={(value) => selectedBrand(value)}
                >
                  <option value="" disabled selected hidden>
                    Select Brand
                  </option>
                  {carLogos &&
                    carLogos?.map((data, index) => {
                      return (
                        <option
                          key={index}
                          value={data}
                          selected={data?.isselected == true ? true : false}>
                          {data?.BrandName}
                        </option>
                      );
                    })}
                </select>
              </form>
            </Col>
            {/* SELECT BODY DROP DOWN */}
            <Col className="col-6 col-sm-2 mt-2">
              <select
                class="form-select home-form-select"
                style={{
                  border: "1px solid #f0f0f0",
                  borderRadius: "50px",
                  width: "100%",
                  padding: "2%",
                  display: "flex",
                }}
                aria-label="Select Body"
                placeholder="Any Body"
                label="Select Body"
                onChange={selectedBody}>
                <option value="" disabled selected hidden>
                  Select Body
                </option>
                {AllBodies &&
                  AllBodies?.map((data, index) => {
                    return (
                      <option
                        key={index}
                        value={data}
                        selected={data?.isselected == true ? true : false}
                      >
                        {data.cartypeList[0]?.cartype}
                      </option>
                    );
                  })}
              </select>
            </Col>
            {/* SELECT MODEL DROP DOWN */}
            <Col className="col-6 col-sm-2 mt-2">
              <select
                class="form-select home-form-select"
                style={{
                  border: "1px solid #f0f0f0",
                  borderRadius: "50px",
                  width: "100%",
                  padding: "2%",
                  display: "flex",
                }}
                aria-label="Select Body"
                placeholder="Any Body"
                onChange={selectedModel}
              >
                <option value="" disabled selected hidden>
                  Select Model
                </option>
                {Allmodels &&
                  Allmodels?.map((data, index) => {
                    return (
                      <option
                        key={index}
                        value={data}
                        selected={data?.selected == true ? true : false}>
                        {data?.productList?.[0].ProductName}
                      </option>
                    );
                  })}
              </select>
            </Col>
            {/* SELECT FUEL DROP DOWN */}
            <Col className="col-6 col-sm-2 mt-2">
              <select
                class="form-select home-form-select"
                style={{
                  border: "1px solid #f0f0f0",
                  borderRadius: "50px",
                  width: "100%",
                  padding: "2%",
                  display: "flex",
                }}
                aria-label="Select Body"
                placeholder="Any Body"
                onChange={selectedFuel} >
                <option value="" disabled selected hidden>
                  Select Fuel Type
                </option>
                {Allfuels &&
                  Allfuels?.map((data, index) => {
                    return (
                      <option
                        key={index}
                        value={data}
                        selected={data?.selected == true ? true : false}
                      >
                        {data?.fuelType}
                      </option>
                    );
                  })}
              </select>
            </Col>
            {/* SELECT PRICE DROP DOWN */}
            <Col className="col-12 col-sm-2 mt-2">
              <select
                class="form-select home-form-select"
                style={{
                  border: "1px solid #f0f0f0",
                  borderRadius: "50px",
                  width: "100%",
                  padding: "2%",
                  display: "flex",
                }}
                onChange={selectedPrice}
              >
                <option value="" disabled selected hidden>
                  Select Price Range
                </option>
                {AllPrices &&
                  AllPrices?.map((data, index) => {
                    return (
                      <option
                        key={index}
                        value={data}
                        selected={data?.isselected == true ? true : false}
                      >
                        {data?.pricerange}
                      </option>
                    );
                  })}
              </select>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col className="text-center pt-2 pb-4">
              {/* {errorMsg ? <p className="mb-2">Please choose atleast One</p>: <></>} */}
              {error ? 
              <Link href={{pathname: '/search/[slug]',
                            query: {slug: carType, price, logoId, fuelId, modelId, page}
                          }}
                          as={{pathname: `/search/searchVehiclesWithLogos?products_brand=${logoId}&car_type=${carType}&id=${modelId}&fuel_types=${fuelId}&priceRange=${price}&page=${page}`}}> 
              <Button className="btn-red rounded-pill btn-submit mx-auto pe-4 ps-4">
                Search the Vehicle
              </Button>
              </Link> :
              <Button className="btn-red rounded-pill btn-submit mx-auto pe-4 ps-4 disable-button"
               onClick={handleSearch}>
                Search the Vehicle
              </Button>
              }
            </Col>
          </Row>
              </div>

              {/* Type two wheelers Section */}
              {(
                <div
                  className="tab-pane p-0 fade text-center"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <div>
                    <p className="m-4">COMING SOON</p>
                  </div>
                  {/* <Carousel
                    swipeable={true}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={5000}
                    keyBoardControl={true}
                    transitionDuration={500}
                    renderButtonGroupOutside={true}
                    className="p-0"
                    customTransition="transform 300ms ease-in-out"
                    style={{ innerHeight: "1.5rem", outerHeight: "1.5rem" }}
                  >
                    {brandsCarousel &&
                    carLogos ?
                    carLogos?.map((data, index) => {
                      return (
                        <Col className="m-2" key={index}>
                          <Card className="border-0 box-shadow-0 vi-box">
                            <img
                              alt=""
                              src={data.image}
                              onClick={() => selectedBrand(data)}
                            />
                          </Card>
                        </Col>
                      );
                    }) : <p>FETCHING</p>}
                  </Carousel> */}
                </div>
              )}

              {/* Type heavy vechiles Section */}
              <div
                className="tab-pane p-0 fade text-center"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                <div>
                  <p className="m-4">COMING SOON</p>
                </div>
                {/* <Carousel
                  swipeable={true}
                  draggable={false}
                  showDots={false}
                  responsive={responsive}
                  ssr={true}
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={2000}
                  keyBoardControl={true}
                  transitionDuration={500}
                  renderButtonGroupOutside={true}
                  className="p-0"
                  customTransition="transform 300ms ease-in-out"
                  style={{ innerHeight: "1.5rem", outerHeight: "1.5rem" }}>
                  <Col className="m-2">
                    <Card
                      onClick={NavigateDetailPage}
                      className="border-0 box-shadow-0 point_cursor">
                      <img
                        width={200}
                        alt="Sample"
                        src="./carrier_outline.png"
                      />
                    </Card>
                  </Col>
                  <Col className="m-2">
                    <Card
                      onClick={NavigateDetailPage}
                      className="border-0 box-shadow-0 point_cursor">
                      <img
                        width={200}
                        alt="Sample"
                        src="./carrier_outline.png"/>
                    </Card>
                  </Col>
                  <Col className="m-2">
                    <Card
                      onClick={NavigateDetailPage}
                      className="border-0 box-shadow-0 point_cursor">
                      <img
                        width={200}
                        alt="Sample"
                        src="./carrier_outline.png"/>
                    </Card>
                  </Col>
                  <Col className="m-2">
                    <Card
                      onClick={NavigateDetailPage}
                      className="border-0 box-shadow-0 point_cursor">
                      <img
                        width={200}
                        alt="Sample"
                        src="./carrier_outline.png"/>
                    </Card>
                  </Col>
                  <Col className="m-2">
                    <Card
                      onClick={NavigateDetailPage}
                      className="border-0 box-shadow-0 point_cursor">
                      <img
                        width={200}
                        alt="Sample"
                        src="./carrier_outline.png"/>
                    </Card>
                  </Col>
                  <Col className="m-2">
                    <Card
                      onClick={NavigateDetailPage}
                      className="border-0 box-shadow-0 point_cursor">
                      <img
                        width={200}
                        alt="Sample"
                        src="./carrier_outline.png"/>
                    </Card>
                  </Col>
                </Carousel> */}
              </div>

              {/* Type heavy vechiles Section */}
              <div
                className="tab-pane p-0 fade text-center"
                id="pills-compare"
                role="tabpanel"
                aria-labelledby="pills-compare-tab">
                <div>
                  <p className="m-4">COMING SOON</p>
                </div>
                {/* <Carousel
                  swipeable={true}
                  draggable={false}
                  showDots={false}
                  responsive={responsive}
                  ssr={true}
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={2000}
                  keyBoardControl={true}
                  transitionDuration={500}
                  renderButtonGroupOutside={true}
                  className="p-0"
                  customTransition="transform 300ms ease-in-out"
                  style={{ innerHeight: "1.5rem", outerHeight: "1.5rem" }}>
                  <Col className="m-2">
                    <Card
                      onClick={NavigateDetailPage}
                      className="border-0 box-shadow-0 point_cursor">
                      <img
                        width={200}
                        alt="Sample"
                        src="./carrier_outline.png"/>
                    </Card>
                  </Col>
                  <Col className="m-2">
                    <Card
                      onClick={NavigateDetailPage}
                      className="border-0 box-shadow-0 point_cursor">
                      <img
                        width={200}
                        alt="Sample"
                        src="./carrier_outline.png"
                      />
                    </Card>
                  </Col>
                  <Col className="m-2">
                    <Card
                      onClick={NavigateDetailPage}
                      className="border-0 box-shadow-0 point_cursor">
                      <img
                        width={200}
                        alt="Sample"
                        src="./carrier_outline.png"/>
                    </Card>
                  </Col>
                  <Col className="m-2">
                    <Card
                      onClick={NavigateDetailPage}
                      className="border-0 box-shadow-0 point_cursor">
                      <img
                        width={200}
                        alt="Sample"
                        src="./carrier_outline.png"
                      />
                    </Card>
                  </Col>
                  <Col className="m-2">
                    <Card
                      onClick={NavigateDetailPage}
                      className="border-0 box-shadow-0 point_cursor">
                      <img
                        width={200}
                        alt="Sample"
                        src="./carrier_outline.png"
                      />
                    </Card>
                  </Col>
                  <Col className="m-2">
                    <Card
                      onClick={NavigateDetailPage}
                      className="border-0 box-shadow-0 point_cursor">
                      <img
                        width={200}
                        alt="Sample"
                        src="./carrier_outline.png"
                      />
                    </Card>
                  </Col>
                </Carousel> */}
              </div>
            </div>
          </Row>
          <Row>
            {
              <div className="tab-content p-0">
                {/* Type Car Section */}
                {/* <div
                  className="tab-pane fade show active text-center"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <Carousel
                    swipeable={true}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={2000}
                    keyBoardControl={true}
                    transitionDuration={500}
                    renderButtonGroupOutside={true}
                    className="p-4 vehicles_icons"
                    customTransition="transform 300ms ease-in-out"
                  >
                    <Col className="m-2">
                      <Card
                        onClick={NavigateDetailPage}
                        className="border-0 box-shadow-0 vi-box"
                      >
                        <img alt="" src="./icon/cars/02.svg" />
                        <p>SUV</p>
                      </Card>
                    </Col>
                    <Col className="m-2">
                      <Card
                        onClick={NavigateDetailPage}
                        className="border-0 box-shadow-0 vi-box"
                      >
                        <img alt="" src="./icon/cars/03.svg" />
                        <p>SUV</p>
                      </Card>
                    </Col>
                    <Col className="m-2">
                      <Card
                        onClick={NavigateDetailPage}
                        className="border-0 box-shadow-0 vi-box"
                      >
                        <img alt="" src="./icon/cars/04.svg" />
                        <p>SUV</p>
                      </Card>
                    </Col>
                    <Col className="m-2">
                      <Card
                        onClick={NavigateDetailPage}
                        className="border-0 box-shadow-0 vi-box"
                      >
                        <img alt="" src="./icon/cars/05.svg" />
                        <p>SUV</p>
                      </Card>
                    </Col>
                    <Col className="m-2">
                      <Card
                        onClick={NavigateDetailPage}
                        className="border-0 box-shadow-0 vi-box"
                      >
                        <img alt="" src="./icon/cars/06.svg" />
                        <p>SUV</p>
                      </Card>
                    </Col>
                    <Col className="m-2">
                      <Card
                        onClick={NavigateDetailPage}
                        className="border-0 box-shadow-0 vi-box"
                      >
                        <img alt="" src="./icon/cars/07.svg" />
                        <p>SUV</p>
                      </Card>
                    </Col>
                    <Col className="m-2">
                      <Card
                        onClick={NavigateDetailPage}
                        className="border-0 box-shadow-0 vi-box"
                      >
                        <img alt="" src="./icon/cars/08.svg" />
                        <p>SUV</p>
                      </Card>
                    </Col>
                    <Col className="m-2">
                      <Card
                        onClick={NavigateDetailPage}
                        className="border-0 box-shadow-0 vi-box"
                      >
                        <img alt="" src="./icon/cars/09.svg" />
                        <p>SUV</p>
                      </Card>
                    </Col>
                    <Col className="m-2">
                      <Card
                        onClick={NavigateDetailPage}
                        className="border-0 box-shadow-0 vi-box"
                      >
                        <img alt="" src="./icon/cars/10.svg" />
                        <p>SUV</p>
                      </Card>
                    </Col>
                  </Carousel>
                </div> */}
              </div>
            }
          </Row>
        </Container>
      </div>
    </>
  );
}

export default RadioCarousal;
