import { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { useRouter } from 'next/router';


function Comparemodal({selectvarients,onChildClick}) {
    const navigate = useRouter();
    const [varients,setVarients] =useState();


    function getUniqueListBy(arr, key) {
        return [...new Map(arr?.map(item => [item[key], item])).values()]
    }
    useEffect(() => {
     let arr =    getUniqueListBy(selectvarients,"id")
     setVarients(arr)
    },[selectvarients])
  // const [show, setShow] = useState(false);

  // const handleResize = () => {
  //   if (window.innerWidth < 720) {
  //     setIsMobile(true);
  //   } else {
  //     setIsMobile(true);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  // });
const removeProduct = (item,id) => {
    onChildClick(item,id)
}

const comparevarients = () => {
    const comp_ids = []
    varients.forEach(element => {
        comp_ids.push(element.id)
    });
    navigate.push(`/compare/${comp_ids}`) 
    localStorage.clear();
}
  return (
    <section className="white-bg-1 section pt-0 innernal-container2">

      {/* the bottom comapir div starts hear ------------------------------------------------------------- */}
      <div class="compare-popup pl-3">
        <Container>
          <Row>
            <Col className="col-12 col-sm-2 d-flex align-items-center justify-content-center ">
              <h6> MY COMPARE</h6>
            </Col>
            <Col>
              <div className="col-12  col-sm-9 ml-3 ">
                <Row>
                {varients && varients.map((item,id) => {
                  return (
                    <Col className=" d-flex col-6 col-sm-3" key={id}>
                    <div className="compare-image" > <button type="submit" class="close" onClick = {() => removeProduct(item,id)}>
                      <span>&times;</span> </button>
                      <img src={item?.Images?.images?.[0]} />
                      <h6>{item?.ModelVariantName} </h6>
                    </div>
                  </Col>
                  )  
                })}
                  {/* <Col className=" d-flex col-6 col-sm-3">
                    <div className="compare-image" > <button type="submit" class="close">
                      <span>&times;</span>
                    </button>
                      <img src="../car_emi.png" />
                      <h6>Car Name Variant  </h6>
                    </div>
                  </Col>
                  <Col className=" d-flex col-6 col-sm-3">
                    <div className="compare-image" >
                      <button type="submit" class="close">
                        <span>&times;</span>
                      </button>
                      <img src="../car_emi.png" />
                      <h6>Car Name Variant  </h6>
                    </div>
                  </Col>

                  <Col className=" d-flex col-6 col-sm-3 d-flex align-items-center">
                    <Button
                      className="add-car-compair "   >
                      <FaPlus className="btn-white " />
                      &nbsp;<span>Add Car</span>
                    </Button>
                  </Col> */}
                </Row>
              </div>
            </Col>
            <Col className=" col-12 col-sm-2 d-flex align-items-center mt-2">
              <Button className="btn-red rounded-pill btn-submit mx-auto pe-4 ps-4" onClick = {comparevarients}>
                Compare
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

    </section>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     let brand = [""];
//     let modals = [""];
//     let car = [""];
//     let fuel = [""];
//     let min = "";
//     let max = "";
//     // console.log(context?.query, "CONTEXTSLUG");
//     let car_type = context?.query?.car_type;
//     let priceRange = context?.query?.priceRange;
//     let products_brand = context?.query?.products_brand;
//     let id = context?.query?.id;
//     let fuel_types = context?.query?.fuelTypes;
//     let query = context?.query?.slug ? context?.query?.slug[0] : null;
//     if (query !== null && query?.includes("&")) {
//       let arr = query.split("&");
//       arr.forEach((q) => {
//         let x = q.split("=");
//       });
//     }

//     if (context?.query?.slug) {
//       if (context?.query?.slug?.[0] == "bybudget") {
//         const response = await axios.get(`${baseUrl}/api/products/searchProductsWithCarType?car_type=${context?.query?.slug?.[1].trim()}&priceRange=${context?.query?.slug?.[2].trim()}`)
//         store.dispatch(getAll_products(response.data));
//       } else if (context?.query?.slug?.[0] == "bybrand") {
//         const response = await axios.get(
//           `${baseUrl}/api/products/getListOfProductNames?products_brand=${query}&productName=${context?.query?.slug?.[2].trim()}`
//         );
//         store.dispatch(getAll_products(response.data));
//       } else if (context?.query?.slug?.[0] == 'searchVehiclesWithLogos') {
//         const response = await axios.get(
//           `${baseUrl}/api/homepage/searchVehiclesWithLogos?car_type=${car_type}&priceRange=${priceRange}&products_brand=${products_brand}&fuel_types=${fuel_types}&id=${id}`
//         );
//         store.dispatch(getAll_products(response.data));
//       } else {
//         const response = await axios.get(
//           `${baseUrl}/api/products/getAllProducts?name=${context?.query?.slug?.[0]}`
//         );
//         store.dispatch(getAll_products(response.data));
//       }
//     } else {
//       const response = await axios.get(
//         "${baseUrl}/api/products/getAllProducts"
//       );
//       store.dispatch(getAll_products(response.data));
//     }
//   }
// );

export default Comparemodal;
