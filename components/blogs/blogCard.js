import { Button, Col, Row } from "reactstrap";
import ReactStars from "react-stars";
import { useRouter } from "next/router";
import { numberFormat, numInLakh } from "../../priceformat.js";
import Link from "next/link.js";
import { BiUserCircle, BiShareAlt, BiCalendarAlt } from "react-icons/bi";
import { FaComment, FaRegEye } from "react-icons/fa";

function BlogCard({ allBlogs, gridview }) {
  const navigate = useRouter();

  // Function for navigation to News page
  // function NavigateNewsPage(short_text, id) {
  //     navigate.push(`/blogs/${short_text[3, 5]}/${id}`)
  // }
  function handleShare(item){
    let urlBase = window.location.href + `/${item?.short_text?.replaceAll(' ', '-')?.split(',')[0]?.toLowerCase()}/${item?.id}`;
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
  return (
      <div className={gridview ? "gridlist" : "gridcard"}>
        <div className="border point_cursor bloglist-card">
        <Link
                  href={{
                    pathname: "/blogs/[blog_title]/[blog_id]",
                    query: {
                      blog_title: allBlogs?.short_text
                        ?.replaceAll(" ", "-")
                        ?.split(",")[0]
                        ?.toLowerCase(),
                      blog_id: allBlogs.id,
                    },
                  }}
                >
          <div className="serch-card-img">
            <img
              className="tile-img"
              src={allBlogs?.blog_image}
              width={"100%"}
              height={"auto"}
            />
          </div>
          </Link>
            <div className="grid-body  w-100">
          <Link
                  href={{
                    pathname: "/blogs/[blog_title]/[blog_id]",
                    query: {
                      blog_title: allBlogs?.short_text
                        ?.replaceAll(" ", "-")
                        ?.split(",")[0]
                        ?.toLowerCase(),
                      blog_id: allBlogs.id,
                    },
                  }}
                >
            <div className="blog-data">
              <h4 className="blogcard-sidehead mb-2">New Modern</h4>
              <h5>{allBlogs?.short_text}</h5>
              <p className="d-none d-sm-block d-lg-block">{allBlogs?.short_text}</p>
              <h5 className="read-more">Read More</h5>
            </div>
            </Link>
            <div className="bottom-div pb-2 d-none d-sm-block d-lg-block">
              <div className="d-flex justify-content-between">
                <div className="p-0">
                    <h6 className="d-flex align-items-center">
                      <BiCalendarAlt className="blog-icons pr-2" />
                      {new Date(allBlogs?.date).toLocaleDateString('en-us', {day: 'numeric', year:"numeric", month:"short"})}
                    </h6>
                  </div>
           
                <div className="blog-bottom-div">
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
                        <FaRegEye className="blog-icons pr-2" /> {allBlogs.Views}{" "}
                      </h6>
                    </li>
                    <li>
                      <h6>
                        {" "}
                        <BiShareAlt className="blog-icons pr-2" onClick = {() => handleShare(allBlogs)}/>
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
                </div>
              </div>
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
        {/* <Row className="border blogs-cards py-2 my-4 mx-1 point_cursor">
        <Col lg={4}>
        <div className="blog-card-imgs">

          <img src={allBlogs?.blog_image} width={"100%"} height={"auto"} />
          </div>
        </Col>

        <Col lg={8} className=" mt-2 search-card-content">
            <h4 className="blogcard-sidehead mb-2">New Modern</h4>
          <div className="blog-data search-card-content">
             <h5>{allBlogs?.short_text}</h5>
             <p>{allBlogs?.short_text}</p>
             </div>
         </Col>
      </Row> */}
      </div>
  );
}

export default BlogCard;
