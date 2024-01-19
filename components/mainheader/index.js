import { useState } from "react";
import { Row } from "reactstrap";
import { FaRegBell,FaUserCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from 'next/router';

function MainHeader(){
    const navigate = useRouter();
    const [searchInput, setSearchInput] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [page, setPage] = useState(1);
    let handleChange = e => {
        setSearchInput(e.target.value)
    }
    function handleSearch() {
        if (searchInput.length == 0){
            setShowInput(!showInput)
        } else {
            navigate.push(`/search/${searchInput}`)
            setSearchInput("")
        }
    }
    function handleSubmit(e) {
        e.preventDefault()
        navigate.push(`/search/${searchInput}&page=${page}`)
        setSearchInput("")
        setShowInput(false)
    }

    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-light white-bg">
                <div className="container">
                    <Link className="navbar-brand" href="/">
                        <img src="/logo.svg" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav nav-ul ms-auto mb-2 mb-lg-0">                            
                            <li className="nav-item search-form">
                            <form className="d-flex align-center justify-center y-2" onSubmit={handleSubmit}>
                           
                          {/* Ternary operator to toggle search bar based on click */}
                                    {/* { showInput ?
                                        <input className="form-control search-input" type="text" placeholder="Search" aria-label="Search" onChange={handleChange} value={searchInput}/> : <></>
                                    } */}
                                    {/* <button className="btn btn-search light-yash" type="button" onClick={()=>handleSearch()}>
                                        <BiSearch/>
                                    </button> */}
                                    <div class="search-box">
                                        <input class="form-control text" type="text" placeholder="Search here" onChange={handleChange} value={searchInput}/>
                                        <button> <BiSearch/></button>
                                    </div>
                                </form>
                                {/* <form className="d-flex align-center justify-center y-2" onSubmit={handleSubmit}>
                                    {
                                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={handleChange} value={searchInput}/>
                                    }
                                    <button className="btn btn-search light-yash" type="button" onClick={()=>handleSearch()}>
                                        <BiSearch/>
                                    </button>
                                </form> */}
                            </li>
                            {/* <li className="nav-item bellicon ms-2"><FaRegBell /></li>
                            <li className="nav-item login-user ms-2">                                
                                <Link className="nav-link" aria-current="page" href="#"><FaUserCircle /> Login/Register</Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default MainHeader;