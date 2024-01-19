import { FaMapMarkerAlt } from "react-icons/fa";
import EmiModal from "../popupModal";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import Select from "react-select";
import axios from "axios";
import { baseUrl } from "/env";
import { useDispatch,useSelector  } from "react-redux";
import { changeLocation } from "../../store/homeSlice";

function Location({modal,toggle}) {
  let dispatch = useDispatch();
  const city = useSelector((state) => state.homepage.locations);
  const [location, setLocation] = useState();
  // const [modal, setModal] = useState(false);
  const [allCity, setAllcity] = useState();


  useEffect(() => {
    let cities = []

    const items = JSON.parse(localStorage.getItem('location'));
    dispatch(changeLocation(items))
    if (items) {
      setLocation(items.label);
    } else {
      setLocation("Delhi")
    }

    axios
      .get(`${baseUrl}/api/locationtaxes/getcities`)
      .then((response) => {
        cities = response.data.data.map(item => {
          item["label"] = item["city"];
          item["value"] = item["id"];
          delete item["city"];
          delete item["id"];
          return item;
        })
        setAllcity(cities);
      });
  }, [])

  const selectedCity = (e) => {
    toggle()
    dispatch(changeLocation(e))
    localStorage.setItem('location', JSON.stringify(e));
    setLocation(e.label)
  }
  // const toggle = () => {
  //   setModal(!modal)
  // }
  
  return (
    <>
      <Modal isOpen={modal} size="sm" className="locations-modal w-70">
        <ModalHeader cssModule={{ 'modal-title': 'w-100 text-center' }} toggle={toggle}>FIND YOUR CITY</ModalHeader>
        <ModalBody>
          <div className='top_icons_container'>
            <Row className=" citys-container ">
              <Col className='col-3 col-sm-2 col-lg-2'>
                <div className='icons_container'>
                  <div>
                    <img src="https://in.bmscdn.com/m6/images/common-modules/regions/mumbai.png" alt="mumbai" />
                  </div>
                  <div className='icons'>Mumbai</div>
                </div>
              </Col>
              <Col className='col-3 col-sm-2 col-lg-2'>
                <div className='icons_container'>
                  <div>
                    <img src="https://in.bmscdn.com/m6/images/common-modules/regions/hyd.png" alt="mumbai" />
                  </div>
                  <div className='icons'>Hyderabad</div>
                </div>
              </Col>
              <Col className='col-3 col-sm-2 col-lg-2'>
                <div className='icons_container'>
                  <div>
                    <img src="https://in.bmscdn.com/m6/images/common-modules/regions/bang.png" alt="mumbai" />
                  </div>
                  <div className='icons'>Bengaluru</div>
                </div>
              </Col>
              <Col className='col-3 col-sm-2 col-lg-2'>
                <div className='icons_container'>
                  <div>
                    <img src="https://in.bmscdn.com/m6/images/common-modules/regions/koch.png" alt="mumbai" />
                  </div>
                  <div className='icons'>Kochi</div>
                </div>
              </Col>
              <Col className='col-3 col-sm-2 col-lg-2'>
                <div className='icons_container'>
                  <div>
                    <img src="https://in.bmscdn.com/m6/images/common-modules/regions/kolk.png" alt="mumbai" />
                  </div>
                  <div className='icons'>Kolkata</div>
                </div>
              </Col>
              <Col className='col-3 col-sm-2 col-lg-2'>
                <div className='icons_container'>
                  <div>
                    <img src="https://in.bmscdn.com/m6/images/common-modules/regions/pune.png" alt="mumbai" />
                  </div>
                  <div className='icons'>Pune</div>
                </div>
              </Col>
              <Col className='col-3 col-sm-2 col-lg-2'>
                <div className='icons_container'>
                  <div>
                    <img src="https://in.bmscdn.com/m6/images/common-modules/regions/ahd.png" alt="mumbai" />
                  </div>
                  <div className='icons'>Ahemedabad</div>
                </div>
              </Col>

              <Col className='col-3 col-sm-2 col-lg-2'>
                <div className='icons_container'>
                  <div>
                    <img src="https://in.bmscdn.com/m6/images/common-modules/regions/chen.png" alt="mumbai" />
                  </div>
                  <div className='icons'>Chennai</div>
                </div>
              </Col>
              <Col className='col-3 col-sm-2 col-lg-2'>
                <div className='icons_container'>
                  <div>
                    <img src="https://in.bmscdn.com/m6/images/common-modules/regions/pune.png" alt="mumbai" />
                  </div>
                  <div className='icons'>Pune</div>
                </div>
              </Col>
              <Col className='col-3 col-sm-2 col-lg-2'>
                <div className='icons_container'>
                  <div>
                    <img src="https://in.bmscdn.com/m6/images/common-modules/regions/chd.png" alt="mumbai" />
                  </div>
                  <div className='icons'>Chandigarh</div>
                </div>
              </Col>
              <Col className='col-3 col-sm-2 col-lg-2'>
                <div className='icons_container'>
                  <div>
                    <img src="https://in.bmscdn.com/m6/images/common-modules/regions/ncr.png" alt="mumbai" />
                  </div>
                  <div className='icons'>Delhi</div>
                </div>
              </Col>

              <div className="top_icons_container" style={{ marginTop: "30px", marginBottom: "50px" }}>
                <Select
                  onChange={selectedCity}
                  options={allCity}
                  placeholder="Select City"
                />
              </div>
            </Row>

          </div>
        </ModalBody>
      </Modal>
      
    </>
  )
}

export default Location