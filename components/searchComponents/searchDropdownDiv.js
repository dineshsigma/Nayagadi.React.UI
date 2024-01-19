import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  Form,
  FormGroup,
  Input,
  FormText,
  CardBody,
  Col,
  Label,
  Row,
} from "reactstrap";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiListUl, BiGridAlt, BiGridSmall } from "react-icons/bi";
import { changeGridview } from "../../store/searchslice";
import { baseUrl } from "../../env";

function SearchDropdownDiv({ changeGrid, changegridview, gridview }) {
  let dispatch = useDispatch();
  const navigate = useRouter();
  const [bodyType, setBodyType] = useState();
  // const [gridview, setGridView] = useState(false);
  const [brandnames, setBrandnames] = useState();
  const [modalnames, setModalnames] = useState();
  const [priceRange, setPriceRange] = useState();
  const [payloadType, setPayloadType] = useState();
  const [payloadRange, setPayloadRange] = useState();
  const [selectedModal, setSelectedModal] = useState();
  const [selected_bodyType, setSelected_bodytype] = useState();
  const [selected_brand, setSelected_Brand] = useState();
  const refbrand = useRef(selectedModal);
  let list1 = [
    { name: "Newest First" },
    { name: "Latest First" },
    { name: "Oldest First" },
  ];
  useEffect(() => {
    axios.get(`${baseUrl}/api/products/getcartypes`).then((res) => {
      setBodyType(res.data.data);
    });
    axios.get(`${baseUrl}/api/modelvarient/getbrandnames`).then((res) => {
      setBrandnames(res.data.data);
    });
    axios.get(`${baseUrl}/api/products/getpricerange`).then((res) => {
      setPriceRange(res.data.data);
    });
  }, []);

  // const getCartype = (e) => {
  //   // setPayloadType(e[0].id);
  //   setSelected_bodytype(e[0].id);
  //   navigate.push(`/search/bybudget/${e[0].id}/
  //        ${payloadRange}`);
  // };
  // const getSelectedBrand = (e) => {
  //   console.log(e, 'EEE')
  //   navigate.push(`/search/bybrand/${e[0].id}/${selectedModal}`);
  //   axios
  //     .get(
  //       `${baseUrl}/api/products/getListOfProductNames?products_brand=${e[0].id}&productName=undefined`
  //     )
  //     .then((res) => {
  //       setModalnames(res.data.data);
  //     });
  // };
  // const getSelectedName = (e) => {
  //   navigate.push(`/search/bybrand/${selectedModal}/
  //       ${e[0].id}`);
  // axios.get(`${baseUrl}/api/products/getListOfProductNames?products_brand=${e[0].id}`).then((res) => {
  //     setModalnames(res.data.data)
  // })
  // };
  // const getPriceRange = (e) => {
  //   navigate.push(`/search/bybudget/${selected_bodyType}/
  //       ${e[0].pricerange}`);
  //   setPayloadRange(e[0].pricerange);
  // };
  const changeView = () => {
    dispatch(changeGridview());
  };
  const getPriceRange = (e) => {
    setPayloadRange(e[0].pricerange);
    if (selected_bodyType) {
      navigate.push({
        pathname: "/search",
        query: {
          type: "bybudget",
          pricerange: e[0].pricerange,
          bodytype: selected_bodyType,
          page: 1,
        },
      });
    } else {
      navigate.push({
        pathname: "/search",
        query: {
          type: "bybudget",
          pricerange: e[0].pricerange,
          page: 1,
        },
      });
    }
  };
  const getCartype = (e) => {
    setSelected_bodytype(e[0].id);
    navigate.push({
      pathname: "/search",
      query: {
        type: "bybudget",
        pricerange: payloadRange,
        bodytype: e[0].id,
        page: 1,
      },
    });
  };
  const getSelectedBrand = (e) => {
    setSelected_Brand(e[0].id);
    navigate.push({
      pathname: "/search",
      query: {
        type: "bybrand",
        brand: `${e[0].BrandName.toLowerCase()}`,
        id: `${e[0].id}`,
        page: 1,
      },
    });
    axios
      .get(
        `${baseUrl}/api/products/getListOfProductNames?products_brand=${e[0].id}&productName=undefined`
      )
      .then((res) => {
        setModalnames(res.data.data);
      });
  };
  const getSelectedName = (e) => {
    navigate.push({
      pathname: "/search",
      query: {
        type: "bybrand",
        brand_id: selected_brand,
        model: `${e[0].ProductName.toLowerCase()}`,
        id: `${e[0].id}`,
        page: 1,
      },
    });
  };
  return (
    <Row className="mb-2" id="filter-card">
      {/* <Col lg="3">
                <Multiselect options={list1} customArrow={true} showArrow={true} className="mt-3" avoidHighlightFirstOption='true' displayValue="name" />
            </Col>
            <Col lg="3">
                <Multiselect options={list1} customArrow={true} showArrow={true} className="mt-3" avoidHighlightFirstOption='true' displayValue="name" />
            </Col> */}
      {/* <Row  className="d-flex justify-content-between bg-white mt-3">
      <Col lg='4'>
               <Button className="search-filter-btns my-2" size="lg">
            By Budget{" "}
          </Button>
  
   
          <Button className="search-filter-btns my-2" size="lg">
            By Brand{" "}
          </Button>
          </Col>
          <Col className="d-flex ">
        <Multiselect
              options={priceRange}
              customArrow={true}
              showArrow={true}
              className="mt-3"
              placeholder="Select Budget"
              singleSelect={true}
              avoidHighlightFirstOption="true"
              displayValue="pricerange"
              onSelect={getPriceRange}
            />
  
        <Multiselect
              options={bodyType}
              customArrow={true}
              showArrow={true}
              placeholder="Select Vehicle type"
              className="mt-3 ml-3"
              singleSelect={true}
              avoidHighlightFirstOption="true"
              displayValue="cartype"
              onSelect={getCartype}
            />
                </Col>
                <Col  className="d-flex justify-content-evenly">
               <Button className="search-filter-icon-btns my-2" size="lg">
            <BiListUl/>
          </Button>
  
   
          <Button className="search-filter-icon-btns my-2" size="lg">
          <BiGridSmall />
          </Button>
          </Col>
      </Row> */}
      <Row>
        <Col lg="6" className="d-flex by-brand-col">
          <ul
            className="nav d-flex align-items-center search-nav-item"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <Link
                className="nav-link tab_head active fw-bold"
                id="pills-home-tab"
                href=""
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                By Budget
              </Link>
            </li>
            <li className="nav-item" role="presentation">
              <Link
                className="nav-link tab_head fw-bold"
                id="pills-profile-tab"
                href=""
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                By Brand
              </Link>
            </li>
          </ul>

          <div className="tab-content  p-0" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <Row>
                <Col lg="6">
                  <Multiselect
                    options={priceRange}
                    customArrow={true}
                    showArrow={true}
                    className="mt-2"
                    placeholder="Select Budget"
                    singleSelect={true}
                    avoidHighlightFirstOption="true"
                    displayValue="pricerange"
                    onSelect={getPriceRange}
                  />
                </Col>
                <Col lg="6">
                  <Multiselect
                    options={bodyType}
                    customArrow={true}
                    showArrow={true}
                    placeholder="Select Vehicle type"
                    className="mt-2"
                    singleSelect={true}
                    avoidHighlightFirstOption="true"
                    displayValue="cartype"
                    onSelect={getCartype}
                  />
                </Col>
              </Row>
            </div>
            <div
              className="tab-pane p-0 fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="brand-tab-details">
                <div lg="6">
                  <Multiselect
                    options={brandnames}
                    customArrow={true}
                    showArrow={true}
                    placeholder="Select Brand"
                    className="mt-2"
                    singleSelect={true}
                    avoidHighlightFirstOption="true"
                    displayValue="BrandName"
                    onSelect={getSelectedBrand}
                  />
                </div>
                <div lg="6">
                  <Multiselect
                    options={modalnames}
                    customArrow={true}
                    showArrow={true}
                    placeholder="Select Model"
                    className="mt-2"
                    singleSelect={true}
                    avoidHighlightFirstOption="true"
                    displayValue="ProductName"
                    onSelect={getSelectedName}
                  />
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col
          lg="6"
          className=" d-flex align-items-center justify-content-end p-0"
        >
          <Multiselect
            options={brandnames}
            customArrow={true}
            showArrow={true}
            placeholder="Newest First"
            className="d-none"
            singleSelect={true}
            avoidHighlightFirstOption="true"
            displayValue="Newest First"
            onSelect={getSelectedBrand}
          />
          <Multiselect
            options={brandnames}
            customArrow={true}
            showArrow={true}
            placeholder="show items"
            className="d-none"
            singleSelect={true}
            avoidHighlightFirstOption="true"
            displayValue="show items"
            onSelect={getSelectedBrand}
          />
          <div className="d-flex">
            <Button
              className={
                !gridview
                  ? "search-filter-icon-btns my-2 grid-highlight"
                  : "search-filter-icon-btns my-2"
              }
              size="lg"
              onClick={changegridview}
            >
              <BiListUl />
            </Button>

            <Button
              className={
                gridview
                  ? "search-filter-icon-btns my-2 grid-highlight"
                  : "search-filter-icon-btns my-2"
              }
              size="lg"
              onClick={changeGrid}
            >
              <BiGridAlt />
            </Button>
          </div>
          {/* <ul className="nav d-flex align-items-center" id="pills-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <Link
            className="nav-link tab_head active fw-bold"
            id="pills-homea-tab"
            href=""
            data-bs-toggle="pill"
            data-bs-target="#pills-homea"
            role="tab"
            aria-controls="pills-homea"
            aria-selected="true"
          >
                        <BiListUl/>

          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link
            className="nav-link tab_head fw-bold"
            id="pills-profilea-tab"
            href=""
            data-bs-toggle="pill"
            data-bs-target="#pills-profilea"
            role="tab"
            aria-controls="pills-profilea"
            aria-selected="false"
          >
                      <BiGridSmall />

          </Link>
        </li>
      </ul>  */}
        </Col>
      </Row>

      {/* <div className="tab-content  p-0" id="pills-tabsContent">
        <div
          className="tab-pane fade show active"
          id="pills-homea"
          role="tabpanel"
          aria-labelledby="pills-homea-tab"
        >
            <Row>
          <Col lg="6">
<h1>List View</h1>
          </Col>
        
          </Row>
        </div>
        <div
          className="tab-pane p-0 fade"
          id="pills-profilea"
          role="tabpanel"
          aria-labelledby="pills-profilea-tab"
        >
       <h1>Grid View</h1>

        </div>
      </div> */}
    </Row>
  );
}

export default SearchDropdownDiv;
