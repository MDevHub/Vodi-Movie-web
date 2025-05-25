import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaSearch, FaUser, FaChevronDown } from 'react-icons/fa';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-black text-white p-4 flex items-center justify-between px-[6vw] fixed top-0 w-full z-50">
        {/* Hamburger & Logo */}
        <div className="flex items-center space-x-4">
          <button aria-label="Menu" onClick={toggleMenu}>
            <FaBars size={17} className="text-gray-100" />
          </button>

          <Link to="/" className="text-3xl font-bold font-poppins">
            Vodi
          </Link>
        </div>

        {/* Hamburger Sidebar */}
        <div
          ref={menuRef}
          className={`fixed top-0 left-0 h-full bg-black text-white z-50 transition-all duration-300 p-6 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ width: window.innerWidth < 768 ? '70%' : '20%' }}
        >
          <div className="flex flex-col space-y-6">
            <Link to="/" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/movies" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Movies</Link>
            <Link to="/blog" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Blog</Link>
          </div>
        </div>

        {/* Links & Search & Profile */}
        <div className="flex items-center space-x-6">
          {/* Nav Links */}
          <div className="hidden md:flex space-x-12">
            <Link to="/" className="hover:text-gray-400">Home</Link>
            <Link to="/movies" className="hover:text-gray-400">Movies</Link>
            <Link to="/blog" className="hover:text-gray-400">Blog</Link>
          </div>

          {/* Search */}
          <div className="relative">
            {/* Mobile: Only icon visible */}
            <button onClick={toggleMobileSearch} className="md:hidden">
              <FaSearch className="text-gray-400" />
            </button>

            {/* Desktop: Full search bar */}
            <div className="hidden md:block">
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-600"
              />
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-1 hover:text-gray-400 focus:outline-none"
            >
              <div className="bg-gray-700 p-2 rounded-full">
                <FaUser size={18} />
              </div>
              <FaChevronDown size={12} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-5 w-40 bg-white text-black rounded shadow-lg">
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-700">Log In</Link>
                <Link to="/register" className="block px-4 py-2 hover:bg-gray-700">Register</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Expanded Search */}
      {mobileSearchOpen && (
        <div className="md:hidden bg-black px-4 pb-4 pt-2 fixed top-[68px] w-full z-40">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-full border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
          />
        </div>
      )}
    </>
  );
}
