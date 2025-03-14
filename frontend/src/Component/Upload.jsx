import React, { useState } from 'react';
import SideBar from "./SideBar";

const Upload = () => {
  const [companyName, setCompanyName] = useState('');
  const [year, setYear] = useState('');
  const [experience, setExperience] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!companyName || !year || !experience || !file) {
      setMessage({ text: 'Please fill in all fields', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: 'Uploading...', type: 'info' });

    setTimeout(() => {
      setIsSubmitting(false);
      setMessage({ text: 'Upload successful!', type: 'success' });

      setCompanyName('');
      setYear('');
      setExperience('');
      setFile(null);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar className="w-1/4 min-h-screen bg-gray-900 text-white" />

      {/* Main Content */}
      <div className="w-3/4 bg-white shadow-lg p-8 rounded-lg mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Upload Your Questions</h1>

        {/* Message Notification */}
        {message.text && (
          <div className={`p-4 mb-4 rounded-lg text-center text-lg font-semibold ${
            message.type === 'error' ? 'bg-red-100 text-red-700' :
            message.type === 'success' ? 'bg-green-100 text-green-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="companyName" className="block text-lg font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-lg font-medium text-gray-700 mb-2">
              Year
            </label>
            <input
              id="year"
              type="date"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-lg font-medium text-gray-700 mb-2">
              Tell Your Experience
            </label>
            <textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Describe your experience..."
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
            <label htmlFor="file" className="block text-lg font-medium text-gray-700 mb-2">
              Upload File
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-10 h-10 text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOCX, TXT or other files</p>
                </div>
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {file && (
              <p className="mt-2 text-sm text-gray-700 font-medium">
                Selected file: {file.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Uploading...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
