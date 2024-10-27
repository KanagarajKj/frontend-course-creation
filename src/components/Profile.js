import React, { useState } from 'react';
import { Camera, Edit2, Save, X } from 'lucide-react';
import { useGetUserByIdQuery } from '../services/userApi';

const Profile = () => {
  const userId = localStorage.getItem("userId");
  // Example user data structure from your query
  const { data: user } = useGetUserByIdQuery(userId, { skip: !userId });

  console.log(user,"user")

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.data?.userData?.userName || '',
    email: user?.data?.userData?.email || '',
    profilePicture: user?.data?.userData?.profilePicture || '/default-avatar.png'
  });
  const [tempProfileData, setTempProfileData] = useState(profileData);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setTempProfileData(prev => ({
          ...prev,
          profilePicture: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to update the profile
      // For now, we'll just update the local state
      setProfileData(tempProfileData);
      setIsEditing(false);
      setImagePreview(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempProfileData(profileData);
    setImagePreview(null);
  };

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-purple-100">
          <div className="bg-purple-50 p-4 flex items-center justify-between">
            <h2 className="text-xl font-medium text-purple-600">Profile Settings</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>

          <div className="p-6 space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-100">
                  <img
                    src={imagePreview || profileData.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-200 transition-colors">
                    <Camera className="w-4 h-4 text-purple-600" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={tempProfileData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700">
                    {profileData.name}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={tempProfileData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="Enter your email address"
                  />
                ) : (
                  <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700">
                    {profileData.email}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Account Status</h3>
                  <p className="text-sm text-gray-500">Your account is currently active</p>
                </div>
                <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;