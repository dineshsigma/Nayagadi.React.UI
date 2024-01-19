import { Button, Col, Row } from "reactstrap";
import ReactStars from 'react-stars'
import { useRouter } from "next/router";
import{numberFormat,numInLakh} from '../../priceformat.js';
import Link from "next/link.js";
import { BiUserCircle, BiShareAlt, BiCalendarAlt } from "react-icons/bi";
import { FaComment, FaRegEye } from "react-icons/fa";
function NewsCard({allNews, gridView }){
    const navigate = useRouter();

    // Function for navigation to News page 
    // function NavigateNewsPage(news_title, id){ 
    //     navigate.push(`/news/${news_title}/${id}`)
    //     // navigate.push(`/${item?.attributes?.ProductName}/${item.id}`)
    // }
    function handleShare(item){
      let urlBase = window.location.href + `/${item?.news_title?.replaceAll(' ', '-')?.split(',')[0]?.toLowerCase()}/${item?.id}`;
      if (navigator.share) {
          // console.log("Congrats! Your browser supports Web Share API");
          navigator
            .share({
              url: urlBase
              // url: `http://localhost:3000/variant/${product?.[0].ModelVariantName}/${product?.[0].id}`
            })
            .then(() => {
              // console.log("Sharing successfull");
            })
            .catch(() => {
              // console.log("Sharing failed");
            });
        } else {
          alert("Sorry! Your browser does not support Web Share API")
          // console.log("Sorry! Your browser does not support Web Share API");
        }
  }
    return(
        
        <div className={gridView ? "gridlist" : "gridcard"}>
        <div className="border point_cursor bloglist-card">
        <Link href={{pathname: '/news/[news_title]/[news_id]',
              query: {news_title: allNews?.news_title?.replaceAll(' ', '-')?.split(',')[0]?.toLowerCase(),
                      news_id: allNews.id},
              }}>
              <div className="serch-card-img">
                <img
                  className="tile-img"
                  src={allNews?.news_image}
                  width={"100%"}
                  height={"auto"}
                />
              </div>
          </Link>
          <div className="grid-body  w-100">
          <Link href={{pathname: '/news/[news_title]/[news_id]',
                query: {news_title: allNews?.news_title?.replaceAll(' ', '-')?.split(',')[0]?.toLowerCase(),
                        news_id: allNews.id},
                }}>
            <div className="blog-data">
              <h4 className="blogcard-sidehead mb-2">New Modern</h4>
              <h5>{allNews?.short_text}</h5>
              <p>{allNews?.short_text}</p>
              <h5 className="read-more">Read More</h5>
            </div>
            </Link>
            <div className="bottom-div pb-2 d-none d-sm-block d-lg-block">
              <Row>
                <Col className="col-4">
                  <div>
                    <h6 className="d-flex align-items-center">
                      <BiCalendarAlt className="blog-icons pr-2" />
                      {new Date(allNews?.date).toLocaleDateString('en-us', {day: 'numeric', year:"numeric", month:"short"})}
                    </h6>
                  </div>
                </Col>
                <Col className="col-8">
                  <ul className="d-flex justify-content-between blog-bottom-data">
                    <li>
                      <h6 className="d-flex align-items-center">
                        {" "}
                        <BiUserCircle className="blog-icons pr-2" /> Admin{" "}
                      </h6>
                    </li>
                    <li>
                      <h6 className="d-flex align-items-center">
                        {" "}
                        <FaComment className="blog-icons pr-2" /> No Comments{" "}
                      </h6>
                    </li>
                    <li>
                      <h6 className="d-flex align-items-center">
                        {" "}
                        <FaRegEye className="blog-icons pr-2" /> {allNews.Views}{" "}
                      </h6>
                    </li>
                    <li>
                      <h6>
                        {" "}
                        <BiShareAlt className="blog-icons pr-2" onClick = {() => handleShare(allNews)}/>
                      </h6>
                    </li>
                  </ul>
                  {/* <Row>
                        <Col className="col-3">
                            <h6 className="d-flex align-items-center"> <BiUserCircle className="blog-icons pr-2"/> Admin </h6>
                        </Col>
                   
                        <Col className="col-5">
                            <h6 className="d-flex align-items-center"> < FaComment className="blog-icons pr-2"/> No Comments </h6>
                        </Col>
                        <Col className="col-3">
                            <h6 className="d-flex align-items-center"> <FaRegEye className="blog-icons pr-2"/> 1234 </h6>
                        </Col>
                        <Col className="col-1"> 
                            <h6> <BiShareAlt className="blog-icons pr-2"/></h6>
                        </Col>    
                        </Row> */}
                </Col>
              </Row>
            </div>

            {/* <div className="row justify-content-evenly py-3 search-card-secs">
                    
                        <div className="col-3 border-end d-none d-sm-block d-lg-block">
                        <div className="d-flex align-items-center justify-content-center text-center">
                        <FaTachometerAlt /><label className="ml-1 align-items-center text-center">{allBlogs?.short_text} BHP</label>
                        </div>
                        </div>
                        <div className="col-3 border-end fuel-secs">
                            {products?.fuelType[0]?.fuelType}{products?.fuelType[1]? ("/"):null}{products?.fuelType[1]?.fuelType}
                        </div >
                        <div className="col-4 border-end">
                            {products?.Transmission?.[0]}{products?.Transmission?.[1]? ("/"):null}{products?.Transmission?.[1]}
                        </div>
                        <div className="col-1 text-center">
                            {products?.ManufactureYear}
                        </div>
                    
                    </div> */}
          </div>
        </div>
      </div>
    )
}

export default NewsCard;
