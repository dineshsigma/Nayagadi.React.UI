import { advertise } from '../store/footerSlice';
import { useSelector } from "react-redux";
import { wrapper } from '../store';
import { client } from '../apollo-client';
import { gql } from "@apollo/client"
import Image from 'next/image';
import { Col, Row, Container } from 'reactstrap';

export default function Advertisewithus() {
  const adverData = useSelector((state) => state.footers.advertiseData);
  return (
    <>
      <section className="white-bg section">
        <Container>
          <Row>
            <Col>
              <div className='innernal-container'>
                <h3>Advertise With us</h3>
                {/* <p>{adverData?.advertiseWithUs?.data?.attributes?.Content}</p> */}
                {/* <Image src={adverData?.advertiseWithUs?.data?.attributes?.Content?.landingimage?.data[0]?.attributes.url} alt="Vercel Logo" width={72} height={16} /> */}
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
//       query {
//         advertiseWithUs {
//           data {
//             id
//             attributes {
//               Title
//               Content
//               landingimage {
//                 data {
//                   attributes {
//                     url
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//       `
//     });
//     store.dispatch(advertise(data));
//   }
// );