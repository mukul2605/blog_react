import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, Postcard as PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center h-full mb-80">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to see all POSTS!
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else{return (
        <div className='w-full py-8 mb-5 mt-5 '>
            <Container>
                <div className='flex flex-wrap h-full'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )}
    
}

export default Home