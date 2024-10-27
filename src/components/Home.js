import React from 'react';
import { Camera, Video, AtSign, Heart, MessageSquare } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <h1 className="text-xl font-semibold p-4 border-b">Friends.</h1>
        <div className="p-4">
          <input
            type="text"
            placeholder="Search for friends, group, pages"
            className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Create Post Section */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
          <input
            type="text"
            placeholder="What on your mind?"
            className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex justify-between items-center pt-2 border-t">
          <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md">
            <Camera className="w-5 h-5" />
            <span className="hidden sm:inline">Photo</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md">
            <Video className="w-5 h-5" />
            <span className="hidden sm:inline">Video</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md">
            <AtSign className="w-5 h-5" />
            <span className="hidden sm:inline">Mention</span>
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {/* Single Post */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div>
                <h3 className="font-medium">John Carel</h3>
                <p className="text-sm text-gray-500">A few ago</p>
              </div>
            </div>
            
            <div className="mb-4">
              <img 
                src="/api/placeholder/600/400" 
                alt="Birthday celebration" 
                className="w-full h-auto rounded-lg"
              />
            </div>

            <div className="flex items-center space-x-4 text-gray-500">
              <button className="flex items-center space-x-2 hover:text-purple-500">
                <Heart className="w-5 h-5" />
                <span>12</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-purple-500">
                <MessageSquare className="w-5 h-5" />
                <span>6</span>
              </button>
            </div>
          </div>

          <div className="px-4 py-3 border-t">
            <button className="text-gray-600 hover:text-purple-500 text-sm">
              See All Comments (6)
            </button>
          </div>
        </div>
      </div>

      {/* Birthday Section - Only visible on larger screens */}
      <div className="hidden lg:block fixed right-4 top-4 w-64 space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-full">
              🎂
            </div>
            <div>
              <h3 className="font-medium">Happy Birthday</h3>
              <p className="text-sm text-gray-500">Mia, Jane</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-full">
              🎂
            </div>
            <div>
              <h3 className="font-medium">Happy Birthday</h3>
              <p className="text-sm text-gray-500">Sarah, Mia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;