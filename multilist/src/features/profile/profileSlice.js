import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import customFetch from '../../helpers/axios';
import {getUserFromLocalStorage,addUserToLocalstorage, removeUserFromLocalstorage} from '../../helpers/storage';
import axios from 'axios';
import { getToken } from '../../helpers/utils';

const initialState = {

    profile:null,
    isLoading:false,
}


export const updateUser = createAsyncThunk('user/updateUser',async (profile,thunkAPI) => {

    try{

        const resp = await customFetch.post(`profile/${getUserFromLocalStorage('user').id}/update`,profile,{

             headers:{
                authorization:`Bearer ${getToken()}`
             },
             params:{
               _method:'PUT'
             }

        })
       
       
       return resp.data;


    }catch(err){

      const {data,status}=err.response;
        
      if(status === 400){

          toast.error(data.error.avatar[0]);
      }


    }
});




const profileSlice = createSlice({
  
     name:'profile',
     initialState,
     extraReducers:{

     [updateUser.pending]:(state,action) => {

      state.isLoading = true;
    },

    [updateUser.fulfilled]:(state,{payload}) => {

   
    state.isLoading = false;
    state.profile = payload;
    console.log('this is payload',payload);
    console.log('this is profile from  : ',state.profile);
    toast.success('User updated successfully');
  
    },

  [updateUser.rejected]:(state,{payload}) => {
     state.isLoading=false;
     console.log(payload);
    },
  }

});


export default profileSlice.reducer;