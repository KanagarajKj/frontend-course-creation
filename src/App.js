import './App.css';
import './input.css';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './utils/PrivateRoute';
import Auth from './components/Auth';
import Home from './components/Home';
import CreateCourses from './components/CreateCourses';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Help from './components/Help';
import Sidebar from './components/Sidebar';
import { useState, useEffect, useRef } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { ToastContainer } from 'react-toastify';
import GitHubCallback from './components/AuthCallback/Github';
import AuthenticateRoute from './utils/AuthticateRoute';
import MyCourses from './components/MyCourses';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if sidebar should be shown based on the route
  const hideSidebarRoutes = ['/create-courses', '/settings', '/profile', '/help', '/home', '/', '/my-courses']; // Add any other routes where you want to hide the sidebar
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  useEffect(()=> {
    if(!hideSidebarRoutes.includes(location.pathname) && location.pathname !== "/auth") {
      navigate("/home")
    }
  },[]);

  const toggleSidebar = () => {
    setIsOpen(false);
  };

  const openSlidebar = () => {
    setIsOpen(true);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <>
    <ToastContainer />
      {/* Toggle Button with Icon */}
      <button
        className="md:hidden p-2 m-2 bg-primary-600 text-white rounded hover:bg-gray-700"
        onClick={openSlidebar}
      >
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      {
        shouldHideSidebar ? (
        <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} ref={sidebarRef} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className={`flex-grow p-1 ${shouldHideSidebar ? 'flex justify-center items-center' : ''}`}>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<AuthenticateRoute element={<Auth />} />} />
            
            {/* Protected routes */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            <Route path="/create-courses" element={<PrivateRoute element={<CreateCourses />} />} />
            <Route path="/my-courses" element={<PrivateRoute element={<MyCourses />} />} />
            <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/help" element={<PrivateRoute element={<Help />} />} />
            
          </Routes>
        </div>
      </div>
        ) : (
          <div className='w-full'>
            <Routes>
            <Route path="/auth" element={<AuthenticateRoute element={<Auth />} />} />
            <Route path="/auth/github/callback" element={<AuthenticateRoute element={<GitHubCallback />} />} />
          </Routes>
          </div>
        )
      }
      
    </>
  );
}

export default App;
