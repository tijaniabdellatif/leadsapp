import React,{useEffect, useState} from 'react';
import { FormRow,ImageHandler,TextArea } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage'; 
import { useDispatch,useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import { updateUser } from '../../features/profile/profileSlice';
import { getList } from '../../helpers/utils';

const Profile = () => {

const {profile,isLoading} = useSelector((state) => state.profile);
const dispatch = useDispatch();

const[profileData,setProfileData] = useState({...profile});


const [loadImage,setLoadImage] = useState('');

const handleSubmit = (e) => {


  e.preventDefault();

  const {fullname,email,adresse,bio,location,avatar} = profileData;

  if(!email || !fullname || !adresse || !bio  || !location || !avatar){

      toast.error('Please just fill out the fields');
      return;
  }

  dispatch(updateUser({fullname,email,adresse,bio,location,avatar}));
}


const fileHandler = (e) => {

    if(e.target.files.length !== 0){
      
       setProfileData((prev) => ({...prev,[e.target.name]:e.target.files[0].name}));

       const reader = new FileReader();


       reader.onload = () => {

          setLoadImage(reader.result);
       }

      

       reader.readAsDataURL(e.target.files[0]);
    }
}



const handleChange = (e) => {


     const name = e.target.name;
     const value = e.target.value;
     setProfileData({...profileData,[name]:value});
}



useEffect(() => {
  
let mounted = true;
 getList().then(item => {

 
  const {data:{profile}} = item ;


   mounted && setProfileData({...profileData,
      fullname:profile.user.fullname,
      email:profile.user.email,
      adresse:profile.adresse,
      bio:profile.bio,
      avatar:profile.avatar,
      location:profile.location
      })
     
      console.log('profiledata',profileData);

 }).catch(err => {

  toast.error(err);

 })
  
 return () => {
    mounted = false;
 };
},[profile])

  return (
    <Wrapper>
     
        <div>
        <div className='image-handler'>

        {loadImage && <ImageHandler
                        classes='avatar'
                        alt="avatar"
                        src={loadImage}
                        />}
      </div>
        </div>
        <form className='form' onSubmit={handleSubmit}>
         <h3>Profile</h3>
         <div className='form-center'>
         <FormRow type="email" labelText='email' name='email' value={profileData.email}  classes="form-input"  />
         <FormRow type="text" labelText='fullname' name='fullname' value={profileData.fullname}  classes="form-input"/>
         <FormRow type="text" labelText='Adresse' name="adresse" value={profileData.adresse === "null" ? 'Add your adresse':profileData.adresse} handleChange={handleChange} classes="form-input" />
         <FormRow type="text" labelText='Location' name="location" value={profileData.location === 'null' ? 'add your location':profileData.location} handleChange={handleChange} classes="form-input" />
         <FormRow type="file" labelText='Avatar' name="avatar" value={profileData.avatar} handleChange={fileHandler} classes="form-input" />
         </div>
        <div className='form-center'>
        <TextArea name='bio' labelText='Bio' rows='5' cols="40" placeholder='Your biography' value={profileData.bio} handleChange={handleChange} classes='form-input' />
        </div>
    
        <div className='container' style={{ 
          marginTop:"15px",
          position:"relative",
          float:"left"
          }}>
        <button type="submit"  className='btn btn-hipster'>Save Changes</button> 
        </div>
        </form> 

      
       
    </Wrapper>
  )
}

export default Profile;
