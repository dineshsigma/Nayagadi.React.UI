import { Row, img } from "reactstrap"
import Multiselect from "multiselect-react-dropdown";

function Quote() {
    let list1 = [{ 'name': 'Newest First' }, { 'name': 'Latest First' }, { 'name': 'Oldest First' }]
    return (
        <Row className="white-bg p-4 mt-3" id="installment-card">
            {/* <h5>Find Installments</h5>
            <Multiselect options={list1} customArrow={true} showArrow={true} placeholder="Loan Amount" className="mt-3" avoidHighlightFirstOption='true' displayValue="name" />
            <Multiselect options={list1} customArrow={true} showArrow={true} placeholder="Down Payment" className="mt-3" avoidHighlightFirstOption='true' displayValue="name" />
            <Multiselect options={list1} customArrow={true} showArrow={true} placeholder="Months Period" className="mt-3" avoidHighlightFirstOption='true' displayValue="name" />
            <Multiselect options={list1} customArrow={true} showArrow={true} placeholder="Interest Rate" className="mt-3" avoidHighlightFirstOption='true' displayValue="name" />
            <div className="d-grid gap-2 col mx-auto mt-4 mb-4">
                <button className="btn btn-light border" type="button">Estimate Now</button>
            </div> */}
            <img src="../car_add.jpg" />
        </Row>
    )
}

export default Quote;
