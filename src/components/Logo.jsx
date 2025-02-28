import React from "react"

const Logo = ({width = '100px'}) => {
  return (
    <div>
      <img src="/Logo.jpeg" alt="Logo" className="w-24 h-auto object-contain" />
    </div>
  )
};

export default Logo;
