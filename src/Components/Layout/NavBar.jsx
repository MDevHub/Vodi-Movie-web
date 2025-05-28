import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaSearch, FaUser, FaChevronDown } from 'react-icons/fa';

const API_KEY = 'dc22c3c06d3bd543d80a04a985a39485';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const menuRef = useRef();
  const dropdownRef = useRef();
  const searchRef = useRef();
  const navigate = useNavigate();

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    const fetchResults = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
            searchQuery
          )}&page=1&include_adult=false`
        );
        const data = await res.json();
        if (data.results) {
          setSearchResults(data.results.slice(0, 8)); // limit results
        }
      } catch (error) {
        console.error('Search error:', error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleResultClick = (id) => {
    setSearchResults([]);
    setSearchQuery('');
    navigate(`/watch/${id}`);
    setMobileSearchOpen(false);
  };

  return (
    <>
      <nav className="bg-black text-white p-4 flex items-center justify-between px-[6vw] fixed top-0 w-full z-50">
        <div className="flex items-center space-x-4">
          <button aria-label="Menu" onClick={toggleMenu}>
            <FaBars size={17} className="text-gray-100" />
          </button>
          <Link to="/home" className="text-3xl font-bold font-poppins">
            Vodi
          </Link>
        </div>

        <div
          ref={menuRef}
          className={`fixed top-0 left-0 h-full bg-black text-white z-50 transition-all duration-300 p-6 transform ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ width: window.innerWidth < 768 ? '70%' : '20%' }}
        >
          <div className="flex flex-col space-y-6">
            <Link to="/home" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/blog" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-12">
            <Link to="/home" className="hover:text-gray-400">
              Home
            </Link>
            <Link to="/blog" className="hover:text-gray-400">
              Blog
            </Link>
          </div>

          <div className="relative" ref={searchRef}>
            <button onClick={toggleMobileSearch} className="md:hidden">
              <FaSearch className="text-gray-400" />
            </button>

            <div className="hidden md:block">
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchResults.length > 0 && (
                <div
                  className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto bg-black text-white rounded shadow-lg scrollbar-none"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style>
                    {`
                      .scrollbar-none::-webkit-scrollbar {
                        display: none;
                      }
                    `}
                  </style>
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer truncate"
                      onClick={() => handleResultClick(result.id)}
                      title={result.title || result.name}
                    >
                      {result.title || result.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
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
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-700">
                  Log In
                </Link>
                <Link to="/register" className="block px-4 py-2 hover:bg-gray-700">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {mobileSearchOpen && (
        <div className="md:hidden bg-black px-4 pb-4 pt-2 fixed top-[68px] w-full z-40">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-full border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div
              className="mt-2 max-h-60 overflow-y-auto bg-black text-white rounded shadow-lg scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>
                {`
                  .scrollbar-none::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer truncate"
                  onClick={() => {
                    handleResultClick(result.id);
                    setMobileSearchOpen(false);
                  }}
                  title={result.title || result.name}
                >
                  {result.title || result.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
