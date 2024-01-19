import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { wrapper } from '../store';
import { client } from '../apollo-client';
import { gql } from "@apollo/client"
import { getTerms } from '../store/footerSlice';
import { Col, Row, Container } from 'reactstrap';
import axios from "axios";
import { baseUrl } from '../env';
import { FiEdit } from "react-icons/fi";
import Innerbanner from '../components/Innerbanner';

export default function Termsandconditions() {
  const [termsData,setTermsData] = useState([])
  useEffect(() => {
    axios.get(`${baseUrl}/api/footer/gettermsandcondition`).then(response => {
      setTermsData(response.data.data);
    })
  }, [])
  return (
    // <section className="white-bg section">
    //   <Container>
    //     <Row>
    //       <Col>
    //         <div className='innernal-container'>
    //           <h3>Terms and Conditions</h3>
    //           {termsData?.[0]?.content ? 
    //           <p dangerouslySetInnerHTML={{__html: termsData?.[0]?.content && termsData?.[0]?.content}}/> :
    //           <div className='spinner'><div class="loading-bar"></div></div>}
    //         </div>
    //       </Col>
    //     </Row>
    //   </Container>
    // </section>

    <>
       <div>
     <Innerbanner/>
    <section className="section privacy-policy">
    <Container className="white-bg p-3">
          <div className='d-flex'>
            
              <img src='../tandc.svg' className='pp-icon'/>
        <div className='pl-3'>
            <h5>Terms and Conditions</h5>
              <p className='bottom-line'>Last updated On: <b>{termsData?.[0]?.date}</b></p>
              </div>
            {/* {privacyPolicy?.[0]?.content ?
              <p dangerouslySetInnerHTML={{ __html: privacyPolicy?.[0]?.content && privacyPolicy?.[0]?.content }} /> :
              <div className='spinner'><div class="loading-bar"></div></div>} */}
          </div>
              
          <Row className='mt-3 p-2'>
            <Col>
            <div className='innernal-container'>

{termsData?.[0]?.content ? 
<p dangerouslySetInnerHTML={{ __html: termsData?.[0]?.content && termsData?.[0]?.content }} /> : <div className='spinner'><div class="loading-bar"></div></div>} 
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
//         termsAndCondition {
//           data {
//             id
//             attributes {
//               title
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
//     store.dispatch(getTerms(data));
//   }
// );
