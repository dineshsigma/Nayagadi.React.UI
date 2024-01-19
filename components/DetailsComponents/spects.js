import { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, AccordionBody, AccordionHeader, AccordionItem, UncontrolledAccordion } from "reactstrap";

function Specs({ product }) {
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
                <h5>{product?.[0]?.productBrands?.[0]?.BrandName}-{product?.[0]?.ProductName} Specs</h5>

                <p className="product-spec-desc">{product?.[0]?.attributes?.SpecsText} </p>

                <Col className="p-0 col-12 col-sm-6 col-lg-6">
                    <Card className="rounded-0 key-feature-card">
                        <CardBody>
                            <h5 className="key-features "> Key Specifications</h5>
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

                <Col className="key-feature-secndcrd">
                    <Card className="rounded-0 key-feature-card">
                        <CardBody>
                            <h5 className="key-features "> Key Features</h5>
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

                <Row className="bg-white mx-0 mt-3 py-3 p-0">
                    <Col className="p-0">

                        <Card className="rounded-0">
                        <h5 className="pl-3 pt-3">{product?.[0]?.productBrands?.[0]?.BrandName}-{product?.[0]?.ProductName} Specs</h5>

                            <CardBody>
                                <UncontrolledAccordion stayOpen open={open} toggle={toggle}>
                                {product[0] && product[0]?.Modelspec?.map((item, id) => {
                                    return (
                                        <AccordionItem key ={id}>
                                        <AccordionHeader targetId={id}>{item.title}</AccordionHeader>
                                        <AccordionBody accordionId={id}>
                                            <table className="table" key ={id}>
                                                <thead>
                                                {item.context.map((specs, id) => {
                                                    return (
                                                        <tr key={id}>
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
                <Col className="p-0">
                    <Card className="rounded-0 key-feature-card mb-4 p-0">
                        <CardBody>
                            <h5 className="key-features ">Car Features</h5>
                            <Row className="row"> 
                                {product[0] && product[0]?.features?.map((item, id) => {
                                    return (
                                        <Col key = {id} className="col-4">
                                                <div className="car-feature-img d-flex">
                                            <img src={item.icon} alt="nayagadi" />
                                            <p>{item.features}</p>

                                            </div>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Specs;