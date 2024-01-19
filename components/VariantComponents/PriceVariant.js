import { useState } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { numInLakh, priceFormat } from '../../priceformat'
import Multiselect from "multiselect-react-dropdown";
import { useRouter } from 'next/router';
import { FaMapMarkerAlt, FaHome, FaCalculator, FaFileInvoiceDollar } from "react-icons/fa";
import { BiCalculator, BiShieldQuarter, BiGitCompare } from "react-icons/bi";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useSelector } from "react-redux";
import Location from "../locations/Location";
import Link from "next/link";
import EmiModal from "../popupModal";

function PriceVariant({ product, EMIAmount }) {
    const city = useSelector((state) => state.homepage.locations);
    const navigate = useRouter();
    const [modal, setModal] = useState(false);
    const [emiModalPop, setEmimodelPop] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    let selectOptions = [{ 'name': 'All' }, { 'name': 'i10' }, { 'name': 'Ritz' }, { 'name': 'Maruthi' }]
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
    return (
        <>
            <Row className="bg-white mx-0 p-3 price_page">
                <h5>{product?.[0]?.productBrand?.[0]?.BrandName} - {product?.[0]?.ProductName} {product[0]?.ModelVariantName} on Road Price in <span className="city_name">{city?.label}</span>
                    <span className="text-decoration-underline mx-2 small ash" onClick={() => setModal(true)}>change city
                    <FaMapMarkerAlt className="location-icon" />
                    </span>
                </h5>
                <p className="price-description mt-2 " >
                {product?.[0]?.productBrand?.[0]?.BrandName} - {product?.[0]?.ProductName} {product[0]?.ModelVariantName}
                  {', '}  It is powered by a 0.8-litre petrol engine (making 48PS and 69Nm) paired with a five-speed manual. The motor’s output drops to 41PS and 60Nm when fed with CNG. Its claimed mileage figures are 22.05kmpl for petrol and 31.59km/kg for CNG.
                </p>

                {/* <p>{product?.[0]?.productBrands[0].BrandName}-{product?.[0]?.ProductName} price in New Delhi starts from ₹ 10.45 Lakh and goes upto ₹ 19.65 Lakh for Maruti Grand Vitara Alpha Plus Hybrid CVT DT. Sigma MT variant of Grand Vitara is available in India at ₹ 10.45 Lakh. Competitors of Maruti Grand Vitara are Mahindra Thar in Hyderabad with a price tag of ₹ 13.59 Lakh, Volkswagen Taigun in Hyderabad with a price tag of ₹ 11.56 Lakh. Maruti Grand Vitara has a 1462-1490 cc, which gives a mileage of 27.97 KMPL Check out Frequently Asked Questions for Maruti Grand Vitara.</p> */}

                <Col lg={12} className='p-0'>
                    <Card className="rounded-0">
                        <CardBody>
                            <h5>Info
                                {/* <span className="float-end">
                                    <Multiselect className="w-50 float-end" options={selectOptions} singleSelect={true} showArrow={true} customArrow={true} placeholder="All" avoidHighlightFirstOption='true' displayValue="name" />
                                </span> */}
                            </h5>

                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th>Variant</th>
                                        <th>Ex-Showroom Price</th>
                                        <th>On-Road Price</th>
                                        <th>Specification</th>
                                    </tr>
                                </thead>
                                <tbody className="ash">
                                    <tr>
                                        <td>{product[0]?.ModelVariantName}</td>
                                        <td>₹ {numInLakh(product[0]?.Price)}</td>
                                        <td>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="tooltip-disabled">
                                                     TCS - ₹{product[0]?.tcs} <br/>
                                                     Tax - ₹{product[0]?.tax}   <br/>
                                                     Insurance - ₹{product[0]?.insurance}  <br/>
                                                     Fastag -₹{product[0]?.fasttag}
                                                    </Tooltip>
                                                }
                                            ><span>₹ {numInLakh(product[0]?.onRoadPrice)}</span></OverlayTrigger>
                                        </td>
                                        <td>{product[0]?.Fuel}</td>
                                    </tr>
                                </tbody>
                                {/* <tbody className="ash">
                                    {product?.[0]?.ModelVariantNameList.map((item, id) => {
                                        return (
                                            <tr key={id}>
                                                <td><a onClick={() => {gotoVarients(product?.[0]?.ProductName,item?.ModelVariantName,item.id)}}>{item?.ModelVariantName}</a></td>
                                                <td>{numInLakh(item?.Price)}</td>
                                                <td>{item?.Fuel}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody> */}
                            </table>
                        </CardBody>
                    </Card>
                </Col>

                <Col lg={12} className="mt-3 p-0">
                    <Card className="rounded-0">
                        <CardBody>
                            <Row>
                                <Col lg={4}>
                                    <img src="/allLogos.png" />
                                </Col>
                                <Col lg={8}>
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

export default PriceVariant;