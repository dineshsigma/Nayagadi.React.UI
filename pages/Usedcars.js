import { useState } from 'react';
import { useSelector } from "react-redux";
import { wrapper } from '../store';
import { client } from '../apollo-client';
import {gql} from "@apollo/client"
import { getUsedcars } from '../store/footerSlice';
import { Col, Row, Container } from 'reactstrap';

export default function Usedcars() {
    const usedcarsData = useSelector((state) => state.footers.usedcars_data);
  return (
    <section className="white-bg section">
      <Container>
        <Row>
          <Col> 
            <div className='innernal-container'>
              <h3>{usedcarsData?.attributes?.__typename}</h3>
              <p>{usedcarsData?.attributes?.Content}</p> 
            </div>
          </Col>
        </Row>
      </Container>
    </section>  
  )

}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
     const { data } = await client.query({
      query: gql`
      query {
        usedCarBusiness {
          data {
            id
            attributes {
              Title
              Content
              landingimage {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
      `
    });
      store.dispatch(getUsedcars(data));
      //store.dispatch(increment());
    }
  );
