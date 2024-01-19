import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  productDetails: {},
  getAllproducts: {},
  getproductbyid: {},
  brandsList: [],
  selectedcarvarientname: null,
  brandname: null,
  productname: null,
  price: null,
  newsData: {},
  compareData : {},
  gridview:false,
  totalProducts: null
};

export const searchSlice = createSlice({
  name: 'searchproducts',
  initialState,
  reducers: {
    getAll_products: (state, action) => {
      state.products = action.payload.data;
      state.totalProducts = action.payload.TotalProducts ? action.payload.TotalProducts : 0 ;
      return state;
    },
    // getAll_productsbyid: (state, action) => {
    //   state.productDetails = action.payload.productDetailsDs?.data;
    //   return state;
    // },
    getAll_brands: (state, action) => {
      state.brandsList = action.payload;
      return state;
    },
    selectedCarVarientName: (state, action) => {
      state.selectedcarvarientname = action.payload;
      return state;
    },
    selectedBrandName: (state, action) => {
      state.brandname = action.payload;
      return state;
    },
    selectedProductName: (state, action) => {
      state.productname = action.payload;
      return state;
    },
    getAll_productsbyid: (state, action) => {
      state.productDetails = action.payload.data;
      return state;
    },
    getAll_brands: (state, action) => {
      state.brandsList = action.payload;
      return state;
    },
    getPriceEMi: (state, action) => {
      state.price = action.payload;
      return state
    },
    getNewsData: (state, action) => {
      state.newsData = action.payload;
      return state
    },
    getCompareData: (state, action) => {
      state.compareData = action.payload;
      return state;
    },
    changeGridview: (state, action) => {
      state.compareData = !state.compareData;
      return state;
    }
  },
});

export const { getAll_products, getAll_productsbyid, selectedCarVarientName, selectedBrandName, selectedProductName, getPriceEMi, getNewsData,getCompareData,changeGridview} = searchSlice.actions;
export default searchSlice.reducer;
