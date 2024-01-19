import { useState } from 'react';
import { useSelector } from "react-redux";
import { wrapper } from '../store';
import { client } from '../apollo-client';
import { gql } from "@apollo/client"
import { getInvesters } from '../store/footerSlice';
import { Col, Row, Container } from 'reactstrap';

export default function Investers() {
  const investerData = useSelector((state) => state.footers.investers_data);
  return (
    <section className="white-bg section">
      <Container>
        <Row>
          <Col>
            <div className='innernal-container'>
              <h3>{investerData?.attributes?.__typename}</h3>
              <p>{investerData?.attributes?.Content}</p>
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
        investor {
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
    store.dispatch(getInvesters(data));
  }
);
