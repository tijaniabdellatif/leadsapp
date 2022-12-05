import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import customFetch from '../../helpers/axios';
import {getUserFromLocalStorage,addUserToLocalstorage, removeUserFromLocalstorage} from '../../helpers/storage';
import axios from 'axios';
import { getToken } from '../../helpers/utils';

const initialState = {

    isLoading:false,
    isSidebarOpen:false,
    user:getUserFromLocalStorage(),

}




export const registerUser = createAsyncThunk('user/registerUser',
async (user,thunkAPI) => {

      try{

        const resp = await customFetch.post('/register',user)
        return resp.data

      }catch(error){
         
          const {data} = error.response;
           
          if(data.error.fullname){

              toast.error(data.error.fullname[0]);
          }

          if(data.error.email){

            toast.error(data.error.email[0]);
        }

        if(data.error.password){

              toast.error(data.error.password[0]);
        }

        if(data.error.confirm){

            toast.error(data.error.confirm[0]);
        }
        initialState.isLoading = false;
             
      }
})

export const loginUser = createAsyncThunk('user/loginUser',

async (user,thunkAPI) => {
 
      try{

        const resp = await customFetch.post('/login',user)
        return resp.data

      }catch(error){

        
          const {data} = error.response;
           
          if(data.error.email){

            toast.error(data.error.email[0]);
        }

        if(data.error.password){

              toast.error(data.error.password[0]);
        } 
        
        if(data.error){

            toast.error(data.error.error);
        }

        initialState.isLoading = false;
         
      }
})


export const logginOut = createAsyncThunk('user/logginOut',async (user,thunkAPI) => {

    try{

        let BaseUrl = 'http://127.0.0.1:8000/api/v1';
        const response = axios.post(BaseUrl+'/logout',user,{

              headers:{

                'Authorization':`Bearer ${getToken()}`
              }
        });
        return response.data;

    }catch(error){

        console.log("this is error",error);

    }
});


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

        toggleSidebar:(state) => {

            state.isSidebarOpen = !state.isSidebarOpen;
        },

        logoutUser : (state) => {

            state.user = null;
            state.isSidebarOpen = false;
            removeUserFromLocalstorage();
            toast.success('Waiting for your return');

        }
    },
    extraReducers:{

           [registerUser.pending]:(state) => {

                  state.isLoading = true;
           },

           [registerUser.fulfilled]:(state,{payload}) => {
            const { data } = payload;
            state.isLoading = false;
            state.user = data;
            addUserToLocalstorage(state.user);
            toast.success(`Hello there ${data.fullname}`);
           },

           [registerUser.rejected]:(state,{payload}) => {
            state.isLoading = false;
            toast.error(payload);
           },


           [loginUser.pending]:(state) => {

            state.isLoading = true;
        },

     [loginUser.fulfilled]:(state,{payload}) => {
      const { data } = payload;
      state.isLoading = false;
      state.user = {
          
            'user':data.original.user,
            'token':data.original.access_token
      }
      addUserToLocalstorage(data.original.user);
      localStorage.setItem('token',data.original.access_token);
      toast.success(`Welcome Back ${data.original.user.fullname}`,{
         
      });
     },

     [loginUser.rejected]:(state,{payload}) => {
      state.isLoading = false;
      toast.error(payload);
     },


     [logginOut.pending]:(state) => {

        state.isLoading = false;
    },

 [logginOut.fulfilled]:(state) => {
    state.user = null;
    state.isSidebarOpen = false;
    removeUserFromLocalstorage();
    localStorage.removeItem('token');
    toast.success('Waiting for your return !!');
 },

 [logginOut.rejected]:(state,{payload}) => {
  toast.error(payload);
 },
    }
});

export const {toggleSidebar,logoutUser} = userSlice.actions;
export default userSlice.reducer;