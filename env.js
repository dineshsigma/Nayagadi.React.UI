export const baseImageurl = "http://192.168.1.82:1337";
export const ngrokurl = "https://2877-183-83-216-63.in.ngrok.io";
//PUBLIC URL DOCKER
export const baseUrl = 'http://183.83.216.63:8002';
//Google Cloud URL
// export const baseUrl = 'https://nayagadi-api-kpcgomzs6q-uc.a.run.app'; 
//Local Server API URL
// export const baseUrl = 'http://192.168.1.78:9000';
//export const baseUrl = 'http://localhost:8000';

export const responsiveFilters = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 2500 },
      items: 8
    },
    desktop: {
      breakpoint: { max: 2500, min: 1200 },
      items: 8
    },
    tab: {
        breakpoint: { max: 1200, min: 780 },
        items: 4
    },
    tablet: {
      breakpoint: { max: 780, min: 464 },
      items: 6
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
};
export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 2500 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 2500, min: 1200 },
    items: 4
  },
  tab: {
      breakpoint: { max: 1200, min: 780 },
      items: 3
  },
  tablet: {
    breakpoint: { max: 780, min: 464 },
    items: 6
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

export const responsiveSimilarPriceCars = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 2500 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 2500, min: 1200 },
    items: 3
  },
  tab: {
      breakpoint: { max: 1200, min: 780 },
      items: 2
  },
  tablet: {
    breakpoint: { max: 780, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};