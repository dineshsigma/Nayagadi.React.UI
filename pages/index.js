import Head from 'next/head'
import RowAd from '../components/rowAds';
import CompareDiv from '../components/compareDiv';
import MainCarousal from '../components/mainCarousal';
import SliderCarousal from '../components/sliderCarousal';
import RadioCarousal from '../components/radioCarousal';
import TabsCarousal from '../components/tabsCarousal';
import News from '../components/news';
import { Col, Row, Container } from 'reactstrap';
import { useEffect, useState } from 'react';
import EmiModal from '../components/popupModal';
import { adddata } from '../store/footerSlice';
import { client } from "../apollo-client"
import { gql } from "@apollo/client"
// import { wrapper } from '../store';
import { useRouter } from 'next/router';
import { BiCalculator, BiShieldQuarter, BiGitCompare } from "react-icons/bi";
import { getSearchedData } from "../store/homeSlice";
import { useSelector } from "react-redux";
import { useQuery } from '@apollo/client';
import Geocode from "react-geocode";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Advertizment from '../components/Advertizment';
import InnerBanner from '../components/Innerbanner'
import Latestblog from '../components/Latestblog';
import Card from 'react-bootstrap/Card';
import { baseUrl } from '../env';
// const FOOTERQUERY = gql`
// query {
//   footer {
//     data {
//       id
//       attributes {
//         AboutUsURL
//         AboutUsText
//         TermsConditions
//         CorporatePolicies
//         AdvertiseWithUs
//         Carrers
//         CustomerCare
//         ContactUs
//         Feedback
//         DealerSolutions
//         UsedcarBusiness
//         FAQsURL
//         PrivacyPolicyURL
//       }
//     }
//   }
// }
// `
const sliderQuery = gql`
query {
  banners {
    data {
      id
      attributes {
        product_detail{
          data{
            id
            attributes{
              ProductName
            }
          }
        }
        BannerImage {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}`


const upcomingVehicles = gql`
query product($TagName:String!){
  productDetails(filters:{types_of_tag:{TagName:{eq:$TagName}}}){
    data{
      id
      attributes{
        ProductName
         Price
        Engine
        MaxPower
        CityMileage
        HighwayMileage
        TopSpeed
        ModelYear
        DetailLatestUpdate
        DetailPriceRange
        DetailEngineTransmission
        DetailFeatures
        DetailSafety
        DetailRivals
        ExShowroomPrice
        Specifications
        category{
          data{
            id
            attributes{
              CategoryType
            }
          }
        }
        types_of_tag{
          data{
            id
            attributes{
              TagName
            }
          }
        }
         car_type {
          data {
            id
            attributes {
              CarType
            }
          }
        }
        model_variants {
          data {
            id
            attributes {
              ModelName
              Mileage
              Type
              Price
            }
          }
        }
         car_features {
          data {
            id
            attributes {
              Features
            }
          }
        }
         products_brand {
          data {
            id
            attributes {
              BrandName
            }
          }
        }
        fuel_type{
            data{
                id
                attributes{
                    FuelType
                }
            }
        }
        ProductImage { 
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}`
export default function Home() {
  const [modal, setModal] = useState(false);
  const [mostSearched, setMostSearched] = useState();
  const [upcoming, setUpcoming] = useState();
  const [featured, setFeatured] = useState();
  const [slidedata, setSlidedata] = useState();
  const [homepageleftads, setHomePageLeftAds] = useState();
  const [homepagerightads, setHomePageRightAds] = useState();
  const [leftbutton, setLeftButton] = useState()
  const [rightbutton, setRightButton] = useState()

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [error, setError] = useState(null)

  let geolocationAPI;
  useEffect(() => {

    if ('geolocation' in navigator) {
      geolocationAPI = navigator.geolocation;
    }
  })


  const navigate = useRouter();
   useEffect (() => {
       axios.get(`${baseUrl}/api/banners/getbannerDetails`).then((res) => {
         setSlidedata(res.data.data)
       })
  },[])
  
 // most searched vehicles query
  const mostSearchedVehicle = useQuery(upcomingVehicles, {
    variables: {
      TagName: "Most Searched Vehicles"
    }
  });
  // upcoming vehicles query
  const upcomingData = useQuery(upcomingVehicles, {
    variables: {
      TagName: "Upcoming Vehicles"
    }
  });
  // featured vehicles query
  const featuresData = useQuery(upcomingVehicles, {
    variables: {
      TagName: "Featured Vehicles"
    }
  });


  const toggle = () => setModal(!modal);

  // function to get longitudu and latitude points

  //   useEffect(() => {
  //     if('geolocation' in navigator) {
  //       geolocationAPI = navigator.geolocation;
  //       }
  //     if (!geolocationAPI) {
  //       setError('Geolocation API is not available in your browser!')
  //     } else {
  //       geolocationAPI.getCurrentPosition((position) => {
  //         const { coords } = position;
  //         setLat(coords.latitude);
  //         setLong(coords.longitude);
  //       }, (error) => {
  //         setError('Something went wrong getting your position!')
  //       })
  //     }
  //   })


  //  useEffect(() => {
  //   Geocode.fromLatLng(lat,long).then(
  //     (response) => {
  //       const address = response.results[0].formatted_address;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  //  },[lat,long])

  useEffect(() => {
    axios.get(`${baseUrl}/api/products/getTagNameWithProducts?TagName=MostSearchedVehicles`).then((res) => {
      setMostSearched(res.data.data)
    })
    axios.get(`${baseUrl}/api/products/getTagNameWithProducts?TagName=UpcomingVehicles`).then((res) => {
      setUpcoming(res.data.data)
    })
    axios.get(`${baseUrl}/api/products/getTagNameWithProducts?TagName=FeaturedVehicles`).then((res) => {
      setFeatured(res.data.data)
    })
    axios.get(`${baseUrl}/api/homepage/homepageads`).then((homepageads) => {
      setHomePageLeftAds(homepageads.data.data[0].add1)
      setHomePageRightAds(homepageads.data.data[0].add2)
      setLeftButton(homepageads.data.data[0].add1.background_color1)
      setRightButton(homepageads.data.data[0].add2.background_color2)

    })
  }, [])

  return (
    <>
      <div>
        <Head>
          <title>Nayagadi</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/Nayagadi_Icon.png" />
        </Head>

        {slidedata ? <MainCarousal sliders={slidedata} /> : <div className='spinner'><div class="loading-bar"></div></div>}
        <RadioCarousal />
        <section className="white-bg pt-4">
          <Container>
            <Row>
              <Col className="col-12">
                <RowAd Imgsrc="/ad1.png"></RowAd>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="white-bg section">
          {mostSearched ? <SliderCarousal headtext="The most searched" data={mostSearched} /> : <div className='spinner'><div class="loading-bar"></div></div>}
        </section>

        <section className="white-bg pb-4">
          <Container>
            <Row>
              <Col className="col-12">
                <RowAd Imgsrc="/ad2.png"></RowAd>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="white-bg-1 section">
          {featured ? <SliderCarousal headtext="Feature" background="red" data={featured} /> : <div className='spinner'><div class="loading-bar"></div></div>}
        </section>

        <section className="white-bg pt-3 pb-3">
          <Container className='mb-2'>
            <Row>
              <Col className="col-12">
                {/* <RowAd Imgsrc="/ad4.png"></RowAd> */}
                <div className="container">
                  <div className='row'>
                    <div className='col-12 col-lg-6 col-sm-6 mt-2'>
                      <div className='card add-campain' style={{ "background-color": leftbutton, }}>
                        <div className='row'>
                          <div className='col-8 '>
                            <h6>{homepageleftads?.title1}</h6>
                            <p className='mt-4'>{homepageleftads?.shorttext1}</p>
                            <button >{homepageleftads?.buttontext1}</button>
                          </div>
                          <div className='col-4'>
                            <div className='add-campain-img'>
                              <img src={homepageleftads?.icon1} alt=""/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-12 col-lg-6 col-sm-6 mt-2'>
                      <div className='card add-campain' style={{ "background-color": rightbutton, }}>
                        <div className='row'>
                          <div className='col-8 '>
                            <h6>{homepagerightads?.title2}</h6>
                            <p className='mt-4'>{homepagerightads?.shorttext2}</p>
                            <button >{homepagerightads?.buttontext2}</button>
                          </div>
                          <div className='col-4'>
                            <div className='add-campain-img'>
                              <img src={homepagerightads?.icon2} alt=""/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className='col-6'>
                      <div className='card' style={{ "width": "607px", "height": "264px", "background-color": rightbutton, "border-radius": "0", "margin-left": "14px" }}>
                        <div className='row'>
                          <div className='col-8'>
                            <h6 >{homepagerightads?.title2}</h6>
                            <p style={{ "position": "relative", "left": "62px", "top": "21px", "color": "aliceblue!important" }} className='mt-4'>{homepagerightads?.shorttext2}</p>
                            <button style={{ "margin-top": "87px", "margin-left": "53px", "width": "139px", "height": "49px", "border": "none" }}>{homepagerightads?.buttontext2}</button>
                          </div>
                          <div className='col-4'>
                            <img src={homepagerightads?.icon2} alt="" style={{ "width": "123px", "height": "125px", "margin-top": "37px" }} />
                          </div>
                        </div>
                      </div>


                    </div> */}

                  </div>



                </div>

              </Col>
            </Row>
          </Container>
        </section>

        {upcoming ? <TabsCarousal data={upcoming} /> : <div className='spinner'><div class="loading-bar"></div></div>}

        <section className="white-bg section">
          <CompareDiv />
        </section>

        <section className="primary-bgs white-bg-1 pt-3 pb-3">
          <Container>
            <Row>
              <Col className="col-12">
                {/* <RowAd Imgsrc="/ad3.png"></RowAd> */}
                <Advertizment />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="white-bg section">
          <News />
        </section>

        <EmiModal open={modal} toggle={toggle} backdrop={true} />
      </div>
      <div className='slidenav-fixed position-fixed'>
        <Row className='text-white'>
          <Col className="text-center">
            <button className='d-flex align-items-center justify-content-center br-top-l-10x' onClick={() => navigate.push('compare')}>
              <BiGitCompare /> <span className='vertical-btns-text'> Compare</span>
            </button>
          </Col>

          <Col className="text-center">
            <button className='d-flex align-items-center justify-content-center'>
              <BiShieldQuarter className='vertical-btns-icons' /> <span className='vertical-btns-text'> Insurance</span>
            </button>
          </Col>

          <Col className="text-center">
            <button className='d-flex align-items-center justify-content-center br-top-r-20x' onClick={() => setModal(true)}>
              <BiCalculator /> <span className='vertical-btns-text'>EMI Calculator</span>
            </button>
          </Col>
        </Row>
      </div>
      <section className="section d-none">
        <Latestblog />
      </section>
      {/* <Advertizment /> */}

    </>
  )
}

