import { useState } from "react";
import { Card, CardBody, Col, Row, Accordion, AccordionBody, AccordionHeader, AccordionItem, UncontrolledAccordion} from "reactstrap";

function SpecsVariant({ product }) {
    const [open, setOpen] = useState('');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };
    return (
        <>
            <Row className="bg-white mx-0 p-3 spec_page">
                <h5>{product?.[0]?.productBrand?.[0]?.BrandName} - {product?.[0]?.ProductName} {product[0]?.ModelVariantName}</h5>
                <Col className="mt-3 p-0">
                    <Card className="rounded-0 p-0 key-feature-card">
                        <CardBody>
                        <h5 className="key-features"> Key Specifications</h5>
                            <table className="table"> 
                                <thead>
                                {product[0] && product[0]?.specifications?.map((item, id) => {
                                    return (
                                        <tr key = {id}>
                                            <th>{item.context[0].key}</th>
                                            <td className="key-features-td">{item.context[0].value}</td>
                                        </tr>
                                    )
                                })}
                                </thead>
                            </table>
                        </CardBody>
                    </Card>
                </Col>
                <Col className="mt-3 ">
                    <Card className="rounded-0 key-feature-card">
                        <CardBody>
                            <h5 className="key-features"> Key Features</h5>
                            <table className="table"> 
                            <thead>
                                {product[0] && product[0]?.keyfeatures?.map((item, id) => {
                                    return (
                                        <tr key = {id}>
                                            <th>{item.context[0].key}</th>
                                            <td>{item.context[0].value}</td>
                                        </tr>
                                    )
                                })}
                                </thead>
                            </table>
                        </CardBody>
                    </Card>
                </Col>

                <Row className="bg-white mx-0 mt-3  p-0">
                    <Col className="p-0">
                        <Card className="rounded-0">
                            <CardBody>
                                <UncontrolledAccordion stayOpen open={open} toggle={toggle}>
                                {product[0] && product[0]?.KeySpecifications?.map((item, id) => {
                                    return (
                                        <AccordionItem key = {id}>
                                        <AccordionHeader targetId={id}>{item.title}</AccordionHeader>
                                        <AccordionBody accordionId={id}>
                                            <table className="table" key ={id}> 
                                                <thead>
                                                {item.context.map((specs, index) => {
                                                    return (
                                                        <tr key = {index}>
                                                            <th>{specs.key}</th>
                                                            <td>{specs.value}</td>
                                                        </tr>
                                                    )
                                                })}
                                                </thead>
                                            </table>
                                        </AccordionBody>
                                    </AccordionItem>
                                    )
                                })}  
                                </UncontrolledAccordion>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Row>
        </>
    )
}

export default SpecsVariant;