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
                if (response?.documents) {
                    setPosts(response.documents);
                } else {
                    setPosts([]);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                setPosts([]);
            });
    }, [isAuthenticated, navigate]); // Depend on Redux authentication state

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <Postcard {...post} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center w-full">No posts available</p>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
