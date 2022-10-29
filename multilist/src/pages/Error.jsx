import React from 'react';
import Wrapper from '../assets/wrappers/ErrorPage';
import { ErrorHandler } from '../components';


 function Error() {
  return (
    <Wrapper className='full-page'>
        <ErrorHandler to='/'  status='404' link='Back Home' />  
    </Wrapper>
  )
}

export default Error;
