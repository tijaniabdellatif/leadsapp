import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import customFetch from '../../helpers/axios';


const initialState = {

    isLoading:false,
    user:null
}


export const registerUser = createAsyncThunk('user/registerUser',
async (user,thunkAPI) => {

      try{

        const resp = await customFetch.post('/register',user)
        // initialState.isLoading = true;
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

        setTimeout(() => {
          initialState.isLoading = true;
        },1000)
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


const userSlice = createSlice({
    name:'user',
    initialState,
    extraReducers:{

           [registerUser.pending]:(state) => {

                  state.isLoading = true;
           },

           [registerUser.fulfilled]:(state,{payload}) => {
            const { data } = payload;
            state.isLoading = false;
            state.user = data;
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
      state.isLoading = true;
      state.user = {
          
            'user':data.original.user,
            'token':data.original.access_token
      }
      toast.success(`Welcome Back ${data.original.user.fullname}`);
     },

     [loginUser.rejected]:(state,{payload}) => {
      state.isLoading = false;
      toast.error(payload);
     }
    }
});

export default userSlice.reducer;