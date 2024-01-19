import DetailsLayout from "../../../../components/DetailsComponents/detailsLayout";
import VariantLayout from "../../../../components/VariantComponents/variantLayout";
import SliderCarousal from "../../../../components/sliderCarousal";
import { useRouter } from 'next/router'
import { wrapper } from "../../../../store";
import { client } from "../../../../apollo-client";
import { gql } from "@apollo/client"
import { getAll_productsbyid } from "../../../../store/searchslice";
import { getAllVariantsById } from "../../../../store/searchslice";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from '/env';

function VariantDetails() {
  const router = useRouter()
  const productdetails = useSelector((state) => state.searchproducts.productDetails);
  const [featuredVehicles, setFeaturedVehicles] = useState();
  const [realtedVariants, setRelatedVariants] = useState();
  const { id } = router.query
  // let prodId = productdetails[0].productId

  // featured vehicles query
  useEffect(() => {
    axios.get(`${baseUrl}/api/products/getTagNameWithProducts?TagName=MostSearchedVehicles`).then((res) => {
      setFeaturedVehicles(res.data.data)
    })
  }, [])
  // to get related variants by prodId
  useEffect(() => {
    axios.get(`${baseUrl}/api/modelvarient/getRelatedVarients?productId=${productdetails[0].productId}`).then((res) => {
      setRelatedVariants(res.data.data)
    })
  }, [productdetails])

  return (
    <>
      <ToastContainer />
      <VariantLayout product={productdetails} variantsData={realtedVariants}/>
      <SliderCarousal headtext="Featured" data={featuredVehicles} />
    </>
  )
}

// api for get product Details by id
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    let id = context.query.var_id
    if (!id.includes(".")) {
      const response = await axios.get(`${baseUrl}/api/modelvarient/getModelVarientsById?ModelVariantName=${id}`)
      store.dispatch(getAll_productsbyid(response.data));
    }
  }
);

export default VariantDetails;