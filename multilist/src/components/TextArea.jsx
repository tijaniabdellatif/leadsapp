import React from 'react'

const TextArea = ({cols,rows,placeholder,handleChange,labelText,classes,value,name}) => {
    let newLabel = labelText.charAt(0).toUpperCase() + labelText.slice(1);
  return (
    <div className='form-row'>
    <label htmlFor={name} className='form-label'>
      {newLabel || name} :
    </label>

    <textarea 
     name={name}
     rows={rows} 
     cols={cols}
     placeholder={placeholder}
     onChange={handleChange}  
     className={classes}
     defaultValue={value}
     style={{ width:"100%",height:'120px' }}>
       
    </textarea>
   </div>
  )
}

export default TextArea;
