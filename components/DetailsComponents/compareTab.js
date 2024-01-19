import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from "reactstrap";
import Multiselect from "multiselect-react-dropdown";
import { FaMapMarkerAlt,FaGasPump,FaTachometerAlt, FaRegCalendarAlt, FaHome ,FaCalculator, FaFileInvoiceDollar } from "react-icons/fa";
import { useRouter } from 'next/router';
import Carousel from "react-multi-carousel";
import { responsive } from "../../env";
import SliderCarousal from '/components/sliderCarousal';
import { numInLakh } from '../../priceformat.js';
import Comparemodal from "../compareTable/Comparemodal";
import Link from "next/link";
import { baseUrl } from "../../env";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


//compare tab in product details page
function CompareTab({ product, variantsData }) {
    const navigate = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectOptions, setSelectOptions] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [variantsList, setVariants] = useState();
    const [similarPriceProducts, setsimilarPriceProducts] = useState([]);
    const [selectvarients,setSelectvarients] = useState([]);
    const [varids, setVarids] = useState([]);
    const [location,setLocation] = useState();
    // setSelectOptions ( [{ 'name': 'Maruti' }, { 'name': 'i10' }, { 'name': 'Ritz' }])

    const toggle = () => setDropdownOpen((prevState) => !prevState);
    useEffect(() => {
        axios.get(`${baseUrl}/api/homepage/listofFuelTypes`).then((res) => {
            let newState = res.data.data.map((item) => item);
            newState.unshift({"fuelType": "All"})
            setSelectOptions(newState)
        })
    }, [])
    useEffect(() => {
        let reqVarients = [];
        variantsData?.forEach((item) => {
            reqVarients.push(item)
        })
        setVariants(reqVarients);
    },[variantsData])

    //Function to get similar price range products
    useEffect(() => {
        axios
        .get(
            // `${baseUrl}/api/products/getProductsWithSimilarPrice?initialPrice=?initialPrice=${product?.[0]?.initialPrice}&finalPrice=${product?.[0]?.finalPrice}`
            `${baseUrl}/api/products/getProductsWithSimilarPrice?initialPrice=2000000&finalPrice=135000000`
        )
        .then((response) => {
            setsimilarPriceProducts(response.data.data);
        });
    }, []);

    const selectedFuelType = (e) => {
        if(e[0]?.fuelType !== 'All'){
            const filtered = product?.[0]?.ModelVariantNameList.filter(item => {
                return item?.Fuel === e[0]?.fuelType;
            })
            setVariants(filtered)
        } else {
            const filtered = product?.[0]?.ModelVariantNameList.filter(item => {
                return item;
            })
            setVariants(filtered)
        }
    }

    // useMemo (() => {
    //     console.log(333333333)
    //     if(selectedValues[0]?.fuelType !== 'All'){
    //         const filtered = product?.[0]?.ModelVariantNameList.filter(item => {
    //             return item?.Fuel === selectedValues[0]?.fuelType;
    //         })
    //         setVariants(filtered)
    //     } else {
    //         const filtered = product?.[0]?.ModelVariantNameList.filter(item => {
    //             return item;
    //         })
    //         setVariants(filtered)
    //     }
    // }, [selectedValues])

    // Function for navigation to product variant details page with slug & seo 
    function NavigateVariantPage(item){ 
        // navigate.push(`/${product?.[0]?.productBrands?.[0]?.BrandName}-${item?.ModelVariantName}/${item.id}`);
        // navigate.push(`/variant/${item?.ModelVariantName}/${item.id}`);
        navigate.push(`/nayagadi/${product?.[0]?.productBrands?.[0]?.BrandName.toLowerCase()}/${item.slug}/${item.id}`);
    }
    // console.log(similarPriceProducts, 'similarPriceProductssimilarPriceProductssimilarPriceProductssimilarPriceProducts')
    // console.log(variantsList, 'DDDDDDDDDDDDDD', variantsData)

    const getVarient = (e, item) => {
        const str = localStorage.getItem('array');
        let newArray = [];

        function getUniqueListBy(arr, key) {
            return [...new Map(arr?.map(item => [item[key], item])).values()]
        }

        const arr1 = getUniqueListBy(JSON.parse(str), 'id')

        if (arr1 == null) {
            newArray = [...selectvarients];
        } else {
            newArray = [...selectvarients, ...arr1];
        }
        if (e?.target?.checked) {
            newArray.push(item);
        } else {
            newArray = newArray.filter((varient) => {
                return varient.id !== item.id;
            });
        }
        localStorage.setItem('array', JSON.stringify(newArray));
        setSelectvarients(newArray)
    }
    let filarray = [];
    const removeProduct = (item, index) => {

        selectvarients.forEach((data, id) => {
            if (id == index) {
                return
            }
            else {
                filarray.push(data)
            }
        })
        setSelectvarients(filarray)
    }
    useEffect(() => {
        let varientids = []
        selectvarients && selectvarients.forEach((item, id) => {
            varientids.push(item.id)
        })
        setVarids(varientids)
    }, [selectvarients])

    useEffect(() => {
        setLocation(JSON.parse(localStorage.getItem('location')))
    },[])
    return (
            <Row className="bg-white m-0 p-3 compair_page">
                <h5>{product?.[0]?.productBrands?.[0]?.BrandName}-{product?.[0]?.ProductName} Popular Comparisons In Hyderabad</h5>
                <Col lg={12} className="mt-3 p-0">
                    <Card className="rounded-0">
                    <CardHeader className="compair-card-header d-flex justify-content-between">
                        <h5 className="d-flex align-items-center">Compare {product?.[0]?.productBrands?.[0]?.BrandName}-{product?.[0]?.ProductName} Variants
                                </h5>
                                <span className="float-end">
                                    <Multiselect 
                                    options={selectOptions} 
                                    singleSelect={true} 
                                    showArrow={true} 
                                    customArrow={true}
                                    placeholder="Select Variant"
                                    onSelect={selectedFuelType}
                                    avoidHighlightFirstOption='true' 
                                    displayValue="fuelType" />
                                </span>

                        </CardHeader>
                        <CardBody>

                            <table className="table table-responsive ash p-0">
                                <thead>
                                    <tr>
                                        <th>Variants</th>
                                        <th>Ex-Showroom Price</th>
                                        <th>On-Road Price</th>
                                        <th className="text-center">Compare</th>
                                    </tr>
                                </thead>
                                <tbody>
                              {variantsList?.length ?  variantsList?.map((item, id) => {
                                        return (
                                            <tr className="align-middle" key={item?.id}>
                                                <td>
                                                    <Link href={{pathname: '/[brand]/[slug]/[id]/[location]/variant',
                                                        query: {brand: product?.[0]?.productBrands?.[0]?.BrandName.toLowerCase(),
                                                                slug: item.slug,
                                                                id: item?.id,
                                                                location: location?.label},
                                                        }}>
                                                    <h6 className="m-0 text-decoration-underline">{item?.ModelVariantName}</h6>
                                                    </Link>
                                                    <small>{item?.Engine} cc . {item?.Fuel} </small>
                                                </td>
                                                <td>₹ {numInLakh(item?.Price)}</td>
                                                <td>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="tooltip-disabled">
                                                     TCS - ₹{item?.tcs} <br/>
                                                     Tax - ₹{item?.tax}   <br/>
                                                     Insurence - ₹{item.insurance}  <br/>
                                                     fastag -₹{item.fasttag}
                                                    </Tooltip>
                                                }
                                            ><span>₹ {numInLakh(item?.onRoadPrice)}</span></OverlayTrigger>
                                        </td>
                                                <td className="text-center compair-check"><input type="checkbox" checked={varids.includes(
                                                    item.id
                                                )}
                                                onClick={(e) => getVarient(e, item)}/></td>
                                            </tr>
                                        )
                                }):<tr className="align-middle"> 
                                    <td colSpan={3} className="text-center"><p>No data found</p></td>
                                    </tr>
                                    }
                                </tbody> 
                                {/* {variantsList?.length === 0 && <p>No Variants Found</p>} */}
                            </table>
                        </CardBody>
                    </Card>
                </Col>

                <Col lg={12} className="mt-3 p-0">
                    <div className="rounded-0">
                            <Row className="row-cols-lg-12 mt-3">
                            {similarPriceProducts ?  <SliderCarousal headtext="Cars with Similar Price" data = {similarPriceProducts}/> :""}  

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
                                className="p-4 vehicles_icons"
                                customTransition="transform 300ms ease-in-out"
                                >
                                {similarPriceProducts &&
                                    similarPriceProducts?.map((data, index) => {
                                    return (
                                        <Col className="m-2">
                                        <Card className="border-0 box-shadow-0 vi-box">
                                            <img
                                            alt=""
                                            src={data.Images?.images?.[0]}
                                            onClick={() => selectedBrand(data)}
                                            />
                                        </Card>
                                        </Col>
                                    );
                                    })}
                                </Carousel> */}
                                {/* <Col>
                                    <Card className="rounded-0">
                                        <img
                                            alt="Sample"
                                            src="../car1.png"
                                        />
                                        <CardHeader className="px-2 similarprice_card-header">
                                            <h5 className="m-0">Lamborghini </h5>
                                        </CardHeader>
                                        <CardFooter className="similarprice_card-footer">
                                            <Row >
                                                <Col className=" text-center border-end border-3">
                                                   
                                                <FaRegCalendarAlt className="similar-card-icons"/>
                                                    <span className="text">2022</span>
                                                </Col>
                                                <Col className="text-center border-end border-3">
                                                   <FaTachometerAlt className="similar-card-icons"/>
                                                        <span className="fs-13">320</span>
                                                </Col>
                                                <Col className="text-center">
                                                    <FaGasPump className="similar-card-icons"/>
                                                    <span className="fs-13">Petrol</span>
                                                </Col>
                                            </Row>
                                        </CardFooter>
                                    </Card>
                                </Col> */}

                                {/* <Col className="mb-3">
                                    <Card className="rounded-0">
                                        <img
                                            alt="Sample"
                                            src="../car1.png"
                                        />
                                     <CardHeader className="px-2 similarprice_card-header">
                                            <h5 className="m-0">Lamborghini </h5>
                                        </CardHeader>
                                        <CardFooter className="">
                                            <Row>
                                                <Col className="text-center  border-end border-3">
                                                  
                                                <FaRegCalendarAlt className="similar-card-icons"/>
                                                    <span className="fs-13">2022</span>
                                                </Col>
                                                <Col className="text-center border-end border-3">
                                                <FaTachometerAlt className="similar-card-icons"/>
                                                    <span className="fs-13">320</span>
                                                </Col>
                                                <Col className="text-center">
                                                <FaGasPump className="similar-card-icons"/>
                                                    <span className="fs-13">Petrol</span>
                                                </Col>
                                            </Row>
                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card className="rounded-0">
                                        <img
                                            alt="Sample"
                                            src="../car1.png"
                                        />
                                     <CardHeader className="px-2 similarprice_card-header">
                                            <h5 className="m-0">Lamborghini </h5>
                                        </CardHeader>
                                        <CardFooter className="">
                                            <Row>
                                                <Col className="text-center  border-end border-3">
                                                  
                                                <FaRegCalendarAlt className="similar-card-icons"/>
                                                    <span className="fs-13">2022</span>
                                                </Col>
                                                <Col className="text-center border-end border-3">
                                                <FaTachometerAlt className="similar-card-icons"/>
                                                    <span className="fs-13">320</span>
                                                </Col>
                                                <Col className="text-center">
                                                <FaGasPump className="similar-card-icons"/>
                                                    <span className="fs-13">Petrol</span>
                                                </Col>
                                            </Row>
                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card className="rounded-0">
                                        <img
                                            alt="Sample"
                                            src="../car1.png"
                                        />
                                     <CardHeader className="px-2 similarprice_card-header">
                                            <h5 className="m-0">Lamborghini </h5>
                                        </CardHeader>
                                        <CardFooter className="">
                                            <Row>
                                                <Col className="text-center  border-end border-3">
                                                  
                                                <FaRegCalendarAlt className="similar-card-icons"/>
                                                    <span className="fs-13">2022</span>
                                                </Col>
                                                <Col className="text-center border-end border-3">
                                                <FaTachometerAlt className="similar-card-icons"/>
                                                    <span className="fs-13">320</span>
                                                </Col>
                                                <Col className="text-center">
                                                <FaGasPump className="similar-card-icons"/>
                                                    <span className="fs-13">Petrol</span>
                                                </Col>
                                            </Row>
                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card className="rounded-0">
                                        <img
                                            alt="Sample"
                                            src="../car1.png"
                                        />
                                     <CardHeader className="px-2 similarprice_card-header">
                                            <h5 className="m-0">Lamborghini </h5>
                                        </CardHeader>
                                        <CardFooter className="">
                                            <Row>
                                                <Col className="text-center  border-end border-3">
                                                  
                                                <FaRegCalendarAlt className="similar-card-icons"/>
                                                    <span className="fs-13">2022</span>
                                                </Col>
                                                <Col className="text-center border-end border-3">
                                                <FaTachometerAlt className="similar-card-icons"/>
                                                    <span className="fs-13">320</span>
                                                </Col>
                                                <Col className="text-center">
                                                <FaGasPump className="similar-card-icons"/>
                                                    <span className="fs-13">Petrol</span>
                                                </Col>
                                            </Row>
                                        </CardFooter>
                                    </Card>
                                </Col> */}
                            </Row>
                    </div>
                </Col>
                {selectvarients.length > 0 && <Comparemodal selectvarients={selectvarients} onChildClick={removeProduct} />}
            </Row>
    )
}

export default CompareTab;