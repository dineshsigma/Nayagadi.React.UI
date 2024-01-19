import React, { useState, useEffect } from "react";
import Innerbanner from "../../../components/Innerbanner";
import { wrapper } from "/store";
import axios from "axios";
import { BsFillBagPlusFill } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { GrUserAdmin } from "react-icons/gr";
import { RiRemoteControl2Line } from "react-icons/ri";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import Multiselect from "multiselect-react-dropdown";
import { baseUrl } from "../../../env";
import { createApplyJobs } from "../../../store/enquirySlice";
import {
  Col,
  Row,
  Container,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

function CareersByid(careers) {
  const [modal, setModal] = useState(false);
  const [allCity, setAllcity] = useState([]);
  const [CategoryType, setCategoryType] = useState([]);
  let [categorySelected, setCategorySelected] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  let [jobform, setJobForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    location: "",
    resume: "",
  });
  const [file, setFile] = useState([]);
  let dispatch = useDispatch()
  const toggle = () => {
    setModal(!modal);
  };
  const onSelectLookingFor = (selectedList, selectedItem) => {
    setCategorySelected(selectedList);
  };
  useEffect(() => {
    axios.get(`${baseUrl}/api/locationtaxes/getcities`).then((response) => {
      setAllcity(response.data.data);
    });
  }, []);

  let changeHandler = (e) => {
    //Data check for checkbox
    if (e.target.checked) {
        setJobForm({ ...jobform, [e.target.name]: e.target.checked });
    } else {
       
        setJobForm({ ...jobform, [e.target.name]: e.target.value });
        if(e.target.files){
            setFile(e.target.files[0])
        }
    }
  };
  

  const addContactUs = async (event) => {
    event.preventDefault(categorySelected[0]);
    
    let body={
        "name":jobform.name,
        "email":jobform.email,
        "phone":jobform.phone,
        "message":jobform.message,
        "resume":file,
        "location":categorySelected?.[0]?.city
    };
    dispatch(createApplyJobs(body)).then(() => {});
    
    setFormErrors(validate(body));
    let errorsLength = Object.keys(validate(body)).length;
    if (errorsLength) {
      return;
    } else {
        // http://localhost:8000/api/carrers/applyjobs
      setJobForm({
        name:"",
        email: "",
        phone: "",
        message: "",
        resume: "",
        location: "",
      });
      setCategorySelected([]);
    }
  };

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
      <Innerbanner />
      <section className="section carrers ">
        <Container className="white-bg p-3 designations ">
          <Row className="mt-2 p-1 blog-details-bottom-div">
            <Col className="col-1">
              <div className="careerpage-icon">
                <img src="/suitcase.svg" />
              </div>
            </Col>
            <Col xs="9">
              <h5>Lead Quality Control QA</h5>

              <Row className="mt-3">
                <ul className="d-flex p-0 news-bottom-data">
                  <li className="p-0">
                    <h6 className="fulltime d-flex justify-content-center align-items-center">
                      Full Time
                    </h6>
                  </li>
                  <li>
                    <p>
                      <GrUserAdmin />
                      <span>Job Level:</span>Experienced
                    </p>
                  </li>
                  <li>
                    <p>
                      <GrUserAdmin />
                      <span>Experienced:</span>2 yrs
                    </p>
                  </li>
                  <li>
                    <p>
                      <GrUserAdmin />
                      <span>Posted:</span>2 days ago
                    </p>
                  </li>
                  <li>
                    <p>
                      <ImLocation2 />
                      <span>Location:</span>Hyderabad
                    </p>
                  </li>
                </ul>
              </Row>
            </Col>
            <Col>
            <Button      onClick={() => setModal(true)} className="carers-btns" ><BsFillArrowRightCircleFill/> &nbsp;Apply Now</Button>
            </Col>
          </Row>
        <div className="mt-3">
            <h4>
            Welcome to NAYAGADI
            </h4>
            <p className="mt-2">
            We are looking for an expert JavaScript developer who is highly skilled with Vue.js. Your primary focus will be developing user-facing web applications and components. Youll implement them with the Vue.js framework, following generally accepted practices and workflows.
            You will ensure that you produce robust, secure, modular, and maintainable code. You will coordinate with other team members, including back-end developers and UX/UI designers. Your commitment to team collaboration, perfect communication, and a quality product is crucial.
            </p>
            
        </div>
        <div className="mt-3">
            <h4>
            Essential Knowledge, Skills, and Experience
            </h4>
            <ul>
            <li className="p-0">
                <p className="mt-2">
                We are looking for an expert JavaScript developer who is highly skilled with Vue.js. Your primary focus will be developing user-facing web applications and components. Youll implement them with the Vue.js framework, following generally accepted practices and workflows.
                </p>
            </li>
                  <li className="p-0">
                <p className="mt-2">
                    We are looking for an expert JavaScript developer who is highly skilled with Vue.js. Your primary focus will be developing user-facing web applications and components. Youll implement them with the Vue.js framework, following generally accepted practices and workflows.
                </p>  
            </li>
            <li className="p-0">
                  <p className="mt-2">
                  We are looking for an expert JavaScript developer who is highly skilled with Vue.js. Your primary focus will be developing user-facing web applications and components. Youll implement them with the Vue.js framework, following generally accepted practices and workflows.
                  </p>                
            </li>


            </ul>
            
        </div>
        <div className="mt-3">
            <h4>
            Preferred Experience
            </h4>
            <ul>
            <li className="p-0">
                <p className="mt-2">
                We are looking for an expert JavaScript developer who is highly skilled with Vue.js. Your primary focus will be developing user-facing web applications and components. Youll implement them with the Vue.js framework, following generally accepted practices and workflows.
                </p>
            </li>
                  <li className="p-0">
                <p className="mt-2">
                    We are looking for an expert JavaScript developer who is highly skilled with Vue.js. Your primary focus will be developing user-facing web applications and components. Youll implement them with the Vue.js framework, following generally accepted practices and workflows.
                </p>  
            </li>
            <li className="p-0">
                  <p className="mt-2">
                  We are looking for an expert JavaScript developer who is highly skilled with Vue.js. Your primary focus will be developing user-facing web applications and components. Youll implement them with the Vue.js framework, following generally accepted practices and workflows.
                  </p>                
            </li>


            </ul>
            
        </div>
        <div className="mt-3">
            <h4>
            Skills
            </h4>
            <Row>
                <Col className="col-4">
                <ul>
            <li className="p-0">
                <p className="mt-2">
                We are looking for an expert JavaScript developer
                </p>
            </li>
                  <li className="p-0">
                <p className="mt-2">
                    We are looking for an expert Ja
                </p>  
            </li>
            <li className="p-0">
                  <p className="mt-2">
                  We are looking for an expert JavaScript 
                  </p>                
            </li>


            </ul>
                </Col>
                <Col className="col-6">
                <ul>
            <li className="p-0">
                <p className="mt-2">
                We are looking for an expert JavaScript developer who is highly skilled with Vue.js. Your primary focus will be developing user-facing web applications and components. Youll implement them with the Vue.js framework, following generally accepted practices and workflows.
                </p>
            </li>
                  <li className="p-0">
                <p className="mt-2">
                    We are looking for an expert JavaScript developer who is highly skilled with Vue.js. Your primary focus will be developing user-facing web applications and components. Youll implement them with the Vue.js framework, following generally accepted practices and workflows.
                </p>  
            </li>
            <li className="p-0">
                  <p className="mt-2">
                  We are looking for an expert JavaScript developer who is highly skilled with Vue.js. Your primary focus will be developing user-facing web applications and components. Youll implement them with the Vue.js framework, following generally accepted practices and workflows.
                  </p>                
            </li>


            </ul>
                </Col>

            </Row>
        
            
        </div>
        <div className="mt-3">
            <h4>
            Product Designer
            </h4>
            <p className="mt-2">
                <b>Product knowledge:</b> Deeply understand the technology and features of the product area to which y
                ou are assigned.</p>
                <p className="mt-2">
                <b>Product knowledge:</b> Deeply understand the technology and features of the product area to which y
                ou are assigned.</p>
                <p className="mt-2">
                <b>Product knowledge:</b> Deeply understand the technology and features of the product area to which y
                ou are assigned.</p>

              </div>
        </Container>

        <Modal isOpen={modal} size="sm" className="locations-modal w-70">
          <ModalHeader
            cssModule={{ "modal-title": "w-100 text-center" }}
            toggle={toggle}
          >
          </ModalHeader>
          <ModalBody>
            <div className="top_icons_container">
            <div className="borucher-form">
            <h4>Apply For This Job</h4>
              <Row>
                <Form className="contact-form mt-4" onSubmit={addContactUs}>
                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      placeholder="Enter Name"
                      className="jobform"
                      name="name"
                      value={jobform.name}
                      onChange={changeHandler}
                    />
                  </Form.Group>
                  <Row className="mb-1">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email ID</Form.Label>
                      <Form.Control
                        className="jobform"
                        name="email"
                        value={jobform.email}
                        onChange={changeHandler}
                      />
                      <span>{formErrors.email}</span>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Phone No</Form.Label>
                      <Form.Control
                        className="jobform"
                        name="phone"
                        value={jobform.phone}
                        onChange={changeHandler}
                      />
                      <span>{formErrors.phone}</span>
                    </Form.Group>
                  </Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Location</Form.Label>
                    {/* <Form.Control  className="contact" placeholder="Enter email" name="lookingfor" value={enquiryform.lookingfor}  onChange={changeHandler} /> */}
                    <Multiselect
                      id="multiselect"
                      className="main-form-select looking-for"
                      options={allCity}
                      avoidHighlightFirstOption={true}
                      singleSelect={true}
                      placeholder="Select Option"
                      displayValue="city"
                      onSelect={onSelectLookingFor}
                      selectedValues={categorySelected}
                    ></Multiselect>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      placeholder="Drop us a message"
                      size="lg"
                      className="jobform"
                      name="message"
                      value={jobform.message}
                      onChange={changeHandler}
                    />
                  </Form.Group>
                  {/* <div className="whats-app p-4 mt-3">
                <p>
                Upload CV(doc, docx, pdf)
                </p>
              </div> */}
                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Upload Resume</Form.Label>
                    <Form.Control
                      placeholder="Upload Resume"
                      size="lg"
                      className="jobform"
                      name="resume"
                      value={jobform.resume}
                      onChange={changeHandler}
                      type="file"
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    className="contact-submit btn-red btn-product-emi my-2 btn btn-secondary btn-lg"
                  >
                    Apply Job
                  </Button>
                </Form>
              </Row>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </section>
    </div>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const response = await axios.get(
      `${baseUrl}/api/footer/careersByid?id=${context.query.id}`
    );
    let careers = response?.data;
    return {
      props: { careers },
    };
  }
);

export default CareersByid;
