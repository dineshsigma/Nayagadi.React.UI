import { wrapper } from "../store";
import { client } from "../apollo-client";
import { gql } from "@apollo/client";
import { contactus } from "../store/footerSlice";
import Innerbanner from '../components/Innerbanner';
import {
  Container,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  CardTitle,
  CardText,
} from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { createContactUs } from "../store/enquirySlice";
import { baseUrl } from "../env";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { BiCalculator } from "react-icons/bi";

export default function ContactUs() {
  const contactData = useSelector((state) => state.footers.contact_us);
  let dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  let [enquiryform, setEnquiryData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
    lookingfor: "",
    location: "",
  });
  const [CategoryType, setCategoryType] = useState([]);
  // const [isChecked, setIsChecked] = useState();
  let [categorySelected, setCategorySelected] = useState([]);
  // let { name, email, contactNo, lookingFor, location } = enquiryform
  let changeHandler = (e) => {
    //Data check for checkbox
    if (e.target.checked) {
      setEnquiryData({ ...enquiryform, [e.target.name]: e.target.checked });
    } else {
      setEnquiryData({ ...enquiryform, [e.target.name]: e.target.value });
    }
  };

  //list of categories
  useEffect(() => {
    axios.get(`${baseUrl}/api/homepage/ListOfCategory`).then((response) => {
      setCategoryType(response.data.data);
    });
  }, []);

  //multi select for lookingFor
  const onSelectLookingFor = (selectedList, selectedItem) => {
    setCategorySelected(selectedList);
  };

  //Submit function in EnquiryForm
  const addContactUs = async (event) => {
    event.preventDefault(categorySelected[0]);
    let body = {
      firstname: enquiryform.firstname,
      lastname: enquiryform.lastname,
      email: enquiryform.email,
      message: enquiryform.message,
      phone: enquiryform.phone,
      location: enquiryform.location,
      lookingfor: categorySelected?.[0]?.category_type,
      message: enquiryform.message,
    };

    setFormErrors(validate(body));
    let errorsLength = Object.keys(validate(body)).length;
    // Checking the errors object length and validating
    if (errorsLength) {
      return;
    } else {
      dispatch(createContactUs(body)).then(() => {});
      setEnquiryData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
        lookingfor: "",
        location: "",
      });
      setCategorySelected([]);
    }
  };
  //to uncheck the checkbox afer submit

  //validation for enquiryForm
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // if (!values.name) {
    //   errors.name = "Name is required!";
    // }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.phone) {
      errors.phone = "mobile number is required!";
    }
    // if (!values.accepted) {
    //   errors.accepted = "Acceptance Required";
    // }
    return errors;
  };
  return (
    <div>
    <Innerbanner/>
    <section className=" section contact-us-page">
      <Container className="white-bg">
        <ToastContainer />
        <Row>
          <Col>
            <div className="innernal-container ">
              <h4 className="bottom-line mt-3 mb-3">Contact Us</h4>

              {/* <h3>{contactData?.attributes?.__typename}</h3>
                <p>{contactData?.attributes?.Content}</p> */}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <Card className="contact-us-form" id="enquiry-form">
              <CardBody>
                <h5>Testing Text</h5>
                <p>
                  Please provide below details, our executive will get in touch
                  with you.
                </p>
                <Form onSubmit={addContactUs} className="contact-form mt-4">
                  <Row className="mb-1">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        className="contact"
                        placeholder="Your First Name"
                        name="firstname"
                        value={enquiryform.firstname}
                        onChange={changeHandler}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        className="contact"
                        placeholder="Your Last Name"
                        name="lastname"
                        value={enquiryform.lastname}
                        onChange={changeHandler}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-1">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email ID</Form.Label>
                      <Form.Control
                        className="contact"
                        placeholder="Enter  Your email"
                        name="email"
                        value={enquiryform.email}
                        onChange={changeHandler}
                      />
                      <span>{formErrors.email}</span>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Phone No</Form.Label>
                      <Form.Control
                        className="contact"
                        placeholder="phone"
                        name="phone"
                        value={enquiryform.phone}
                        onChange={changeHandler}
                      />
                      <span>{formErrors.phone}</span>
                    </Form.Group>
                  </Row>
                  <Row className="mb-1">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Looking For</Form.Label>
                      {/* <Form.Control  className="contact" placeholder="Enter email" name="lookingfor" value={enquiryform.lookingfor}  onChange={changeHandler} /> */}
                      <Multiselect
                        id="multiselect"
                        className="main-form-select looking-for"
                        options={CategoryType}
                        avoidHighlightFirstOption={true}
                        singleSelect={true}
                        placeholder="Select Option"
                        displayValue="category_type"
                        onSelect={onSelectLookingFor}
                        selectedValues={categorySelected}
                      ></Multiselect>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        className="contact"
                        placeholder="Location"
                        name="location"
                        value={enquiryform.location}
                        onChange={changeHandler}
                      />
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      placeholder="Drop us a message"
                      size="lg"
                      className="contact"
                      name="message"
                      value={enquiryform.message}
                      onChange={changeHandler}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    className="contact-submit btn-red btn-product-emi my-2 btn btn-secondary btn-lg"
                  >
                    Submit
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xs="6">
            <div className="contact-card-img">
              <img
                src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Thar/8076/1601635839903/front-left-side-47.jpg?tr=w-456"
                alt=""
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="mt-3 p-0">
        <Row>
          <Col xs="3">
            <Card>
              <Row>
                <Col xs="4" className="py-3 pl-3">
                  <div className="ct-btm-card-img ">
                    <img
                      src="../location-icon.svg"
                      alt=""
                    />
                  </div>
                </Col>
                <Col xs="8">
                  <CardBody className="p-0">
                    <CardTitle>           
                         <h5 className="bottom-line contact-sub-heads mt-3 mb-3">Head Office</h5>
                         </CardTitle>
                    <CardText className="mb-1">
                     <p> 32 Finance Distic,Hyderabad Telanagana 5000032</p>
                    </CardText>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs="3">
            <Card>
              <Row>
                <Col xs="4" className="py-3 pl-3">
                  <div className="ct-btm-card-img ">
                    <img
                      src="../call-icon.svg"
                      alt=""
                    />
                  </div>
                </Col>
                <Col xs="8">
                  <CardBody className="p-0">
                    <CardTitle>           
                         <h5 className="bottom-line contact-sub-heads mt-3 mb-3">Phone</h5>
                         </CardTitle>
                    <CardText className="mb-1">
                     <p>+9140 4562 1258</p>
                     <p>+91 9876543210</p>
                    </CardText>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs="3">
            <Card>
              <Row>
                <Col xs="4" className="py-3 pl-3">
                  <div className="ct-btm-card-img ">
                    <img
                      src="../mail-icon.svg"
                      alt=""
                    />
                  </div>
                </Col>
                <Col xs="8">
                  <CardBody className="p-0">
                    <CardTitle>           
                         <h5 className="bottom-line contact-sub-heads mt-3 mb-3">Email</h5>
                         </CardTitle>
                    <CardText className="mb-1">
                      <p>info@nayagadi.com</p>
                      <p>support@nayagadi.com</p>
                    </CardText>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs="3">
            <Card>
              <Row>
                <Col xs="4" className="py-3 pl-3">
                  <div className="ct-btm-card-img ">
                    <img
                      src="../open.svg"
                      alt=""
                    />
                  </div>
                </Col>
                <Col xs="8">
                  <CardBody className="p-0">
                    <CardTitle>           
                         <h5 className="bottom-line contact-sub-heads mt-3 mb-3">Working Hours</h5>
                         </CardTitle>
                    <CardText className="mb-1">
                      <p><b className="black">Mon-Sat</b> 9:00 am - 6:30 pm</p>
                      <p><b className="black">Sun</b>9:00 am - 12:30 pm</p>
                    </CardText>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
    </div>
  );
}
