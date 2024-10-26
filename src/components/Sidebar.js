import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaCog, FaUser, FaQuestionCircle, FaSignOutAlt, FaGithub, FaEnvelope } from 'react-icons/fa';
import LogoutModal from './Modals/LogoutModals';

const Sidebar = React.forwardRef(({ isOpen, toggleSidebar }, ref) => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const handleLogoutClick = () => setShowLogoutPopup(true);

  return (
    <>
      <div
        ref={ref}
        className={`flex flex-col h-screen w-64 bg-primary-50 text-gray-800 p-4 fixed md:relative transition-transform duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0 top-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <h2 className="text-2xl font-bold mb-6">Sidebar</h2>

        {/* Close Button for Mobile View */}
        <button
          className="md:hidden p-2 bg-primary-600 rounded mb-6 text-white font-bold"
          onClick={toggleSidebar}
        >
          Close
        </button>

        {/* Top Links */}
        <ul className="flex-grow space-y-4">
          <li>
            <Link to="/" className="flex items-center hover:text-primary-600" onClick={toggleSidebar}>
              <FaHome className="mr-2" /> Home
            </Link>
          </li>
          <li>
            <Link to="/my-courses" className="flex items-center hover:text-primary-600" onClick={toggleSidebar}>
              <FaBook className="mr-2" /> My Courses
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center hover:text-primary-600" onClick={toggleSidebar}>
              <FaUser className="mr-2" /> Profile
            </Link>
          </li>
          <li>
            <Link to="/help" className="flex items-center hover:text-primary-600" onClick={toggleSidebar}>
              <FaQuestionCircle className="mr-2" /> Help
            </Link>
          </li>
        </ul>

        {/* Bottom Links */}
        <ul className="mt-auto space-y-4">
          <li>
            <Link to="/settings" className="flex items-center hover:text-primary-600" onClick={toggleSidebar}>
              <FaCog className="mr-2" /> Settings
            </Link>
          </li>
          <li>
            <button
              className="flex items-center hover:text-primary-600 w-full text-left"
              onClick={handleLogoutClick}
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </li>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4 text-gray-600 mt-4">
            <a href="mailto:example@gmail.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope className="h-6 w-6 hover:text-primary-600" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub className="h-6 w-6 hover:text-primary-600" />
            </a>
          </div>
        </ul>
      </div>
      {
        showLogoutPopup && (
          <LogoutModal show={showLogoutPopup} setShowLogoutPopup={setShowLogoutPopup}/>
        )
      }
    </>
  );
});

export default Sidebar;
