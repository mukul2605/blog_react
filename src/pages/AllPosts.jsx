import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Postcard } from '../components';
import service from '../appwrite/config';

function AllPosts() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get authentication state from Redux
    const isAuthenticated = useSelector(state => !!state.auth.userData);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login"); // Redirect if not logged in
            return;
        }

        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await service.getPosts();
                setPosts(response?.documents || []);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to load posts. Please try again.");
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [isAuthenticated, navigate]);

    // Loading state
    if (loading) {
        return (
            <div className="content-wrapper section-spacing">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
                        All <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Posts</span>
                    </h1>
                    <p className="text-xl text-slate-400">Loading your posts...</p>
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
        );
    }

    // Error state
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
        );
    }

    // Empty state (only shown after loading is complete)
    if (posts.length === 0) {
        return (
            <div className="content-wrapper section-spacing">
                <div className="text-center max-w-2xl mx-auto">
                    <div className="text-6xl mb-4">📝</div>
                    <h1 className="text-4xl font-bold text-slate-100 mb-4">
                        No Posts Yet
                    </h1>
                    <p className="text-xl text-slate-400 mb-8">
                        Be the first to share your thoughts with the community!
                    </p>
                    <button 
                        onClick={() => navigate('/add-post')} 
                        className="btn-primary"
                    >
                        Create Your First Post
                    </button>
                </div>
            </div>
        );
    }

    // Posts loaded successfully
    return (
        <div className="content-wrapper section-spacing">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
                    All <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Posts</span>
                </h1>
                <p className="text-xl text-slate-400">
                    Discover {posts.length} amazing {posts.length === 1 ? 'story' : 'stories'} from our community
                </p>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {posts.map((post) => (
                    <Postcard key={post.$id} {...post} />
                ))}
            </div>

            {/* Load More Section (for future pagination) */}
            {posts.length > 0 && (
                <div className="text-center mt-12">
                    <p className="text-slate-500 text-sm">
                        Showing all {posts.length} posts
                    </p>
                </div>
            )}
        </div>
    );
}

export default AllPosts;
