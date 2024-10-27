import React from 'react';
import { Upload } from 'lucide-react';

const CreateCourses = () => {
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50 h-dvh overflow-y-scroll">
      <div className="max-w-7xl mx-auto">
        {/* Header - Stack on mobile, row on tablet+ */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-semibold">Create new course</h1>
          <button className="w-full sm:w-auto px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700">
            Preview
          </button>
        </div>

        {/* Main Grid Layout - Single column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Main Content Area - Full width on mobile, 2 columns on desktop */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Course Information Section */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Course Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Introduction to Data Analysis"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
                
                {/* Category and Level - Stack on mobile, grid on tablet+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Chapter</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                      <option>Data Management</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Level</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                      <option>Basic</option>
                      <option>Medium</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Description</label>
                  <textarea
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="e.g. Do you offer 1 on 1 calls?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="e.g. Yes at a fixed cost per call"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons - Stack on mobile, row on tablet+ */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="w-full sm:w-auto px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 order-2 sm:order-1">
                Save As Draft
              </button>
              <button className="w-full sm:w-auto px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 order-1 sm:order-2">
                Save & Continue
              </button>
            </div>
          </div>

          {/* Sidebar Content - Media Uploads */}
          <div className="space-y-4 md:space-y-6">
            {/* Cover Image Upload */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Cover Image</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-8 text-center min-h-40 sm:min-h-56 flex flex-col items-center justify-center">
                <Upload className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-gray-400" />
                <button className="text-purple-600 hover:text-purple-700">Upload</button>
              </div>
            </div>

            {/* Sales Video Upload */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Sales Video</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-8 text-center min-h-32 sm:min-h-44 flex flex-col items-center justify-center">
                <Upload className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-gray-400" />
                <button className="text-purple-600 hover:text-purple-700">Upload</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourses;