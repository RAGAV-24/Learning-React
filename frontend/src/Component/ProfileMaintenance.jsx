// Updated frontend code for ProfileMaintenance.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from './SideBar';

const ProfileMaintenance = () => {
  // Initial state for user profile
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bio: '',
    profilePicture: null,
    skills: [],
  });
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from API
  // In your useEffect for fetching profile
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        // Handle not authenticated case
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'x-auth-token': token
        }
      };

      // Use the correct API URL
      const res = await axios.get('http://localhost:8000/api/profile', config);

      // Ensure all fields have fallback values
      setProfile({
        firstName: res.data.firstName || '',
        lastName: res.data.lastName || '',
        email: res.data.email || '',
        phone: res.data.phone || '',
        address: res.data.address || '',
        city: res.data.city || '',
        state: res.data.state || '',
        zipCode: res.data.zipCode || '',
        bio: res.data.bio || '',
        profilePicture: res.data.profilePicture || null,
        skills: res.data.skills || [],
      });

      // Set preview image if exists
      if (res.data.profilePicture) {
        setPreviewImage(res.data.profilePicture);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setNotification({
        show: true,
        message: 'Error loading profile data',
        type: 'error'
      });
      setLoading(false);

      // Set empty profile with default values to prevent undefined errors
      setProfile({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        bio: '',
        profilePicture: null,
        skills: [], // Ensure this is an empty array to avoid the map error
      });
    }
  };

  fetchProfile();
}, []);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle profile picture upload
  const handlePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePicture: file,
      }));

      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a new skill
  const addSkill = () => {
    if (newSkill.trim() !== '' && !profile.skills.includes(newSkill.trim())) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        skills: [...prevProfile.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  // Remove a skill
  const removeSkill = (skill) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: prevProfile.skills.filter((s) => s !== skill),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setNotification({
        show: true,
        message: 'You must be logged in to update your profile',
        type: 'error'
      });
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    };

    try {
      // First update the text data with the correct API URL
      const profileData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        zipCode: profile.zipCode,
        bio: profile.bio,
        skills: profile.skills
      };

      await axios.post('http://localhost:8000/api/profile', profileData, config);

      // Then upload the profile picture if it's a File object (not just a URL)
      if (profile.profilePicture && profile.profilePicture instanceof File) {
        const formData = new FormData();
        formData.append('profilePicture', profile.profilePicture);

        const uploadConfig = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token
          }
        };

        const pictureRes = await axios.post('http://localhost:8000/api/profile/upload', formData, uploadConfig);

        setProfile(prev => ({
          ...prev,
          profilePicture: pictureRes.data.profilePicture
        }));
      }

      setIsEditing(false);
      setNotification({
        show: true,
        message: 'Profile updated successfully!',
        type: 'success',
      });

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setNotification({
        show: true,
        message: err.response?.data?.msg || 'Error updating profile',
        type: 'error'
      });
    }
  };
   if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="h-screen flex ">
      <SideBar />
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg flex-1">
        {notification.show && (
          <div className={`p-4 mb-4 rounded-md ${
            notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {notification.message}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile Maintenance</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-md ${
              isEditing ? 'bg-gray-500 text-white' : 'bg-blue-600 text-white'
            }`}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="flex flex-col items-center mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-2 bg-gray-200 flex items-center justify-center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                )}
              </div>
              {isEditing && (
                <div>
                  <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                    Change Profile Picture
                  </label>
                  <input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handlePictureChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={profile.city}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={profile.state}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
              />
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={profile.zipCode}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              value={profile.bio}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
            ></textarea>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Skills</label>
            <div className="mt-2 flex flex-wrap gap-2">
            {(profile.skills || []).map((skill) => (
  <div
    key={skill}
    className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
  >
    {skill}
    {isEditing && (
      <button
        type="button"
        onClick={() => removeSkill(skill)}
        className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
      >
        &times;
      </button>
    )}
  </div>
))}
            </div>

            {isEditing && (
              <div className="mt-2 flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="flex-grow rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add
                </button>
              </div>
            )}
          </div>

          {isEditing && (
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileMaintenance;