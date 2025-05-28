import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <div>
      <footer className="bg-black text-white lg:py-10 px-[6vw]">
        {/* Logo and Social Row */}
        <div className="hidden lg:flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold font-poppins">CineMa</h1>
          <div className="flex space-x-6 ">
            <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
              <FaFacebook size={20} />
              <span>Facebook</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
              <FaTwitter size={20} />
              <span>Twitter</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
              <FaInstagram size={20} />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="hidden lg:border-gray-700 mb-6" />

        {/* Quick Links */}
        <div className='hidden lg:flex gap-44'>
          <div>
            <h2 className="text-xl font-semibold mb-5 text-gray-400">Movie Categories</h2>
            <ul className=" flex gap-32">
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-400 hover:text-white">Action</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Adventure</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Animation</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Comedy</Link></li>
              </ul>

              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-400 hover:text-white">Action</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Adventure</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Animation</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Comedy</Link></li>
              </ul>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-5 text-gray-400">Tv Series</h2>
            <ul className=" flex gap-32">
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-400 hover:text-white">Valentine Day</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Underrated Comedies</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Scary TV Series</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Best 2018 Documentaries</Link></li>
              </ul>

              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-400 hover:text-white">Classic Shows</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Reality TV Shows</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Original Shows</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Suprise of the Year Shows</Link></li>
              </ul>
            </ul>
          </div>
        </div>
      </footer>
      <div className='py-4 bg-black '>
        {/* Copyright */}
        <p className="text-center text-gray-500 text-sm">&copy; {new Date().getFullYear()} CineMa. All rights reserved.</p>
      </div>
    </div>
  );
}
