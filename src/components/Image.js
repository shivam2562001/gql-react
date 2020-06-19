import React from 'react'

export default function Image({image,handleImageRemove= (f)=>f}) {
  return (
         <img
               src={image.url}
               key={image.public_id}
               alt={image.public_id}
               style={{ height: "100px", width:"400px" }}
               className="img-thumbnail"
               onClick={() => handleImageRemove(image.public_id)}
          />
  )
}
