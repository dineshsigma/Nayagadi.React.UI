import Multiselect from "multiselect-react-dropdown";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  FormGroup,
  Input,
  FormText,
  CardBody,
  Col,
  Label,
  Row,
  FormSelect,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { gql, useQuery, useMutation } from "@apollo/client";
import { toast, ToastContainer } from "react-toastify";
import { createEnquiryForm } from "../../store/enquirySlice";
import { addEnquirydata, setButtonLoading } from "../../store/enquirySlice";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { baseUrl } from "../../env";
function EnqForm() {
  let dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  let [enquiryform, setEnquiryData] = useState({
    name: "",
    email: "",
    contactNo: "",
    lookingFor: "",
    location: "",
    accepted: "",
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
    axios
      .get(
        `${baseUrl}/api/homepage/ListOfCategory`
      )
      .then((response) => {
        setCategoryType(response.data.data);
      });
  }, []);

  //multi select for lookingFor
  const onSelectLookingFor = (selectedList, selectedItem) => {
    setCategorySelected(selectedList);
  };

  //Submit function in EnquiryForm
  const addEnquiryForm = async (event) => {
    event.preventDefault(categorySelected[0]);
    let body = {
      name: enquiryform.name,
      email: enquiryform.email,
      contactNo: enquiryform.contactNo,
      location: enquiryform.location,
      accepted: enquiryform.accepted,
      lookingFor: categorySelected?.[0]?.category_type,
    };
    setFormErrors(validate(body));
    let errorsLength = Object.keys(validate(body)).length;
    // Checking the errors object length and validating
    if (errorsLength) {
      return;
    } else {
      dispatch(createEnquiryForm(body)).then(() => {});
      setEnquiryData({
        name: "",
        email: "",
        contactNo: "",
        lookingFor: "",
        location: "",
        accepted: !enquiryform.accepted,
      });
      setCategorySelected([]);
    }
    uncheck();
  };
  //to uncheck the checkbox afer submit
  function uncheck() {
    let inputs = document.getElementById("checkId");
    inputs.checked = false;
  }

  //validation for enquiryForm
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.contactNo) {
      errors.contactNo = "mobile number is required!";
    }
    if (!values.accepted) {
      errors.accepted = "Acceptance Required";
    }
    return errors;
  };
  return (
    <Card className="border-0 enquiryform d-none d-sm-none d-lg-block p-3" id="enquiry-form">
      <ToastContainer />
      <CardBody>
        <h5>ENQUIRY FORM</h5>
        <Form onSubmit={addEnquiryForm} className="home-enquiry-form">
          <FormGroup className="FormGroup mb-3">
            <Label for="">Name</Label>
            <Input
              id=""
              type="text"
              className="form-control"
              placeholder="Name *"
              name="name"
              value={enquiryform.name}
              onChange={changeHandler}
            />
          </FormGroup>
          <span style={{ color: "red" }}>{formErrors.name}</span>
          <FormGroup className="FormGroup d-none d-sm-none d-lg-block">
            <Label for="">Email</Label>
            <Input
              id=""
              type="email"
              className="form-control"
              placeholder="Email ID *"
              name="email"
              value={enquiryform.email}
              onChange={changeHandler}
            />
          </FormGroup>
          <span style={{ color: "red" }}>{formErrors.email}</span>
          <FormGroup className="FormGroup">
            <Label for="">Contact No</Label>
            <Input
              id=""
              type="tel"
              className="form-control"
              placeholder="Phone No *"
              name="contactNo"
              value={enquiryform.contactNo}
              onChange={changeHandler}
              pattern="[0-9]{10}"
              maxlength="10"
              minlength="10"
            />
          </FormGroup>
          <span style={{ color: "red" }}>{formErrors.contactNo}</span>
          <FormGroup className="FormGroup">
            <Label for="">Looking for</Label>
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
          </FormGroup>
          <FormGroup className="FormGroup d-none d-sm-none d-lg-block">
            <Label for="">Location</Label>
            <Input
              id=""
              type="text"
              className="form-control"
              placeholder="Location"
              name="location"
              value={enquiryform.location}
              onChange={changeHandler}
            />
          </FormGroup>
          <FormGroup className="FormGroup">
            <Label check className="mb-2">
              <Input
                id="checkId"
                className="form-controlz"
                type="checkbox"
                name="accepted"
                value={enquiryform.accepted}
                onChange={changeHandler}
              />
              <span>
                By using this form you agree with the storage and handling of
                your data by this website
              </span>
            </Label>
          </FormGroup>
          <span style={{ color: "red" }}>{formErrors.accepted}</span>
          <Button className="btn btn-submit w-100" type="submit">
            SEND
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}

export default EnqForm;
