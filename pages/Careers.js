import { useSelector } from "react-redux";
import { wrapper } from '../store';
import { client } from '../apollo-client';
import { gql } from "@apollo/client"
import { carrers } from '../store/footerSlice';
import Innerbanner from '../components/Innerbanner';
import { FaUserAlt } from "react-icons/fa";

import { Col, Row, Container, Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { BsFillBagPlusFill } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { ImLocation2 } from "react-icons/im";
import { RiRemoteControl2Line } from "react-icons/ri";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { baseUrl } from '../env';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";
//ImLocation2
//GrUserAdmin
//BsFillBagPlusFill
//RiRemoteControl2Line
//BsFillArrowRightCircleFill

export default function Careers() {
  // const careersData = useSelector((state) => state.footers.carrers_data);
  const [carrers, setCarrers] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/api/footer/carrers`).then(response => {
      setCarrers(response?.data?.data)
    })

  }, []);


  return (
    <div>
    <Innerbanner/>
    <section className="careers" >
      <Container className="mt-3">
      
            <div className='innernal-container p-3' >
              <h3>Careers</h3>
              <h4 className="blogcard-sidehead mb-2 w-50">Easily apply to multiple jobs with one click! Quick Apply shows you recommended jobs based off your most recent search and allows you to apply to 25+ jobs in a matter of seconds!</h4>

                <Row>
                {
                carrers?.map((data, index) => {
               
                  return (
                    <Col xs="3" key={index} className='p-1'>
                      <div className="cards">
                      <Row>
                            <Col xs="5" className="d-flex align-items-center justify-content-center" >
                              <div className="carers-icon-col">
                                <div className="career-icon">
                              <img src='/suitcase.svg' />
                              </div>
                              {data?.type == 'Part Time' ? <h6 className="parttime" >{data?.type}</h6> :  <h6 className="fulltime" >{data?.type}</h6>}
                              </div>
                            </Col>
                            <Col  xs="7">
                              <div>
                              <h4 className="mt-3">{data?.desigination}</h4>
                              <ul>
                                <li><FaUserAlt/> Admin</li>
                                <li><ImLocation2/> {data?.location}</li>
                                <li><RiRemoteControl2Line/> Remote</li>
                              </ul>
                              </div>
                            </Col>
                          </Row>
                          <div className="px-2">
                            <p>
                            We have the right caring,experience and dedicated professional for you
                            </p>
                          </div>
                          <Row>
                          <Col>
                            <Link href={{pathname: 'careers/[role]/[id]',
                              query: {role: data?.desigination.toLowerCase(),id: data?.id,
                                                }}}>
                              <Button className="carers-btns" ><BsFillArrowRightCircleFill/> &nbsp;Apply Now</Button></Link>
                            </Col>
                          <Col>
                          <h5>
                            Experience
                          </h5>
                          <p>
                          {data?.experience} yrs
                          </p>
                          </Col>
                          </Row>
                      </div>
                      
                  </Col>
                  )
                })
              }
                </Row>
            </div>
         
      </Container>
    </section>
    </div>
  )

}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     const { data } = await client.query({
//       query: gql`
//       query{
//         carrer{
//           data{
//             id
//             attributes{
//               Title
//               Content
//             }
//           }
//         }
//       }
//       `
//     });
//     store.dispatch(carrers(data));
//   }
// );
