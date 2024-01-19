import { Col, Container, Row } from "reactstrap";
import BreadcrumComp from "../../components/breadcrumComp"
import CompareCard from "./compareCard";
import InfoCard from "./infoCard";
import { wrapper } from '../../store';
import axios from "axios";
import getCompareData from "../../store/searchslice";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { baseUrl } from '/env';

function Compare() {
    const router = useRouter()
    const [compareData,setCompareData] = useState();
    const [preselectVarients,setPreselectVarients] = useState();
    const payload = router?.query?.slug?.[0]
    useEffect(() => {
        setPreselectVarients(payload)
        axios.get(`${baseUrl}/api/modelvarient/getMultipleVarientsByids?ModelVariantName=${payload}`).then((res) => {
                setCompareData(res.data.data)
    })
    },[payload])
    return (
        <div className="container">
            <BreadcrumComp active_page={"Compare"} />
            <Row className="g-4">
                <Col lg={12}>
                    <CompareCard data = {compareData} preselectVarients = {preselectVarients}/>
                    {/* <InfoCard /> */}
                    {/* <InfoCard /> */}
                </Col>
                {/* <Col lg={4} className="bg-light">
                    <Row className="py-2">
                        <img src="/ad6.png" className="p-0" />
                    </Row>
                </Col> */}
            </Row>
        </div>
    )
}

export default Compare;

// export const getServerSideProps = wrapper.getServerSideProps(
//     (store) => async (context) => {
//         let payload = context?.query.slug[0]
//         let data = [];
//         if (!payload.includes(".")) {
//             ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//             })
//         }
      

//     })