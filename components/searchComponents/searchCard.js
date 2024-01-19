import { Button, Col, Row } from "reactstrap";
import ReactStars from "react-stars";
import { useRouter } from "next/router";
import { numberFormat, numInLakh } from "../../priceformat.js";
import { baseUrl } from "../../env.js";
import {
  FaMapMarkerAlt,FaStar,
  FaGasPump,
  FaTachometerAlt,
  FaRegCalendarAlt,
  FaHome,
  FaCalculator,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { BiUserCircle, BiShareAlt, BiCalendarAlt } from "react-icons/bi";
import Link from "next/link";
import { useSelector } from "react-redux";

function SearchCard({ products, gridview }) {
  const baseImageurl = "http://192.168.1.82:1337";
  const navigate = useRouter();
  const city = useSelector((state) => state.homepage.locations);

  function productDeatailNavigate(productId, productName) {
    if (productName.includes(" ")) {
      productName = productName.replaceAll(" ", "-");
    }
    navigate.push(`/${productName.toLowerCase()}/${productId}`);
  }

  function handleShare(item){
    let urlBase = baseUrl +'/'+ item?.productBrands?.[0]?.BrandName.toLowerCase().replaceAll(" ","-") + '/'+ item?.ProductName.toLowerCase() + '/' + item?.id + '/model';
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
    <div className={gridview ? "gridlist" : "gridcard"}>
        <div className="border point_cursor gridlist-card">
        <Link
        href={{
          pathname: "/[brand]/[slug]/[id]/[location]/model",
          query: {
            brand:
              products?.productBrands?.[0]?.BrandName.toLowerCase().replaceAll(
                " ",
                "-"
              ),
            slug: products?.ProductName.toLowerCase(),
            id: products?.id,
            location: city.label
          },
        }}
      >
          <div className="serch-card-img">
            <img
              className="tile-img"
              src={products?.Images?.images?.[0]}
              width={"100%"}
              height={"auto"}
            />
          </div>
          </Link>
          <div className="position-relative grid-body">
            <div className="search-body-data">
            <Link
              href={{
                pathname: "/[brand]/[slug]/[id]/[location]/model",
                query: {
                  brand:
                    products?.productBrands?.[0]?.BrandName.toLowerCase().replaceAll(
                      " ",
                      "-"
                    ),
                  slug: products?.ProductName.toLowerCase(),
                  id: products?.id,
                  location:city.label
                },
              }}
            >
            <h5 className="d-flex align-items-center">
              <label className="card-heading">{products?.productBrands[0]?.BrandName} {products?.ProductName}{" "}
              {products?.ModelYear}</label>
              <label className="d-flex stars-label"><FaStar  className="stars"/>{products.Review}</label>
              {/* <ReactStars
                count={5}
                size={18}
                color2={"#ED2169"}
                value={3}
                className="stars display_webkit_inline"
              /> */}
            </h5>
            </Link>
            <p className="search-card-content d-none d-sm-block d-lg-block">
              {products?.DetailFeatures}
            </p>
            </div>
            <Row className="mt-1">
              <Col>
              <Link
                href={{
                  pathname: "/[brand]/[slug]/[id]/[location]/model",
                  query: {
                    brand:
                      products?.productBrands?.[0]?.BrandName.toLowerCase().replaceAll(
                        " ",
                        "-"
                      ),
                    slug: products?.ProductName.toLowerCase(),
                    id: products?.id,
                    location: city.value
                  },
                }}
            ><Button className="me-3 grid-price rounded-0">
                  ₹ {numInLakh(products?.initialPrice)}
                </Button>
                </Link>
                {/* MSRP : {numInLakh(products?.attributes?.Price)} */}
              </Col>
            </Row>
            <div className="row justify-content-evenly search-card-secs">
              <ul className="d-flex p-0 news-bottom-data">
                {/* <li>
                                <h6 className="d-flex align-items-center">  New </h6>
                                
                                </li>*/}
                <li className="p-0">
                  <h6 className="d-flex align-items-center">
                    {/* <span className="circle "></span>&nbsp; */}
                    {products?.ManufactureYear}
                  </h6>
                </li>
                <li>
                  <h6 className="d-flex align-items-center">
                    <span className="circle "></span>&nbsp;
                    {products?.Transmission?.[0]}
                    {products?.Transmission?.[1] ? "/" : null}
                    {products?.Transmission?.[1]}
                  </h6>
                </li>
                <li>
                  <h6 className="d-flex align-items-center">
                    <span className="circle "></span>&nbsp;
                    {products?.fuelType[0]?.fuelType}
                    {products?.fuelType[1] ? "/" : null}
                    {products?.fuelType[1]?.fuelType}
                  </h6>
                </li>
                <li>
                  {/* <h6 className="d-flex align-items-center"> 
                                        <span className="circle "></span>&nbsp;
                                        Yellow
                                    </h6> */}
                </li>
                <li>
                  <h6 className="d-flex align-items-center">
                    <span className="circle "></span>&nbsp;
                    {products?.BHPTopEnd} BHP
                  </h6>
                </li>

                <li className="share-btns">
                  <h6>
                    {" "}
                    <BiShareAlt className="blog-icons pr-2 primary-color" onClick = {() => handleShare(products)}/>
                  </h6>
                </li>
              </ul>
              {/* <div className="border-end pe-2">
                                <img src="./calendar.png" divor="#000F" className="me-2" /><b>53,000 mi</b>
                            </div> */}
              {/* <div className="col-3 border-end d-none " >
                            <div className="col-3 border-end d-none d-sm-block d-lg-block">
                            <div className="d-flex align-items-center justify-content-center text-center">
                            <FaTachometerAlt /><label className="ml-1 align-items-center text-center">{products?.BHPTopEnd} BHP</label>
                            </div>
                            </div>
                            <div className="col-3 border-end fuel-secs">
                                {products?.fuelType[0]?.fuelType}{products?.fuelType[1]? ("/"):null}{products?.fuelType[1]?.fuelType}
                            </div >
                            <div className="col-4 border-end">
                                {products?.Transmission?.[0]}{products?.Transmission?.[1]? ("/"):null}{products?.Transmission?.[1]}
                            </div>
                            <div className="col-1 text-center">
                                {products?.ManufactureYear}
                            </div>
                            </div> */}
              {/* <div className="col red text-center">
                                <b>Compare</b>
                            </div> */}
            </div>
          </div>
        </div>
    </div>
  );
}

export default SearchCard;

// `http://localhost:3000/api/products/getproductbyid?productId=${7573-9dca-40e1-92e2-2313bfc52087}`
