import { useSelector } from "react-redux";
import { wrapper } from '../store';
import { client } from '../apollo-client';
import { gql } from "@apollo/client"
import { getcustomercare } from '../store/footerSlice';
import { Col, Row, Container } from 'reactstrap';

export default function Customercare() {
  const customercareData = useSelector((state) => state.footers.customer_care);
  return (
    <>
      <section className="white-bg section">
        <Container>
          <Row>
            <Col>
              <div className='innernal-container'>
                <h3>{customercareData?.attributes?.__typename}</h3>
                <p>{customercareData?.attributes?.Content}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     const { data } = await client.query({
//       query: gql`
//       query{
//         customerCare{
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
//     store.dispatch(getcustomercare(data));
//   }
// );
