import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true, icon: "🏠" },
    { name: "Login", slug: "/login", active: !authStatus, icon: "🔐" },
    { name: "Signup", slug: "/signup", active: !authStatus, icon: "📝" },
    { name: "All Posts", slug: "/all-posts", active: authStatus, icon: "📚" },
    { name: "Add Post", slug: "/add-post", active: authStatus, icon: "✍️" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="flex items-center justify-between py-3">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2 group">
          <Logo width="35px" />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              BlogSpace
            </h1>
            <p className="text-xs text-slate-400 -mt-1">Share your thoughts</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-1">
          {navItems.map(
            (item) =>
              item.active && (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className="nav-link flex items-center space-x-1 text-sm px-3 py-2"
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="hidden sm:inline">{item.name}</span>
                </button>
              )
          )}
          {authStatus && <LogoutBtn />}
        </div>
      </nav>
    </div>
  );
};

export default Header;
