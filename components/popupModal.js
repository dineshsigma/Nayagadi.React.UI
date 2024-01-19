import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { selectedBrandName, selectedProductName, getPriceEMi } from '../store/searchslice'
import { gql, useQuery } from "@apollo/client";
import { numInLakh, priceFormat } from '../priceformat.js';
import React, { useState, useEffect } from 'react';
import { FaPlayCircle, BsFillEyeFill } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import InputRange from 'react-input-range';
import 'react-circular-progressbar/dist/styles.css';
import axios from "axios";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { baseUrl } from '../env';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  Row,
  Col,
  Select
} from 'reactstrap';
import PropTypes from 'prop-types';


let brandData = gql`query{
productsBrands{
data{
  id
attributes{
BrandName
}
}
}
}`

let productList = gql`query{
  productDetails{
    data{
      id
      attributes{
        ProductName
      }
    }
  }
}`

let carvarientslist = gql`query{
  carVariants{
   data{
     id
     attributes
     {
       ModelName
       Mileage
       Price
       Type
     }
   }
 }
   
 }`


let selectedlist = gql`query products($ModelName:String!,$BrandName:String!,$ProductName:String!,$id:ID){
  productDetails(filters:
  {AllCarVarients:{ModelName:{eq:$ModelName}},
  products_brand:{BrandName:{eq:$BrandName}},
  ProductName:{eq:$ProductName},id:{eq:$id}}){
   data{
     id
     attributes{
       Price
       ProductName
       MaxPower
       Engine
       ExShowroomPrice
       TopSpeed
       Price
        products_brand {
           data {
             id
             attributes {
               BrandName
             }
           }
         }
         model_variants {
          data {
            id
            attributes {
              ModelName
              Mileage
              Type
              Price
            }
          }
        }
     }
   }
 }
 }
 `

let emihomepage = gql`query products($ModelName:String!,$BrandName:String!,$ProductName:String!){
  productDetails(filters:
  {AllCarVarients:{ModelName:{eq:$ModelName}},
  products_brand:{BrandName:{eq:$BrandName}},
  ProductName:{eq:$ProductName}}){
   data{
     id
     attributes{
       Price
       ProductName
       MaxPower
       Engine
       ExShowroomPrice
       TopSpeed
       Price
        products_brand {
           data {
             id
             attributes {
               BrandName
             }
           }
         }
          AllCarVarients {
           data {
             id
             attributes {
               ModelName
             }
           }
         }
     }
   }
 }
 }
 `

function EmiModal({ product, open, toggle, backdrop }) {
  let dispatch = useDispatch()
  const selectedcarVarientdetails = useSelector((state) => state.searchproducts.selectedcarvarientname);
  const selectedbrandname = useSelector((state) => state.searchproducts.brandname);
  const selectedproductname = useSelector((state) => state.searchproducts.productname);
  const pricevalue = useSelector((state) => state.searchproducts.price);

  const [downpayment, setDownpayment] = useState(0)
  const [bankinterest, setBankInterest] = useState(9.8)
  const [loanperiod, setLoanPeriod] = useState(24)

  let [price, setPrice] = useState(product?.[0]?.initialPrice || product?.[0]?.Price)

  const [emicalculation, setEmicalculation] = useState()
  const [listOfBrandNames, setListOfBrandNames] = useState()
  const [listOfProductNames, setListOfProductNames] = useState()
  const [listOfVarientNames, setListOfVarientNames] = useState()
  const [displayVariant, setDisplayVariant] = useState(product?.[0]?.ModelVariantName || '')

  // let listOfBrandNames = useQuery(brandData);
  // let listOfProductNames = useQuery(productList);
  // let listOfCarVarients = useQuery(carvarientslist);

  let response;
  // if (product) {
  //   response = useQuery(selectedlist, {
  //     variables: {
  //       "BrandName": product?.[0]?.attributes?.products_brand?.data.attributes?.BrandName,
  //       "ProductName": product?.[0]?.attributes?.ProductName,
  //       "ModelName": selectedcarVarientdetails,
  //       "id": product?.[0]?.id
  //     }
  //   })
  // }
  // else {
  //   response = useQuery(emihomepage, {
  //     variables: {
  //       "BrandName": selectedbrandname,
  //       "ProductName": selectedproductname,
  //       "ModelName": selectedcarVarientdetails

  //     }
  //   })
  // }

  let ProductPrice = parseInt(response?.data?.productDetails?.data[0]?.attributes.Price);
  //useEffect
  //   price=price.toLocaleString("en-IN", {
  //     style: "currency",
  //     currency: "INR",
  // })
  //API to get brands
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/api/homepage/getbrandLogosBasedOnCategory?category=Cars`
      )
      .then((response) => {
        setListOfBrandNames(response.data.data);
      });
  }, [product]);

  useEffect(() => {
    setPrice(product?.[0]?.initialPrice || product?.[0]?.Price)
  }, [product])

  useEffect(() => {
    let latestPrice = price - downpayment;
    let InterestValue = (latestPrice * bankinterest * loanperiod / 1200)
    InterestValue.toFixed(2)
    let TotalAmount = InterestValue + latestPrice
    TotalAmount.toFixed(2)
    let EMIAmount = TotalAmount / (loanperiod);
    EMIAmount.toFixed(2)
    setEmicalculation(
      { latestPrice: latestPrice, InterestValue: InterestValue, TotalAmount: TotalAmount, EMIAmount: EMIAmount })
  }, [downpayment, bankinterest, loanperiod, price])

//Function to get variants list in EMI modal popup
  useEffect(() => {
    if(product){
      let reqId;
      if(product?.[0]?.productId){
        reqId = product?.[0]?.productId;
        setDisplayVariant(product?.[0]?.ModelVariantName);
      } else{
        reqId = product?.[0]?.id;
      }
      axios.get(
        `${baseUrl}/api/modelvarient/getRelatedVarients?productId=${reqId}`
      )
      .then((res) => {
        setListOfVarientNames(res.data.data);
      });
    } else {
      return 
    }
  }, [product])

  const getPrice = (e) => {
    e.preventDefault();
    dispatch(getPriceEMi(e.target.value));
    const priceReq = listOfVarientNames[e.target.selectedIndex - 1]?.Price;
    setPrice(priceReq);
    setDisplayVariant(e.target.value);
  }

  const getBrand = (e) => {
    e.preventDefault();
    setListOfProductNames();
    setListOfVarientNames();
    setPrice();
    // dispatch(selectedBrandName(e.target.value));
    const brandId = listOfBrandNames[e.target.selectedIndex - 1].id;
    axios
      .get(
        `${baseUrl}/api/products/getProductBasedOnbrand?products_brand=${brandId}`
      )
      .then((res) => {
        setListOfProductNames(res.data.data);
      });
  }

  const getProduct = (e) => {
    e.preventDefault();
    setListOfVarientNames();
    setPrice();
    dispatch(selectedProductName(e.target.value));
    const prodId = listOfProductNames[e.target.selectedIndex - 1].id;
    axios
      .get(
        `${baseUrl}/api/modelvarient/getRelatedVarients?productId=${prodId}`
      )
      .then((res) => {
        setListOfVarientNames(res.data.data);
      });

  }
  return (
    <div>
      <Modal
        contentClassName='bg-greys border-0 rounded-0'
        isOpen={open}
        toggle={toggle}
        backdrop={backdrop}
        centered={true}
        modalClassName="border-0 emiModal"
        unmountOnClose={true}
        className='emi-modal'
      >
        {product ?
          <ModalHeader className='border-0 pb-0 white mt-2 ml-2' toggle={toggle}>Calculate your Loan EMI for {product?.[0]?.productBrands?.[0]?.BrandName} {product?.[0]?.ProductName} {displayVariant.split('*')}</ModalHeader> :
          <ModalHeader className='border-0 pb-0 white ml-2 mt-2' toggle={toggle}>Calculate your Loan EMI</ModalHeader>}
        <ModalBody className='py-0 emi-modal-body ml-2'>
          <Card className='rounded-0 pt-2 w-70 emi-popuo-body fs-13'>
            <Row className='m-0 py-3 emi-popup-div'>
              <Col lg={8}>
                <Row className='gap-1'>
                  <Col sm={12}>
                    {/* {product ? <Form.Select aria-label="Default select example" value={product?.[0]?.attributes?.products_brand.data.id}>
                      {listOfBrandNames?.data?.productsBrands?.data.map(brandname => {
                        return (
                          <option value={brandname.id}>{brandname.attributes.BrandName}</option>
                        )
                      })}
                    </Form.Select> : <Form.Select aria-label="Default select example" value={productstate} onChange={(e) => { getBrand(e) }}>
                      {listOfBrandNames?.data?.productsBrands?.data.map(brandname => {
                        return (
                          <option >{brandname.attributes.BrandName}</option>
                        )
                      })}
                    </Form.Select>} */}

                    {/* {product ? <Form.Select aria-label="Default select example" value={product?.[0]?.id} >
                      {listOfProductNames?.data?.productDetails?.data.map(productname => {
                        return (
                          <option value={productname.id}>{productname.attributes.ProductName}</option>
                        )
                      })}
                    </Form.Select> : <Form.Select aria-label="Default select example" value={brandstate} onChange={(e) => { getProduct(e) }}>
                      {listOfProductNames?.data?.productDetails?.data.map(productname => {
                        return (
                          <option >{productname.attributes.ProductName}</option>
                        )
                      })}
                    </Form.Select>} */}
                    {/*Conditionally showing dropdowns based on homepage click and detail Page */}

                    {/* ---- PRODUCT PRICE DROP DOWN */}
                      {product ? 
                      <Form aria-label="Default select example" >
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                      </Form>
                      :
                      <></>}

                        {/* ---- BRAND DROP DOWN */}
                      <Form className='emi-pop-form d-flex gap-2 mt-2'>
                      <div className='selcted-brands d-flex'> 
                        {product ?
                        
                        <Form.Select aria-label="Default select example" disabled>
                          <option value={product?.[0]?.productBrands?.[0]?.BrandName} disabled selected hidden>{product?.[0]?.productBrands?.[0]?.BrandName || product?.[0]?.productList?.[0].BrandName}</option>
                        </Form.Select> : 
                        <Form.Select className='emi-popup-brand' aria-label="Default select example" onChange={(e) => { getBrand(e) }}>
                          <option value="" disabled selected hidden>Select Brand</option>
                          {listOfBrandNames?.map((item, index) => {
                            return (
                              <option value={item} key={index}>{item.BrandName}</option>
                            )
                          })}
                        </Form.Select>}

                        {/* ---- MODEL DROP DOWN */}
                        {product ? <Form.Select aria-label="Default select example" disabled>
                          <option value= {product?.[0]?.ProductName} disabled selected hidden>{product?.[0]?.ProductName}</option>
                        </Form.Select> : 
                        <Form.Select className='emi-popup-brand' aria-label="Default select example" onChange={(e) => { getProduct(e) }}>
                          <option value="" disabled selected hidden>Select Model</option>
                          {listOfProductNames?.map((item, index) => {
                            return (
                              <option key={index}>{item.ProductName}</option>
                            )
                          })}
                        </Form.Select>}
                        </div>
                        {/* ---- VARIANT DROP DOWN */}
                        <Form.Select aria-label="Default select example" onChange={(e) => { getPrice(e) }}>
                          <option value='' disabled selected hidden>{product?.[0]?.ModelVariantName ? product?.[0]?.ModelVariantName : 'Select Variant'}</option>
                          {listOfVarientNames?.map((item, index) => {
                            return (
                              <option key={index}>{item.ModelVariantName}{' - '}{numInLakh(item.Price)}{'*'}</option>
                            )
                          })}
                        </Form.Select>
                      </Form>
                    {/* <Select options={carTypes} singleSelect={true} showArrow={true} customArrow={true} placeholder="Select" avoidHighlightFirstOption='true' displayValue="name" /> */}
                  </Col>
                  <Col sm={4}>
                    {/* <Multiselect options={carTypes} singleSelect={true} showArrow={true} customArrow={true} placeholder="Select" avoidHighlightFirstOption='true' displayValue="name" /> */}
                  </Col>
                  <Col sm={4}>
                    {/* <Multiselect options={carTypes} singleSelect={true} showArrow={true} customArrow={true} placeholder="Select" avoidHighlightFirstOption='true' displayValue="name" /> */}
                  </Col>
                </Row>

                <Row className='mt-3 m-0'>
                  <p className='m-0 p-0 mb-1 emi-drag-header'>Down Payment <span className='float-end'>{priceFormat(downpayment)}</span></p>
                  <InputRange className="mt-1" maxValue={price} minValue={0} onChange={value => setDownpayment(value)} value={downpayment} step={1000}/>
                </Row>

                <Row className='mt-4 m-0'>
                  <p className='m-0 p-0 mb-1 emi-drag-header'>Bank Interest Rate <span className='float-end'>{bankinterest} %</span></p>
                  <InputRange className="mt-3" maxValue={20} minValue={6} onChange={value => setBankInterest(value.toFixed(1))} value={bankinterest} step={0.1} />
                </Row>

                <Row className='mt-4 m-0'>
                  <p className='m-0 p-0 mb-1 emi-drag-header'>Loan Period ( Months ) <span className='float-end'>{loanperiod} Months</span></p>
                  <InputRange maxValue={60} minValue={6} onChange={value => setLoanPeriod(value)} value={loanperiod} step={6}/>
                </Row>
              </Col>
              <Col lg={4} className="m-auto">
                <div className='pie-chart-div'>
                <div className="mx-auto pie-chart">
                  <CircularProgressbarWithChildren value={downpayment} minValue={0} maxValue={price}
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0.25,
                      pathTransitionDuration: 1,
                      pathTransition: 'stroke-dashoffset 0.5s ease 0s',
                      transform: 'rotate(0.25turn)',
                      // Text size
                      textSize: '12px',
                      // Colors
                      pathColor: `#ED2169`,
                      textColor: '#ED2169',
                      trailColor: '#d6d6d6',
                    })}>
                    <span className='ash'>Total Amount</span>
                    {/* <span>{isNaN(emicalculation?.TotalAmount) ? "TRUE" : "FALSE"}</span> */}
                    <OverlayTrigger 
                    placement="bottom"
                    overlay={emicalculation?.TotalAmount ? <Tooltip id="tooltip-disabled">{priceFormat(emicalculation?.TotalAmount)}</Tooltip> : <></>}>
                      <span className="d-inline-block">
                      <span className='fw-500'><span className='rupee-icon'>₹</span> {isNaN(emicalculation?.TotalAmount) ? "0.00" :  numInLakh(emicalculation?.TotalAmount?.toFixed(2))}</span>
                      </span>
                    </OverlayTrigger>
                  </CircularProgressbarWithChildren>
                  {/* <div className='mt-2 mb-0 d-flex justify-content-between'>
                    <div>
                  <span className='circle'></span><span className='emi-side-heads'>&nbsp;Principal Amount</span>
                  </div>
                    <span className='float-end amt-number '> 
                     <span className='rupee-icon'>₹</span> 
                     10,50,000
                     {numInLakh(emicalculation?.latestPrice?.toFixed(2))} 
                     </span>
                </div> */}
                  {/* <div className='mt-2 mb-0 d-flex justify-content-between'>
                    <div>
                  <span className='circle-primary'></span><span className='emi-side-heads'> Total Interest</span>
                  </div>  
                    <span className='float-end amt-number '> 
                     <span className='rupee-icon'>₹</span> 
                     {numInLakh(emicalculation?.InterestValue?.toFixed(2))}
                     </span>
                </div> */}
                </div>
                <div className='amt-details'>
                <p className='mt-2 mb-0'>
                  <span className='circle'></span><span className='emi-side-heads'> Principal Amount</span>
                    <span className='float-end amt-number '> 
                     <span className='rupee-icon'></span> 
                     {/* 1,10,50,000 */}
                     {isNaN(emicalculation?.latestPrice) ? "0.00" : priceFormat(emicalculation?.latestPrice)}
                     </span>
                </p>
                <p className='mb-0'>
                  <span className='circle-primary'></span>
                  <span className='emi-side-heads'> Total Interest</span>
                  <span className='float-end amt-number '>
                     <span className='rupee-icon'></span>
                     {/* 8,500 */}
                     {isNaN(emicalculation?.InterestValue) ? "0.00" : priceFormat(emicalculation?.InterestValue)}
                     </span></p>
                     </div>
                </div>
              </Col>
            </Row>

            <Row className='mt-3 m-0 emi-botm-row'>
              <Col lg={8} className="bg-ash py-3 col-12 col-sm-7">
                <div className='bottom-emi-buttons'>
                <Button size="md" className='bg-red fs-12 border-0 rounded-0 me-2'>
                  Get A Quote <FaPlayCircle className='fs-24'/>
                </Button>{' '}
                <Button size="md" className='border-0 rounded-0 fs-12' color="secondary">
                  Check Out Insurance <FaPlayCircle className='fs-24'/>
                </Button>
                </div>
              </Col>
              <Col lg={4} className="col-4 emi-bottom d-flex align-items-center justify-content-arround m-0 ">
                  <div lg={5} className="col-5"><h4 className='mb-0 fs-16 fw-700'>EMI</h4> <small className='fs-8'>per month</small></div>
                  <div><h4 className='mb-0 fs-16 fw-700'><span></span> {isNaN(emicalculation?.EMIAmount) ? "0.00" : priceFormat(emicalculation?.EMIAmount)}</h4><small className='fs-8'>Calculated on Road Price</small></div>
              </Col>
            </Row>
          </Card>

          <div className="emi-car-img" >
            <img src="/car_emi.png" />
          </div>
          <h1 className='car-name-cross'>{product?.[0]?.productBrands?.[0]?.BrandName ? product?.[0]?.productBrands?.[0]?.BrandName : 'NayaGadi'}</h1>
        </ModalBody>
      </Modal>
    </div>
  );
}

EmiModal.propTypes = {
  className: PropTypes.string,
};

export default EmiModal;