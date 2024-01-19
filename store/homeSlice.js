import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mostSearchedData: {},
  locations :{label:"Hyderabad",value:"12345676543211ed-b07e-2f1da89fc731"}
};

export const homeSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    getSearchedData: (state, action) => {
      state.mostSearchedData = action.payload;
      return state;
    },
    changeLocation: (state, action) => {
      state.locations = action.payload;
      return state;
    },
   
  },
});

export const { getSearchedData,changeLocation} = homeSlice.actions;
export default homeSlice.reducer;
