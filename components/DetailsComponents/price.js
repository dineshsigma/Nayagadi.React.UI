import { useState,useEffect} from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { numInLakh, priceFormat } from '../../priceformat'
import Multiselect from "multiselect-react-dropdown";
import { useRouter } from 'next/router'
import { FaMapMarkerAlt, FaHome, FaCalculator, FaFileInvoiceDollar } from "react-icons/fa";
import { BiCalculator, BiShieldQuarter, BiGitCompare } from "react-icons/bi";
import Location from "../locations/Location";
import {useSelector  } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import EmiModal from "../popupModal";
import Link from "next/link";
import axios from "axios";
import { baseUrl } from "../../env";

function Price({ product, EMIAmount, variantsData }) {
    const navigate = useRouter();
    const city = useSelector((state) => state.homepage.locations);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [emiModalPop, setEmimodelPop] = useState(false);
    const [location,setLocation] =useState();
    const [selectOptions, setSelectOptions] = useState([]);
    const [variantsList, setVariants] = useState();
    // let selectOptions = [{ 'name': 'All' }, { 'name': 'i10' }, { 'name': 'Ritz' }, { 'name': 'Maruthi' }]
    // const toggle = () => setDropdownOpen((prevState) => !prevState);
    const gotoVarients = (brand, modal, id) => {
        brand = brand.includes(' ') ? brand.replaceAll(' ', '-') : brand
        modal = modal.includes(' ') ? modal.replaceAll(' ', '-') : modal
        navigate.push(`${brand}/${brand}/${modal}/${id}`)
    }
    
    const toggle = () => {
        setModal(!modal)
      }
    const toggleEmi = () => {
        setEmimodelPop(!emiModalPop)
    }

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
    
    //   useEffect(() => {
    //     const items = JSON.parse(localStorage.getItem('location'));
    //      setLocation(items)
    //   },[modal
    // ])
    return (
        <>
            <Row className="bg-white mx-0 p-3 price_page">
                <h5>{product?.[0]?.productBrands?.[0]?.BrandName}-{product?.[0]?.ProductName} on Road Price in <span className="city_name">{city?.label}</span>
                    <button className="icon-btn">
                        <span className="text-decoration-underline change_city mx-2 small ash" onClick={() => setModal(true)}>change city
                            <FaMapMarkerAlt className="location-icon" />
                        </span>
                    </button>
                    {/* <img src="./location_icon.svg" height={20} /> */}
                </h5>
                <p className="price-description mt-2 " >
                    {product?.[0]?.productBrands?.[0]?.BrandName}-{product?.[0]?.ProductName}
                    It is powered by a 0.8-litre petrol engine (making 48PS and 69Nm) paired with a five-speed manual. The motor’s output drops to 41PS and 60Nm when fed with CNG. Its claimed mileage figures are 22.05kmpl for petrol and 31.59km/kg for CNG.
                </p>

                <Col lg={12} className="p-0">
                    <Card className="rounded-0 mt-2">
                        <CardHeader className="info-card-header d-flex justify-content-between">
                            <h5 className="d-flex align-items-center">Info</h5>
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
                            {/* <h5>Info</h5>
                        <span className="float-end">
                            <Multiselect className="w-50 float-end" options={selectOptions} singleSelect={true} showArrow={true} customArrow={true} placeholder="All" avoidHighlightFirstOption='true' displayValue="name" />
                        </span> */}

                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th>Variants</th>
                                        <th>Ex-Showroom Price</th>
                                        <th>On-Road Price</th>
                                        <th>Specification</th>
                                    </tr>
                                </thead>
                                <tbody className="ash">
                                    { variantsList?.length ? variantsList?.map((item, id) => {
                                        return (
                                            <tr key={id}>
                                                <td className="variant-table-td"><Link href={{pathname: '/[brand]/[slug]/[id]/[location]/variant',
                                                        query: {brand: product?.[0]?.productBrands?.[0]?.BrandName.toLowerCase(),
                                                                slug: item.slug,
                                                                id: item?.id,
                                                                location: city?.label},
                                                        }}>{item?.ModelVariantName}
                                                </Link></td>
                                                <td>₹ {numInLakh(item?.Price)}</td>
                                                <td>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="tooltip-disabled">
                                                     TCS - ₹{item?.tcs} <br/>
                                                     Tax - ₹{item?.tax}   <br/>
                                                     Insurance - ₹{item.insurance}  <br/>
                                                     Fastag -₹{item.fasttag}
                                                    </Tooltip>
                                                }
                                            ><span>₹ {numInLakh(item?.onRoadPrice)}</span></OverlayTrigger>
                                        </td>
                                                <td>{item?.Fuel}</td>
                                            </tr>
                                        )
                                    }) : <tr className="align-middle"> 
                                    <td colSpan={3} className="text-center"><p>No data found</p></td>
                                    </tr>}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </Col>

                <Col lg={12} className="mt-3 p-0">
                    <Card className="rounded-0">
                        <CardBody>
                            <Row className="">
                                <Col lg={4}>
                                    <img src="/allLogos.png" />
                                </Col>
                                <Col lg={8} className='col-12'>
                                    <table className="table table-responsive table-borderless">
                                        <tbody>
                                            <tr>
                                                <td>Interest Rate</td>
                                                <td><b>9.8%</b></td>
                                            </tr>
                                            <tr>
                                                <td>EMI Starting From</td>
                                                <td><b>{priceFormat(EMIAmount)?.split(".")[0]}</b></td>
                                            </tr>
                                            <tr>
                                                <td>Tenure</td>
                                                <td><b>60 months</b></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="d-flex gap-2 justify-content-evenly price-btns">
                                        <Button className="btn-black">
                                            <FaHome className="mb-1 btn-icons" /> <span>Apply Loan</span>
                                        </Button>
                                        <Button className="btn-red" onClick={() => setEmimodelPop(true)}>
                                            <BiCalculator className="mb-1 btn-icons" /><span> EMI Calculator</span>
                                        </Button>
                                        <Button className="btn-black">
                                            <BiShieldQuarter className="mb-1 btn-icons" /> <span>Get Insurance</span>
                                        </Button>
                                    </div>

                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Location modal ={modal} toggle ={toggle}/>
            <EmiModal
                product={product}
                open={emiModalPop}
                toggle={toggleEmi}
                backdrop={true}
            />
        </>

    )
}

export default Price;