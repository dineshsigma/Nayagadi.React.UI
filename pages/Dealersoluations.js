import { useSelector } from "react-redux";
import { wrapper } from '../store';
import { client } from '../apollo-client';
import { gql } from "@apollo/client"
import { getDealerSolutions } from '../store/footerSlice';
import { Col, Row, Container } from 'reactstrap';

export default function Dealersolutions() {
  const careersData = useSelector((state) => state.footers.dealer_solutionsdata);
  return (
    <section className="white-bg section">
      <Container>
        <Row>
          <Col>
            <div className='innernal-container'>
              <h3>{careersData?.attributes?.__typename}</h3>
              <p>{careersData?.attributes?.Content}</p>
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
      query{ 
        dealerSolution{ 
          data{
            id
            attributes{
              Title
              Content
            }
          }
        }
      }
      `
    });
    store.dispatch(getDealerSolutions(data));
  }
);
