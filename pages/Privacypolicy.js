import { wrapper } from '../store';
// import { client } from '../apollo-client';
// import { gql } from "@apollo/client"
// import { getPrivacy } from '../store/footerSlice';
import { Col, Row, Container } from 'reactstrap';
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from '../env';
import { MdOutlinePrivacyTip } from "react-icons/md";
import Innerbanner from '../components/Innerbanner';

//MdOutlinePrivacyTip

export default function Privacypolicy() {
  const [privacyPolicy, setPrivacyPolicy] = useState([])
  useEffect(() => {
    axios.get(`${baseUrl}/api/footer/privacyPolicy`).then(response => {
      setPrivacyPolicy(response.data.data);
    })
  }, [])
  return (
    <>
       <div>
     <Innerbanner/>
      <section className="section privacy-policy">
        
        <Container className="white-bg p-3">
          <div className='d-flex'>
            
              <MdOutlinePrivacyTip className='pp-icon'/>
        <div className='pl-3'>
            <h5>Privacy Policy</h5>
              <p className='bottom-line'>Last updated On:<b>{privacyPolicy?.[0]?.date}</b></p>
              </div>
            {/* {privacyPolicy?.[0]?.content ?
              <p dangerouslySetInnerHTML={{ __html: privacyPolicy?.[0]?.content && privacyPolicy?.[0]?.content }} /> :
              <div className='spinner'><div class="loading-bar"></div></div>} */}
          </div>
              
          <Row className='mt-3 p-2'>
            <Col>
              <div className='innernal-container'>

                {privacyPolicy?.[0]?.content ? 
                <p dangerouslySetInnerHTML={{ __html: privacyPolicy?.[0]?.content && privacyPolicy?.[0]?.content }} /> : <div className='spinner'><div class="loading-bar"></div></div>} 
                </div>
            </Col>
          </Row>
        </Container>
      </section>
      </div>
    </>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     const { data } = await client.query({
//       query: gql`
//       query {
//         privacyPolicy {
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
//     store.dispatch(getPrivacy(data));
//   }
// );
