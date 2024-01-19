import { Container, Row } from "reactstrap";
import ReactStars from 'react-stars'
import Link from "next/link";

function InfoCard(){
    return(
        <>
            <Container className="bg-white">
                {/* <Row className="mt-2 m-0 py-3">
                    <h5> Basic Information</h5>
                    <hr/>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Brand Name</th>
                                <th scope="col" className="red text-center">Maruti</th>
                                <th scope="col" className="red text-center">Maruti</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">On Road Price</th>
                                <td className="text-center">Rs.15736,032*</td>
                                <td className="text-center">Rs.18,63,783*</td>
                            </tr>
                            <tr>
                                <th scope="row">User Rating</th>
                                <td className="text-center">
                                    <ReactStars count={5} size={24} color2={'#D01818'} value={3} className={"star_class"} />
                                    Based on <span className="red fw-bold">154 Reviews</span>
                                </td>
                                <td className="text-center">
                                    <ReactStars count={5} size={24} color2={'#D01818'} value={3} className={"star_class"}/>Based on 
                                    <span className="red fw-bold">154 Reviews</span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Offers & Discount</th>
                                <td className="text-center">
                                    <img src="./cross_icon.svg" />
                                </td>
                                <td className="text-center">
                                <img src="./cross_icon.svg" fill="#fff" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Finance Available (EMI)</th>
                                <td className="text-center">Rs.31,125 <br/>
                                    <Link href="#" className="ash small">Check Now</Link>
                                </td>
                                <td className="text-center">Rs.42,448 <br/>
                                    <Link href="#" className="ash small">Check Now</Link>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Insurance</th>
                                <td className="text-center">Rs.31,125 <br/>
                                    <Link href="#" className="ash small">Check Now</Link>
                                </td>
                                <td className="text-center">Rs.42,448 <br/>
                                    <Link href="#" className="ash small">Check Now</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Row> */}
            </Container>
        </>
    )
}

export default InfoCard;