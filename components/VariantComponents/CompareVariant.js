import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from "reactstrap";
import Multiselect from "multiselect-react-dropdown";
import { useRouter } from 'next/router';
import Link from "next/link";
import SliderCarousal from '/components/sliderCarousal';
import axios from "axios";
import Comparemodal from '../../components/compareTable/Comparemodal';
import { baseUrl } from "../../env";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { numInLakh } from '../../priceformat'
import { useSelector } from "react-redux";

//compare tab in product details page
function CompareVariant({ product, variantsData }) {
    const navigate = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectvarients, setSelectvarients] = useState([]);
    const [varids, setVarids] = useState([]);
    const city = useSelector((state) => state.homepage.locations);
    let selectOptions = [{ 'name': 'Maruti' }, { 'name': 'i10' }, { 'name': 'Ritz' }]
    const [similarPriceProducts, setsimilarPriceProducts] = useState([]);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    // Function for navigation to product variant details page with slug & seo 
    function NavigateVariantPage(item) {
        // navigate.push(`/variant/${item?.attributes?.ProductName}/${item.id}`)
        navigate.push(`/${product?.[0]?.productList?.[0]?.BrandName.toLowerCase()}/${item.slug}/${item.id}/${city.label}/variant`);
        // navigate.push(`/${item?.attributes?.ProductName}/${item.id}`)
    }
    let compare = new Set();
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
        if (e.target.checked) {
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

    // useEffect(() => {
    //     localStorage.setItem('array', JSON.stringify(selectvarients));
    // },[selectvarients])

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

    return (
        <Row className="bg-white m-0 p-3 compair_page">
            <h5 className="px-2">{product?.[0]?.ModelVariantName} Popular Comparisons In Hyderabad</h5>
            <Col lg={12} className="mt-3">
                <Card className="rounded-0">
                    <CardBody>
                        <h5>Compare {product?.[0]?.productBrands?.[0]?.BrandName}-{product?.[0]?.ProductName} Variants
                            {/* <span className="float-end">
                                <Multiselect options={selectOptions} singleSelect={true} showArrow={true} customArrow={true} placeholder="Petrol (6 Variants)" avoidHighlightFirstOption='true' displayValue="name" />
                            </span> */}
                        </h5>

                        <table className="table table-responsive ash">
                            <thead>
                                <tr>
                                    <th>Variants</th>
                                    <th>Ex-Showroom Price</th>
                                    <th>On-Road Price</th>
                                    <th className="text-center">Compare</th>
                                </tr>
                            </thead>
                            <tbody>
                                {variantsData && variantsData.map((item, id) => {
                                    return (
                                        <tr className="align-middle" key={id}>
                                            <td onClick={() => NavigateVariantPage(item)}>
                                            {/* <Link href={{pathname: '/[brand]/[slug]/[id]/variant',
                                                        query: {brand: product?.[0]?.productList?.[0]?.BrandName.toLowerCase(),
                                                                slug: item.slug,
                                                                id: item?.id},
                                                        }}> */}
                                                    <h6 className="m-0 text-decoration-underline">{item?.ModelVariantName}</h6>
                                            {/* </Link> */}
                                                <small>1462 cc . Petrol . {item?.attributes?.Type} </small>
                                            </td>
                                            <td>Rs. {item?.Price}</td>
                                            <td><OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="tooltip-disabled">
                                                     TCS - ₹{item?.tcs} <br/>
                                                     Tax - ₹{item?.tax}   <br/>
                                                     Insurence - ₹{item?.insurance}  <br/>
                                                     fastag -₹{item?.fasttag}
                                                    </Tooltip>
                                                }
                                            ><span>₹ {numInLakh(item?.onRoadPrice)}</span></OverlayTrigger></td>
                                            <td className="text-center compair-check"><input type="checkbox"
                                                checked={varids.includes(
                                                    item.id
                                                )}
                                                onClick={(e) => getVarient(e, item)} /></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </Col>

            <Col lg={12} className="mt-3">
                <div className="rounded-0">
                        <div className="row-cols-lg-12 mt-3">
                            {similarPriceProducts ?  <SliderCarousal headtext="Cars with Similar Price" data = {similarPriceProducts}/> :""}  
                        </div>
                </div>
            </Col>
            {selectvarients.length > 0 && <Comparemodal selectvarients={selectvarients} onChildClick={removeProduct} />}
        </Row>
    )
}

export default CompareVariant;