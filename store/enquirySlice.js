import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client'
import { toast } from 'react-toastify';
import axios from 'axios';
import { client } from '../apollo-client';
import { baseUrl } from '../env';
let enquiryMutation = gql`mutation createEnquiryForm($name:String!,$email:String!,$contactNo:String!,$lookingFor:String!,$location:String){
  createEnquiryForm(data:{
    name:$name,
    email:$email,
    contactNumber:$contactNo,
    lookingFor:$lookingFor,
    location:$location

  }){
    data{
      id
      attributes{
        name
        email

      }
    }
  }
}`
export const createEnquiryForm = createAsyncThunk('enquiryform/create', async (payload, thunkAPI) => {
  let data = {}
  try {
   const response = await axios.post(`${baseUrl}/api/enquiry/CreateEnquiryForm`,{payload})
     toast.success(response.data.data);
    // thunkAPI.dispatch(setButtonLoading(false))
  } catch (e) {
    toast.error('Something went wrong !');
    //thunkAPI.dispatch(setButtonLoading(false))
  }
  return data
})

export const createContactUs = createAsyncThunk('enquiryform/create', async (payload, thunkAPI) => {
  let data = {}
  try {
   const response = await axios.post(`${baseUrl}/api/footer/contactUs`,{payload})
   toast.success(response?.data?.message);
    // thunkAPI.dispatch(setButtonLoading(false))
  } catch (e) {
    toast.error('Something went wrong !');
    //thunkAPI.dispatch(setButtonLoading(false))
  }
  return data
})

export const createApplyJobs = createAsyncThunk('userapplyjobs/create', async (payload, thunkAPI) => {
  console.log("payload---",payload)
  // let data = {}
  // let formData = new FormData();
  // formData.append("file", payload);
  // console.log(formData,'ffff');
  // let body = {
  //   'filename': payload.resume.name,
  //   'folder_type': 'resume'
  // }
  // try {
  //  const response = await axios.post(`${baseUrl}/api/carrers/applyjobs`,body);
  //  console.log(response, 'RRRR');

  //  const awsResponse = await axios.put(response.data.data, payload.resume, {
  //   headers: {
  //       'Content-Type': payload.resume.type,
  //   },
  // }).then(async (res) => {
  //   let uploadBody = {
  //       filename: payload.resume.name,
  //       folderpath: response.data.folderpath,
  //   }
  //   let resumeUrl = `https://happimobiles.s3.ap-south-1.amazonaws.com/test-userresume-v1/${uploadBody.folderpath}/${uploadBody.filename}`;
  //   console.log(resumeUrl, 'filenamefilenamefilename');
  //   console.log('uploadBodyuploadBodyuploadBody', uploadBody)
  //   // let data = await axios.post(`${baseUrl}uploadCsv/users/${orgId}`, uploadBody, {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // })
    // return data.data
// })
//   console.log(awsResponse, 'AAAA');

//   //  const response = await axios.post(`${baseUrl}/api/carrers/applyjobs`,payload);
//    console.log("response----",response);
//    toast.success(response?.data?.message);
//     // thunkAPI.dispatch(setButtonLoading(false))
//   } catch (e) {
//     toast.error('Something went wrong !');
//     //thunkAPI.dispatch(setButtonLoading(false))
//   }
//   return data
})




const initialState = {
  enquiryData: {},
  buttonLoading: false
};

// reducer for Enquiry Form in homepage
export const enquirySlice = createSlice({
  name: 'enquiryform',
  initialState,
  reducers: {
    addEnquirydata: (state, action) => {
      state.enquiryData = action.payload;
      return state;
    },
    setButtonLoading: (state, action) => {
      state.buttonLoading = action.payload
      return state;
    }
  },
});

export const { addEnquirydata, setButtonLoading } = enquirySlice.actions;

export default enquirySlice.reducer;