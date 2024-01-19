import { Col, Row } from "reactstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import RowAd from "../rowAds";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Advertizment from "../Advertizment";
import { baseUrl } from "../../env";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "reactstrap";
import Form from "react-bootstrap/Form";

function Footer() {
  const [addwithusmodal, setaddwithusmodal] = useState(false);
  const toggleaddwithus = () => setaddwithusmodal(!addwithusmodal);
  const [dealwithusmodal, setdealwithusmodal] = useState(false);
  const toggledeal = () => setdealwithusmodal(!dealwithusmodal);
  const [footerData, setFooterData] = useState([]);
  useEffect(() => {
    axios.get(`${baseUrl}/api/footer/getFooterDetails`).then((response) => {
      setFooterData(response?.data?.data[0]);
    });
  }, []);
  return (
    <>
      <Advertizment bgColor="bg-ash" />
      <div className="footer mt-2">
        <div className="footer-top">
          <div className="container">
            <Row className="row-cols-sm-2 row-cols-md-4 m-0 g-3">
              <Col>
                <h3 className="mb-4">Contact Us</h3>
                <p>
                  <Link
                    className="contact-number-email"
                    href="tel:+18001002000"
                  >
                    1800 100 2000 <span>(Toll-Free) </span>
                  </Link>
                </p>
                <p>
                  {" "}
                  <Link
                    className="contact-number-email"
                    href="mailto:support@nayagaadi.com"
                  >
                    support@nayagaadi.com
                  </Link>
                </p>
                <ul>
                  <li>
                    <Link href="#" onClick={() => setdealwithusmodal(true)}>{footerData?.DealerSolutions}</Link>
                  </li>
                  <li>
                    <Link href="/Usedcars">{footerData?.UsedcarBusiness}</Link>
                  </li>
                  <li>
                    <Link href="/Feedback">{footerData?.Feedback}</Link>
                  </li>
                </ul>
              </Col>
              <Col>
                <h3 className="mb-4">Company</h3>
                <ul>
                  <li>
                    <Link href="/aboutus">About us</Link>
                  </li>
                  <li>
                    <Link href="/faqs">{footerData?.FAQsURL}</Link>
                  </li>
                  <li>
                    <Link href="/privacypolicy">
                      {footerData?.PrivacyPolicyURL}
                    </Link>
                  </li>
                  <li>
                    <Link href="/termsandconditions">
                      {footerData?.TermsConditions}
                    </Link>
                  </li>
                  {/* <li><Link href="/CorporatePolicies">{footerData?.CorporatePolicies}</Link></li> */}
                  {/* <li><Link href="/Investers">Investors</Link></li> */}
                </ul>
              </Col>
              <Col className="col-6 col-sm-4 col-lg-3">
                <h3 className="mb-4">Explore</h3>
                <ul>
                  <li>
                    <Link
                      href="/advertisewithus"
                      onClick={() => setaddwithusmodal(true)}
                    >
                      {footerData?.AdvertiseWithUs}
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers">{footerData?.Carrers}</Link>
                  </li>
                  {/* <li><Link href="/Customercare">{footerData?.CustomerCare}</Link></li> */}
                  <li>
                    <Link href="/contactus">{footerData?.ContactUs}</Link>
                  </li>
                </ul>
              </Col>
              <Col>
                <h3 className="">EXPERIENCE NAYA GAADI APP</h3>
                <div className="playstore">
                  <Link href="#">
                    <img
                      src="/Apple-PlayStore.svg"
                      alt="App Store"
                      title="Naya Gadi Appstore"
                    />
                  </Link>
                  <Link href="#">
                    <img
                      src="/Google-PlayStore.svg"
                      alt="Google Play Store"
                      title="Naya Gadi Playstore"
                    />
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <Row className="m-0">
              <Col className="col-6 col-sm-6 col-lg-6">
                <div className="f-logo">
                  <img src="/logo.svg" />
                </div>
                <p>Copyright 2022 © Naya Gaadi All Rights Reserved.</p>
              </Col>
              <Col className="text-end col-6 col-sm-6 col-lg-6">
                <div className="social-links d-flex justify-content-end mt-3">
                  <Link href="#" className="facebook">
                    <FaFacebookF />
                  </Link>
                  <Link href="#" className="twitter">
                    <FaTwitter />
                  </Link>
                  <Link href="#" className="instagram">
                    <FaInstagram />
                  </Link>
                  <Link href="#" className="youtube">
                    <FaYoutube />
                  </Link>
                  <Link href="#" className="linkedin">
                    <FaLinkedinIn />
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {/* Deal with us  Modal starts hear */}
        <Modal isOpen={dealwithusmodal} className="addwithus-modal">
          <ModalHeader toggle={toggledeal}></ModalHeader>
          <ModalBody>
            <div className="top_icons_container">
              <div className="borucher-form">
                <h4>Dealers with us</h4>
                <p>
                  nayagadi offers various advertising products such as lead,
                  display ads to your target audience or else drop a mail to &nbsp;
                  <span className="email-id">info@nayagadi,com</span>{" "}
                </p>
                <Form validate="true" className="mt-2">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      Company Name <span class="red">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      required
                      name="name"
                    />
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>
                          Email Id <span class="red">*</span>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Email id"
                          required
                          name="phone"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>
                          Phone Number <span class="red">*</span>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Mobile Number"
                          required
                          name="phone"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>
                          Address <span class="red">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Address"
                          required
                          name="phone"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>
                          Address 2 
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Address"
                          required
                          name="phone"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>
                          Pincode <span class="red">*</span>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Pincode"
                          required
                          name="phone"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>
                          City
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter City"
                          required
                          name="phone"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      State <span class="red">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter City"
                      required
                      name="city"
                    />
                  </Form.Group>
               
                  <Form.Group className="FormGroup">
                    <Form.Label check className="mb-2">
                      <Input
                        id="checkId"
                        className="form-controlz"
                        type="checkbox"
                        name="accepted"
                      /> &nbsp;
                      <span>
                      You accept our <b>Terms and Conditions and Privacy Policy</b>
                      </span>
                    </Form.Label>
                  </Form.Group>
                  <Button
                    type="submit"
                    className="btn-red btn-product-emi my-2 btn btn-secondary btn-lg"
                  >
                    Submit
                  </Button>
                </Form>
                {/* after the form submittion */}
              <div className="d-flex submit-text">
              <img src="/check.svg" />
                <h5>Dear <b>Name</b> </h5>
              </div>
              <div className="mt-3">
              <p>Thank You! for showing Intrest in us. We will get back to you soon</p>
              
              </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
                {/* advertize with us  Modal starts hear */}
                <Modal isOpen={addwithusmodal} className="addwithus-modal">
          <ModalHeader toggle={toggleaddwithus}></ModalHeader>
          <ModalBody>
            <div className="top_icons_container">
              <div className="borucher-form">
                <h4>Advertise with us</h4>
                <p>
                  nayagadi offers various advertising products such as lead,
                  display ads to your target audience or else drop a mail to
                  info@nayagadi,com{" "}
                </p>
                <Form validate="true" className="mt-2">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      Name <span class="red">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      required
                      name="name"
                    />
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>
                          Phone Number <span class="red">*</span>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Mobile Number"
                          required
                          name="phone"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>
                          Phone Number <span class="red">*</span>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Mobile Number"
                          required
                          name="phone"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      Location at <span class="red">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter City"
                      required
                      name="city"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      type="textarea"
                      placeholder="Message"
                      required
                      name="city"
                      as="textarea"
                      rows={3}
                    />
                  </Form.Group>
                  <Form.Group className="FormGroup">
                    <Form.Label check className="mb-2">
                      <Input
                        id="checkId"
                        className="form-controlz"
                        type="checkbox"
                        name="accepted"
                      /> &nbsp;
                      <span>
                      You accept our <b>Terms and Conditions and Privacy Policy</b>
                      </span>
                    </Form.Label>
                  </Form.Group>
                  <Button
                    type="submit"
                    className="btn-red btn-product-emi my-2 btn btn-secondary btn-lg"
                  >
                    Submit
                  </Button>
                </Form>
                {/* after the form submittion */}
              <div className="d-flex submit-text">
              <img src="/check.svg" />
                <h5>Dear <b>Name</b> </h5>
              </div>
              <div className="mt-3">
              <p>Thank You! for showing Intrest in us. We will get back to you soon</p>
              
              </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}

export default Footer;
