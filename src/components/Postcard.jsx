import React, {useId, forwardRef} from 'react'
import service from '../appwrite/config'
import {Link} from "react-router-dom"

function Postcard({
    $id,
    title,
    featuredImage
}) {
    // const id = useId()
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl
        p-4'>
            <div className='w-full justify-center mb-4'>

                <img src={service.getFilePreview(featuredImage)} alt={title} 
                className='rounded-xl'/>
            </div>
            <h2 className="text-gray-800 text-lg font-bold truncate">
                {title}
            </h2>

        </div>
    </Link>
  )
}

export default Postcard