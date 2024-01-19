import EnqForm from "./enqForm";
import mainCarousalCss from "./maincarousal.module.css";
import { useRouter } from "next/router";
import Spinner from "react-bootstrap/Spinner";
import Link from "next/link";
import { useSelector } from "react-redux";

function MainCarousal({ sliders }) {
  const navigate = useRouter();
  const city = useSelector((state) => state.homepage.locations);
  const sliderRedirect = (id, productName) => {
    // productName = productName.includes(' ') ? productName.replaceAll(' ','-') : productName
    navigate.push(`${productName}/${id}`);
  };
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide hero-slider"
      data-bs-ride="carousel"
    >
      <div className={"carousel-indicators  " + mainCarousalCss.indicators}>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className={"active "}
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div
        className={
          `carousel-inner position-relative ` + mainCarousalCss.carousel
        }
      >
        {sliders.length >= 1 ? (
          sliders.map((slider, index) => {
            return (
              <div
                key={index}
                className={
                  index == 0 ? `carousel-item active` : `carousel-item`
                }
              >
                <Link href={{pathname: '/[brand]/[slug]/[id]/[location]/model',
                                        query: {brand: slider?.productDetails?.productBrands?.[0]?.slug,
                                                slug: slider?.productDetails?.ProductName.toLowerCase().replaceAll(' ', '-'),
                                                id: slider?.productId,
                                                location: city.label},
                                        }}>
                  <img src={slider.bannerimage} width={"100%"} className="point_cursor bannner_component" alt="banner" />
                </Link>
                {/* <img
                  src="/../b111.png"
                  width={"100%"}
                  className="point_cursor bannner_component"
                  onClick={() =>
                    sliderRedirect(slider.productId, slider.productName)
                  }
                  alt="banner"
                /> */}
              </div>
            );
          })
        ) : (
          <div className={"carousel-item active "}>
            <p>hu</p>
          </div>
        )}
        <EnqForm />
      </div>
    </div>
  );
}

export default MainCarousal;
