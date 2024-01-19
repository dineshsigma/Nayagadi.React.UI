import { Row } from "reactstrap";

function Vitara({ product }) {
    return (
            <Row className="bg-white m-0 p-3 prd-detail_first-tab">
                <h5 className="">{product?.[0]?.productBrands?.[0].BrandName}-{product?.[0]?.ProductName}</h5>

                <div className="ash mt-2 p-0">
                    <h6>Latest Update :</h6>
                    <p className="side-desc">{product?.[0]?.DetailLatestUpdate}</p>

                    <h6>Price :</h6>
                    <p  className="side-desc">{product?.[0]?.DetailPrice}</p>

                    <h6>Variants :</h6>
                    <p  className="side-desc">{product?.[0]?.DetailVariants}</p>

                    <h6>Engine and Transmission :</h6>
                    <p  className="side-desc">{product?.[0]?.DetailEngineTransmission}</p>

                    <h6>Features :</h6>
                    <p  className="side-desc">{product?.[0]?.DetailFeatures}</p>

                    <h6>Safety :</h6>
                    <p  className="side-desc">{product?.[0]?.DetailSafety}</p>

                    <h6>Rivals :</h6>
                    <p  className="side-desc">{product?.[0]?.DetailRivals}</p>

                    <p  className="side-desc">The price of Renault KWID starts at Rs. 4.64 Lakh and goes upto Rs. 5.99 Lakh. Renault KWID is offered in 8 variants - the base model of KWID is RXL and the top variant Renault KWID CLIMBER AMT which comes at a price tag of Rs. 5.99 Lakh.</p>
                </div>
            </Row>
    )
}

export default Vitara;