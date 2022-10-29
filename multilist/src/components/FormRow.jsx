import React from 'react'

const FormRow = ({type,name,value,handleChange,labelText,classes}) => {

    let newLabel = labelText.charAt(0).toUpperCase() + labelText.slice(1);
  return (
    <div className='form-row'>
    <label htmlFor={name} className='form-label'>
      {newLabel || name} :
    </label>

    <input 
     type={type} 
     name={name}
     value={value}
     onChange={handleChange}  
     className={classes} />
   </div>
  )
}

export default FormRow;
