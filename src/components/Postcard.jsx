import React, {useState} from 'react'
import service from '../appwrite/config'
import {Link} from "react-router-dom"

function Postcard({
    $id,
    title,
    featuredImage,
    content
}) {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageError = (e) => {
        console.error('Image failed to load:', e.target.src);
        console.log('Featured Image ID:', featuredImage);
        setImageError(true);
        setImageLoading(false);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
        setImageError(false);
    };

    // Get image URL (now uses file view instead of preview)
    const imageUrl = service.getFilePreview(featuredImage);
    
    // Extract excerpt from content
    const getExcerpt = (htmlContent, maxLength = 120) => {
        if (!htmlContent) return '';
        const textContent = htmlContent.replace(/<[^>]*>/g, '');
        return textContent.length > maxLength 
            ? textContent.substring(0, maxLength) + '...' 
            : textContent;
    };



    return (
        <Link to={`/post/${$id}`} className="block group h-full">
            <article className='blog-post-card animate-fade-in h-full flex flex-col'>
                {/* Image Section */}
                <div className='relative overflow-hidden rounded-lg mb-4 flex-shrink-0'>
                    {imageError ? (
                        <div className='w-full h-48 bg-slate-700 rounded-lg flex items-center justify-center'>
                            <div className='text-center'>
                                <div className='text-4xl mb-2'>📝</div>
                                <p className='text-slate-400 text-sm'>No image available</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {imageLoading && (
                                <div className='w-full h-48 bg-slate-700 rounded-lg flex items-center justify-center'>
                                    <div className='loading-spinner'></div>
                                </div>
                            )}
                            <img 
                                src={imageUrl} 
                                alt={title}
                                className={`w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 ${imageLoading ? 'hidden' : 'block'}`}
                                onError={handleImageError}
                                onLoad={handleImageLoad}
                            />
                        </>
                    )}
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>

                {/* Content Section - Flex grow to fill remaining space */}
                <div className="flex flex-col flex-grow space-y-3">
                    <h2 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 leading-tight">
                        {title}
                    </h2>
                    
                    <div className="flex-grow">
                        {content && (
                            <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
                                {getExcerpt(content, 100)}
                            </p>
                        )}
                    </div>
                    
                    {/* Read More Indicator - Always at bottom */}
                    <div className="flex items-center justify-center text-xs text-slate-500 pt-3 mt-auto">
                        <span className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span>👁️</span>
                            <span>Read more</span>
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default Postcard