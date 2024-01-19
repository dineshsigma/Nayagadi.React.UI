import { useState, useEffect, useRef } from "react";
import { Button, Col, img, Container, Row } from "reactstrap";
import axios from "axios";
import Head from 'next/head';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
import {
  BiListUl,BiGridAlt,
  BiSearch,
  BiGridSmall,
  BiChevronsRight,
  BiCalendarAlt,
} from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";

function Pagination(noOfProducts) {
  const [isMobile, setIsMobile] = useState(false);
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useRouter();

  
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })
  useEffect(() => {
    setPages(Math.round(noOfProducts.noOfProducts/5));
  }, [noOfProducts])

  // useEffect(() => {
  //   setPath(window.location.href);
  // }, [path])

  function pageChange(value){
    let path1 = window.location.href.split('page=');
    let pathReq = path1[0] + `page=${value}`;
    navigate.push(pathReq);
    setCurrentPage(value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function prevPage(){
    if(currentPage != 1 && pages != 0){
      let path1 = window.location.href.split('page=');
      let pathReq = path1[0] + `page=${currentPage-1}`;
      navigate.push(pathReq);
      setCurrentPage(currentPage - 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  function nextPage(){
    if(currentPage != pages && pages != 0){
      let path1 = window.location.href.split('page=');
      let pathReq = path1[0] + `page=${currentPage + 1}`;
      navigate.push(pathReq);
      setCurrentPage(currentPage + 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  // console.log(noOfProducts, 'noOfProducts', pages, currentPage);
  return (

    <section className="white-bg-1 section pt-0 innernal-container2 pb-4">
      <Container className="mt-1">
        <Row>
          <ul className="d-flex blog-bottom-data pagenations">
          {pages != 0 && <button className="pagenations-buttons" onClick={() => prevPage()}><FaChevronLeft/></button>}
              {Array.from(Array(pages), (e, i) => {
                return <li className="p-2" key={i}>
                          <button onClick={() => pageChange(i+1)} className={i+1 == currentPage ? 'page-no-selected' : 'page-no'}>
                            {i+1}
                          </button>
                        </li>
              })}
            {pages != 0 && <button className="pagenations-buttons" onClick={() => nextPage()}><FaChevronRight/></button>}
          </ul>
        </Row>
      </Container>
    </section>
  )
}

export default Pagination;