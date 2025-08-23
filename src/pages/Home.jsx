import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, Postcard as PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // Only fetch posts if user is authenticated
    if (!authStatus) {
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await appwriteService.getPosts();
        if (response) {
          setPosts(response.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [authStatus]);

  // Show welcome page for non-authenticated users
  if (!authStatus) {
    return (
      <div className="content-wrapper section-spacing">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6 animate-bounce-subtle">✨</div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-100 mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              BlogSpace
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-8">
            A vibrant community where ideas come to life, stories are shared,
            and connections are made through the power of words.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary text-lg px-8 py-3">
              Join Our Community
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-3">
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card text-center">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-semibold text-slate-200 mb-3">
              Share Your Stories
            </h3>
            <p className="text-slate-400">
              Write and publish your thoughts, experiences, and insights with
              our easy-to-use editor.
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-xl font-semibold text-slate-200 mb-3">
              Discover Content
            </h3>
            <p className="text-slate-400">
              Explore diverse perspectives and learn from writers across
              different topics and interests.
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-slate-200 mb-3">
              Build Connections
            </h3>
            <p className="text-slate-400">
              Connect with like-minded individuals and engage in meaningful
              conversations.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="card max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-100 mb-6">
            What is BlogSpace?
          </h2>
          <p className="text-lg text-slate-300 mb-6 leading-relaxed">
            BlogSpace is more than just a blogging platform – it's a creative
            sanctuary where writers of all levels come together to share their
            unique perspectives. Whether you're a seasoned author or just
            starting your writing journey, our community welcomes you with open
            arms.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="text-lg font-semibold text-slate-200 mb-2">
                ✍️ For Writers
              </h4>
              <p className="text-slate-400">
                Express yourself with our intuitive editor, organize your
                thoughts, and reach readers who appreciate your unique voice.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-slate-200 mb-2">
                📚 For Readers
              </h4>
              <p className="text-slate-400">
                Discover fresh perspectives, learn something new every day, and
                engage with content that matters to you.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Link to="/signup" className="btn-primary text-lg px-8 py-3">
              Start Your Journey Today
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="content-wrapper section-spacing">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Latest{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Stories
            </span>
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
    );
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
    );
  }

  if (posts.length === 0) {
    return (
      <div className="content-wrapper section-spacing">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-6xl mb-4 animate-bounce-subtle">📝</div>
          <h1 className="text-4xl font-bold text-slate-100 mb-4">
            Ready to Share Your Story?
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            No posts available yet. Be the first to share your thoughts and
            inspire others!
          </p>
          <Link to="/add-post" className="btn-primary text-lg px-8 py-3">
            Write Your First Post
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="content-wrapper section-spacing">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
          Latest{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Stories
          </span>
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
          <button className="btn-secondary">Load More Posts</button>
        </div>
      )}
    </div>
  );
}

export default Home;
