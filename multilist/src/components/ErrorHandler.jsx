
import React from 'react'
import { Link } from 'react-router-dom';
import {ImageHandler} from '../components';
import NotFound from '../assets/images/notfound.png';

const ErrorHandler = ({to,link,status}) => {
  return (
    <div>
    <ImageHandler src={ NotFound } alt='not-found'/>
    <h3>Oups something went wrong</h3>
    <h3>{status}</h3>
    <p>The page you attempt does not exist please try another action</p>
    <Link to={to} className='btn btn-danger'>{link}</Link>
 </div>
  )
}

export default ErrorHandler
