import { Row } from "reactstrap";

function Details({ product }) {
    return (
        <Row className="bg-white prd-detail_first-tab m-0 p-3">
            <h5 className="mt-3">{product?.[0]?.ModelVariantName}</h5>

            <div className="ash mt-3 p-0">
                <h6>Latest Update :</h6>
                <p className="side-desc">{product?.[0]?.VarientDetailUpdate}</p>

                <h6>Price :</h6>
                <p className="side-desc">{product?.[0]?.VariantDetailPrice}</p>

                <h6>Variants :</h6>
                <p className="side-desc">{product?.[0]?.VariantDetailColour}</p>

                <h6>Engine and Transmission :</h6>
                <p className="side-desc">{product?.[0]?.VariantDetailEngineTransmission}</p>

                <h6>Features :</h6>
                <p className="side-desc">{product?.[0]?.VariantDetailSpecsFeatures}</p>

                <h6>Safety :</h6>
                <p className="side-desc">{product?.[0]?.VarientDetailSafety}</p>

                <h6>Rivals :</h6>
                <p className="side-desc">{product?.[0]?.VarientDetailRivals}</p>

                {/* <p>The price of Renault KWID starts at Rs. 4.64 Lakh and goes upto Rs. 5.99 Lakh. Renault KWID is offered in 8 variants - the base model of KWID is RXL and the top variant Renault KWID CLIMBER AMT which comes at a price tag of Rs. 5.99 Lakh.</p> */}
            </div>
        </Row>
    )
}

export default Details;