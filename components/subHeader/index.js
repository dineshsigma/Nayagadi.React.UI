import { FaMapMarkerAlt } from "react-icons/fa";
import EmiModal from "../popupModal";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import Select from "react-select";
import axios from "axios";
import { baseUrl } from "/env";
import {useSelector,useDispatch  } from "react-redux";
import { changeLocation } from "../../store/homeSlice";

function SubHeader() {
  let dispatch = useDispatch();
  const city = useSelector((state) => state.homepage.locations);
  const [location, setLocation] = useState();
  const [modal, setModal] = useState(false);
  const [allCity, setAllcity] = useState();

  useEffect(() => {
    let cities = []

    const items = JSON.parse(localStorage.getItem('location'));
    // dispatch(changeLocation(items))
    if (items) {
      setLocation(items.label);
    } else {
      setLocation("Delhi")
    }

    axios
      .get(`${baseUrl}/api/locationtaxes/getcities`)
      .then((response) => {
        cities = response?.data?.data?.map(item => {
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
    dispatch(changeLocation(e))
    localStorage.setItem('location', JSON.stringify(e));
    setLocation(e.label)
    setModal(!modal)
  }
  const toggle = () => {
    setModal(!modal)
  }

  return (
    <header className="white-bg-9">
      <nav className="navbar navbar-expand top-nav-bar p-0">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link ps-0" href={{
                    pathname: "/search",
                    query: {
                      page: 1
                    }
                  }}>New Launches</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ps-0" aria-current="page" href="/compare">Compare</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={{
                    pathname: "/news",
                    query: {
                      page: 1
                    }
                  }}>News</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={{
                    pathname: "/blogs",
                    query: {
                      page: 1
                    },
                  }}>Blogs</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">More </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" href="/careers">Careers with us</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" href="/faqs">FAQS</Link></li>
                  <li><Link className="dropdown-item" href="/">Insurance</Link></li>
                </ul>
              </li>
            </ul>
            <button className="btn btn-primary btn-location" onClick={() => setModal(true)}>
              <FaMapMarkerAlt className="location-icon"/> {city?.label}
            </button>
          </div>
        </div>
      </nav>
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
    </header>
  )
}

export default SubHeader