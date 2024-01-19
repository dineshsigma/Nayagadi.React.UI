import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client'
import { client } from '../apollo-client';

const initialState = {
  users: [],
  footerData: {},
  aboutusData: {},
  advertiseData: {},
  carrers_data: {},
  contact_us: {},
  corporate_policies: {},
  customer_care: {},
  dealer_solutionsdata: {},
  feedback_data: {},
  privacy_data: {},
  terms_data: {},
  usedcars_data: {},
  investers_data: {},
  faqs_data :{},
};

//reducers for footers
export const usersSlice = createSlice({
  name: 'footers',
  initialState,
  reducers: {
    adddata: (state, action) => {
      state.footerData = action.payload;
      return state;
    },
    aboutus: (state, action) => {
      state.aboutusData = action.payload;
      return state;
    },
    advertise: (state, action) => {
      state.advertiseData = action.payload;
      return state;
    },
    carrers: (state, action) => {
      state.carrers_data = action.payload.carrer.data;
      return state;
    },
    contactus: (state, action) => {
      state.contact_us = action.payload.carrer.data;
      return state;
    },
    corporatePolicies: (state, action) => {
      state.corporate_policies = action.payload.corporatePolicie.data;
      return state;
    },
    getcustomercare: (state, action) => {
      state.customer_care = action.payload.customerCare.data
      return state;
    },
    getDealerSolutions: (state, action) => {
      state.dealer_solutionsdata = action.payload.dealerSolution.data;
      return state;
    },
    getFeedback: (state, action) => {
      state.feedback_data = action.payload.feedback.data;
      return state;
    },
    getPrivacy: (state, action) => {
      state.privacy_data = action.payload.privacyPolicy.data;
      return state;
    },
    getTerms: (state, action) => {
      state.terms_data = action.payload.termsAndCondition.data;
      return state;
    },
    getUsedcars: (state, action) => {
      state.usedcars_data = action.payload.usedCarBusiness.data;
      return state;
    },
    getInvesters: (state, action) => {
      state.investers_data = action.payload.investor.data;
      return state;
    },
    getFaqs: (state, action) => {
      state.faqs_data = action.payload;
      return state;
    },
  },
});

export const { adddata, aboutus, advertise, carrers, contactus, corporatePolicies, getcustomercare, getDealerSolutions, getFeedback, getPrivacy, getTerms, getUsedcars, getInvesters,getFaqs } = usersSlice.actions;

export default usersSlice.reducer;