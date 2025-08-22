import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, Postcard as PostCard} from '../components'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await appwriteService.getPosts()
                if (response) {
                    setPosts(response.documents)
                }
            } catch (error) {
                console.error("Error fetching posts:", error)
                setError("Failed to load posts. Please try again.")
                setPosts([])
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    if (loading) {
        return (
            <div className="content-wrapper section-spacing">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
                        Latest <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Stories</span>
                    </h1>
                    <div className="loading-spinner mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading amazing stories...</p>
                </div>

                {/* Loading skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="card animate-pulse">
                            <div className="skeleton h-48 rounded-lg mb-4"></div>
                            <div className="skeleton h-6 rounded mb-3"></div>
                            <div className="skeleton h-4 rounded mb-2"></div>
                            <div className="skeleton h-4 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="content-wrapper section-spacing">
                <div className="text-center max-w-2xl mx-auto">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h1 className="text-3xl font-bold text-slate-100 mb-4">
                        Oops! Something went wrong
                    </h1>
                    <p className="text-xl text-slate-400 mb-8">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }
  
    if (posts.length === 0) {
        return (
            <div className="content-wrapper section-spacing">
                <div className="text-center max-w-2xl mx-auto">
                    <div className="mb-8">
                        <div className="text-6xl mb-4 animate-bounce-subtle">📝</div>
                        <h1 className="text-4xl font-bold text-slate-100 mb-4">
                            Welcome to BlogSpace
                        </h1>
                        <p className="text-xl text-slate-400 mb-8">
                            {authStatus 
                                ? "No posts available yet. Be the first to share your thoughts!" 
                                : "Discover amazing stories and insights from our community."
                            }
                        </p>
                    </div>
                    
                    {!authStatus && (
                        <div className="card max-w-md mx-auto">
                            <h2 className="text-xl font-semibold text-slate-200 mb-4">
                                Join our community
                            </h2>
                            <p className="text-slate-400 mb-6">
                                Login to read posts, share your thoughts, and connect with other writers.
                            </p>
                            <div className="flex space-x-4 justify-center">
                                <a href="/login" className="btn-primary">
                                    Login
                                </a>
                                <a href="/signup" className="btn-secondary">
                                    Sign Up
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="content-wrapper section-spacing">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
                    Latest <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Stories</span>
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Discover insights, stories, and ideas from our community of writers
                </p>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {posts.map((post) => (
                    <PostCard key={post.$id} {...post} />
                ))}
            </div>

            {/* Load More Section */}
            {posts.length > 0 && (
                <div className="text-center mt-12">
                    <button className="btn-secondary">
                        Load More Posts
                    </button>
                </div>
            )}
        </div>
    )
}

export default Home