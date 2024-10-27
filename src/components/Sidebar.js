import React, { useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Settings, User, HelpCircle, LogOut, X, Album, FilePlus2 } from 'lucide-react';
import LogoutModal from './Modals/LogoutModals';

const Sidebar = forwardRef(({ isOpen, toggleSidebar }, ref) => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const handleLogoutClick = () => setShowLogoutPopup(true);

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, text: 'Home' , to:"/home"},
    { icon: <BookOpen className="w-5 h-5" />, text: 'My Courses', to:"/my-courses" },
    { icon: <FilePlus2 className="w-5 h-5" />, text: 'Create Courses', to:"/create-courses" },
    { icon: <User className="w-5 h-5" />, text: 'Profile', to: "/profile" },
    { icon: <Settings className="w-5 h-5" />, text: 'Settings', to: "/settings" },
  ];

  return (
    <>
      <div
        ref={ref}
        className={`w-64 min-h-screen bg-white border-r border-gray-200 px-4 py-6 fixed md:relative transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 top-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className='flex flex-col justify-between h-full '>
          <div>
            <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-purple-600">
            <Album className="w-8 h-8" />
            <span className="text-2xl font-bold tracking-wide">COURSE</span>
          </div>
          {isOpen && 
          (<div onClick={toggleSidebar}>
            <span className="text-xl font-semibold">
            <X className="w-5 h-5" />
            </span>
          </div>
          )}
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              onClick={toggleSidebar}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {item.icon}
              <span>{item.text}</span>
            </Link>
          ))}
        </nav>
          </div>

        <div className="mt-auto pt-8 space-y-2">
          <Link
            to="/help"
            onClick={toggleSidebar}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
          </Link>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={handleLogoutClick}
          >
            <LogOut className="w-5 h-5" />
            <span>Sign out</span>
          </button>
        </div>
        </div>
      </div>

      {showLogoutPopup && (
        <LogoutModal show={showLogoutPopup} setShowLogoutPopup={setShowLogoutPopup} />
      )}
    </>
  );
});

export default Sidebar;
