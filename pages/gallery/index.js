import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Row, Container, Col, Button } from "reactstrap";
import Product360View from "../../components/galleryComponents/product360View";
import Link from "next/link";

function Gallery(props){
    const images = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg']
    // const videos = []
    const colors = [{
            color: 'white',
            image:'1.jpg'
        },
        {
            color: 'black',
            image:'2.jpg'
        }
        ]
    const router = useRouter();
    const [hashpath, setHashpath] = useState('');
    useEffect(()=>{
        const x = router.asPath.split('#')[1];
        setHashpath(x);
    },[])

    function tabClick(e){
        const x = e.target.hash.split('#')[1]
        setHashpath(x)
    }

    return(
        <Container fluid className="product-view-modals">
            <style jsx>{`
                .tab_head{
                    border-bottom: 3px solid red;
                    // padding-bottom:0
                }

                .tab-color{
                    color:rgba(0, 0, 0, 0.5) !important;
                }
            `}
            </style>
            
            {/* <Row className="bg-white  pt-3 w-100" style={{zIndex:1200}}>
                <Col lg={10} md={10} className="mx-auto">
                    <h5>Maruthi Swift <img src="../share-icon.svg" />
                        <Button className="btn-red rounded-0 float-end clear">Check Offers</Button>
                    </h5>
                    <ul className="nav" style={{clear:'both'}} id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation" >
                            <Link className={`nav-link fw-bold tab-color ${hashpath == 'pills-exterior' ? 'tab_head' : null} `} onClick={tabClick} href="#pills-exterior">Exterior</Link>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Link className={`nav-link fw-bold tab-color ${hashpath == 'pills-interior' ? 'tab_head' : null} `} onClick={tabClick} href="#pills-interior">Interior</Link>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Link className={`nav-link fw-bold tab-color ${hashpath == 'pills-360view' ? 'tab_head' : null} `} onClick={tabClick} href="#pills-360view">360 view</Link>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Link className={`nav-link fw-bold tab-color ${hashpath == 'pills-colours' ? 'tab_head' : null}`} onClick={tabClick}  href="#pills-colours">Colours MODAL</Link>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Link className={`nav-link fw-bold tab-color ${hashpath == 'pills-roadtest' ? 'tab_head' : null} `} onClick={tabClick}  href="#pills-roadtest">Road test</Link>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Link className={`nav-link fw-bold tab-color ${hashpath == 'pills-videos' ? 'tab_head' : null }`} onClick={tabClick} href="#pills-videos">Videos</Link>
                        </li>
                    </ul>
                </Col>
            </Row> */}

            <Row className="mt-3 position-relative">
                <Col lg={10} md={10} className="mx-auto">
                    <div className="tab-content p-0 w-100" id="pills-tabContent">
                        {props.forGallery === 'exterior' && <div id="pills-exterior" className="mt-3 mb-3">
                            {/* <h4>Exterior</h4> */}
                            {images.map((img,i)=>{
                                return <img key={i} width={"100%"} className="mt-2"  src={"/images/"+ img} />
                            })}
                        </div>}
                        {props.forGallery === 'interior' && <div id="pills-interior" className="mt-3 mb-3">
                            {/* <h4>Interior</h4> */}

                            {images.map((img,i)=>{
                                return <img key={i} width={"100%"} className="mt-2"  src={"/images/"+ img} />
                            })}
                        </div>}
                        {props.forGallery === '360 view' && <div id="pills-360view" className="mt-3 mb-3">
                            {/* <h4>360 View</h4> */}
                            <Product360View/>
                        </div>}
                        {props.forGallery === 'colors' && <div id="pills-colours" className="mt-3 mb-3">
                            {/* <h4>Colors</h4> */}
                            {colors.map((img,i)=>{
                                return <img key={i} width={"100%"} className="mt-2"  src={"/images/"+ img.image} />
                            })}
                        </div>}
                        {props.forGallery === 'road test' && <div id="pills-roadtest" className="mt-3 mb-3">
                            {/* <h4>Road Test</h4> */}
                            {images.map((img,i)=>{
                                return <img key={i} width={"100%"} className="mt-2"  src={"/images/"+ img} />
                            })}
                        </div>}
                        {props.forGallery === 'videos' && <div id="pills-videos" className="mt-3 mb-3" >
                            {/* <h4>Videos</h4> */}
                            {/* {images.map((img,i)=>{
                                return <img key={i} width={"100%"} className="mt-2"  src={"/images/"+ img} />
                            })} */}
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/IOQKwl8NSmw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/IOQKwl8NSmw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/IOQKwl8NSmw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Gallery;