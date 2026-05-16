import React, { useState } from 'react';
import { uploadResume, downloadResume, deleteResume } from '../services/api';

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a PDF file first');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    try {
      await uploadResume(formData);
      setMessage('Resume uploaded successfully!');
    } catch (err) {
      setMessage('Failed to upload resume. Only PDF allowed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await downloadResume();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setMessage('No resume found. Please upload first.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteResume();
      setMessage('Resume deleted successfully!');
      setFile(null);
    } catch (err) {
      setMessage('Failed to delete resume');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Resume</h2>

      {message && (
        <div className="bg-indigo-50 text-indigo-700 px-4 py-3 rounded-lg
                        mb-4 text-sm flex justify-between items-center">
          {message}
          <button onClick={() => setMessage('')} className="font-bold text-lg">
            ×
          </button>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 border border-gray-100
                dark:border-gray-700 rounded-2xl p-8 shadow-sm">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-indigo-200 dark:border-gray-600
                rounded-2xl p-10 text-center mb-6 hover:border-indigo-400
                transition duration-200">
          <p className="text-5xl mb-3">📄</p>
          <p className="text-gray-600 dark:text-gray-300 font-medium mb-1">
  Upload your Resume</p>
<p className="text-gray-400 dark:text-gray-500 text-sm mb-4">
  PDF files only</p>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            id="resume-input"
          />
          <label
            htmlFor="resume-input"
            className="bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600
text-black dark:text-white
border border-gray-300 dark:border-gray-600
shadow-sm
                       px-6 py-2 rounded-lg text-sm font-medium
                       cursor-pointer transition">
            Choose File
          </label>
          {file && (
            <p className="mt-3 text-sm text-green-600 font-medium">
              ✓ {file.name} selected
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
  onClick={handleUpload}
  disabled={loading}
  className="bg-gradient-to-r from-blue-500 to-purple-600
             hover:from-blue-600 hover:to-purple-700
             active:from-blue-700 active:to-purple-800
             text-white px-6 py-3 rounded-xl font-medium
             transition hover:shadow-lg hover:scale-105 duration-200
             disabled:opacity-50 disabled:cursor-not-allowed
             disabled:hover:scale-100 flex items-center gap-2">
  {loading ? 'Uploading...' : '⬆️ Upload Resume'}
</button>
<button
  onClick={handleDownload}
  className="bg-gradient-to-r from-teal-400 to-green-500
             hover:from-teal-500 hover:to-green-600
             active:from-teal-600 active:to-green-700
             text-white px-6 py-3 rounded-xl font-medium
             transition hover:shadow-lg hover:scale-105 duration-200
             flex items-center gap-2">
  ⬇️ Download Resume
</button>
<button
  onClick={handleDelete}
  className="bg-gradient-to-r from-rose-500 to-red-600
             hover:from-rose-600 hover:to-red-700
             active:from-rose-700 active:to-red-800
             text-white px-6 py-3 rounded-xl font-medium
             transition hover:shadow-lg hover:scale-105 duration-200
             flex items-center gap-2">
  🗑️ Delete Resume
</button>
        </div>
      </div>
    </div>
  );
}

export default ResumeUpload;