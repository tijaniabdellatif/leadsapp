import React from 'react'

const ImageHandler = ({src,alt,classes}) => {
  return (
     <img src={src} alt={alt} className={classes} />
  )
}

export default ImageHandler;
