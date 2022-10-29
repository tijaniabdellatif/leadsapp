import React,{useState,useEffect} from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { ImageHandler,FormRow } from '../components';
import Logo from "../assets/images/multilist-logo.png";
import {toast} from 'react-toastify';
import {useSelector,useDispatch} from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';

const initialState = {

  fullname:'',
  email:'',
  password:'',
  confirm:'',
  isMember:true
}


function Register() {

  const [values,setValues] = useState(initialState);
  

  const {user,isLoading} = useSelector(store => store.user);
  const dispatch = useDispatch();



    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setValues({...values,[name]:value});
   }

    const onSubmit = (e) => {

      e.preventDefault();
      const {fullname,email,password,confirm,isMember} = values;

      if(isMember){

          dispatch(loginUser({email:email,password:password}));
          return;
      }
      dispatch(registerUser({fullname,email,password,confirm}));

     

      
    }

    const toggleMember = () => {

        setValues({...values,isMember:!values.isMember});
    }
  return (
    <Wrapper className='full-page'>

        <form className='form' onSubmit={onSubmit}>
           <ImageHandler src={Logo} alt="multilist-logo" classes='logo' />
           <h3>{values.isMember ? 'Login' : 'Register' }</h3>

       {!values.isMember &&  <FormRow type="text" labelText='full name' name='fullname' value={values.fullname} handleChange={handleChange} classes="form-input" />}
     
          
          <FormRow type="email" labelText='email' name='email' value={values.email} handleChange={handleChange} classes="form-input" />
          <FormRow type="password" labelText='password' name='password' value={values.password} handleChange={handleChange} classes="form-input"/>
          {!values.isMember && <FormRow type="password" labelText='confirm password' name='confirm' value={values.confirm} handleChange={handleChange} classes="form-input" /> } 
          
           <button type="submit" className='btn btn-block'>
            {isLoading ? 'Loading...':'Submit'}
           </button>


          <p>
            {values.isMember ? 'Not a member yet?':'Already a member'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? 'Register' :'Login'}
           </button>
          </p>
          
        </form>
      
    </Wrapper>
  )
}

export default Register
