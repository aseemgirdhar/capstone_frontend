import React from 'react'
import notFound from "../../assets/images/not-found.webp"
const NotFound = () => {
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
        <img src={notFound} alt="" style={{maxWidth: 40 + "%"}} />
    </div>
  )
}

export default NotFound