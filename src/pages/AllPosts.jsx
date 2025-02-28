import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Postcard } from '../components';
import service from '../appwrite/config';

function AllPosts() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    // Get authentication state from Redux
    const isAuthenticated = useSelector(state => !!state.auth.userData);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login"); // Redirect if not logged in
            return;
        }

        service.getPosts()
            .then((response) => {
                setPosts(response?.documents || []);
            })
            .catch(error => {
                console.error("Error:", error);
                setPosts([]);
            });
    }, [isAuthenticated, navigate]); // Depend on Redux authentication state

    return (
        <div className='w-full py-8 bg-gray-900 min-h-screen text-white'>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className='p-4'>
                                <Postcard {...post} />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-lg font-semibold text-center col-span-full">
                            No posts available
                        </p>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
