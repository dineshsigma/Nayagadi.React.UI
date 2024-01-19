import { useSelector } from "react-redux";
import { wrapper } from '../store';
import { client } from '../apollo-client';
import { gql } from "@apollo/client"
import { getFeedback } from '../store/footerSlice';
import { Col, Row, Container } from 'reactstrap';

export default function Feedback() {
  const feedbackData = useSelector((state) => state.footers.feedback_data);
  return (
    <section className="white-bg section">
      <Container>
        <Row>
          <Col>
            <div className='innernal-container'>
              <h3>{feedbackData?.attributes?.__typename}</h3>
              <p>{feedbackData?.attributes?.Content}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     const { data } = await client.query({
//       query: gql`
//       query{
//         feedback{
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
//     store.dispatch(getFeedback(data));
//   }
// );
