import React from "react"

const Container = ({children, className = ""}) => {
  return (
    <div className={`content-wrapper ${className}`}>
      {children}
    </div>
  )
};

export default Container;
