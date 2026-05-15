import React, { useState, useEffect } from 'react';
import { getSavedJobs, unsaveJob, applyForJob } from '../services/api';

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    setLoading(true);
    try {
      const response = await getSavedJobs();
      setSavedJobs(response.data);
    } catch (err) {
      console.error('Failed to load saved jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (jobId) => {
    try {
      await unsaveJob(jobId);
      setMessage('Job removed from saved list');
      fetchSavedJobs();
    } catch (err) {
      setMessage('Failed to remove job');
    }
  };

  const handleApply = async (jobId) => {
    try {
      await applyForJob(jobId, 'I am interested in this position');
      setMessage('Applied successfully!');
    } catch (err) {
      setMessage(err.response?.data || 'Failed to apply');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Saved Jobs</h2>

      {message && (
        <div className="bg-indigo-50 text-indigo-700 px-4 py-3 rounded-lg
                        mb-4 text-sm flex justify-between items-center">
          {message}
          <button onClick={() => setMessage('')} className="font-bold text-lg">
            ×
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      )}

      {savedJobs.length === 0 && !loading && (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">🔖</p>
          <p className="text-gray-500">No saved jobs yet.</p>
          <p className="text-gray-400 text-sm">
            Save jobs from All Jobs tab!
          </p>
        </div>
      )}

      <div className="space-y-4">
        {savedJobs.map(saved => (
          <div key={saved.id}
     className="bg-white dark:bg-gray-900 border border-gray-100
                dark:border-gray-700 rounded-2xl p-6
                shadow-sm hover:shadow-md transition duration-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {saved.job?.title}
                </h3>
                <p className="text-indigo-600 font-medium">
                  {saved.job?.company}
                </p>
              </div>
              <span className="bg-indigo-100 dark:bg-gray-800 text-indigo-700
                 dark:text-indigo-400 text-xs px-3 py-1
                 rounded-full font-medium">
                {saved.job?.jobType?.replace('_', ' ')}
              </span>
            </div>

            <div className="flex gap-4 text-sm text-gray-500 mb-3">
  <span className="flex items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-400"
         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243
               a8 8 0 1111.314 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
    {saved.job?.location}
  </span>
  <span className="flex items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-400"
     viewBox="0 0 24 24" fill="currentColor">
  <path d="M13.66 7H15a1 1 0 000-2H9a1 1 0 000 2h1.07A3 3 0 0112.83 9H9a1 1 0 000
           2h3.66a3 3 0 01-2.59 1.5H9a1 1 0 00-.7 1.71l4.5 4.5a1 1 0 001.42-1.42
           L11.08 14A5 5 0 0015 11h.07a1 1 0 00-.07-2H15a1 1 0 000-2h-1.34z"/>
</svg>
    {saved.job?.salary}
  </span>
</div>

            {saved.job?.skillsRequired && (
              <div className="flex flex-wrap gap-2 mb-4">
                {saved.job.skillsRequired.split(',').map((skill, i) => (
                 <span key={i}
      className="bg-gray-100 dark:bg-gray-800 text-gray-600
                 dark:text-gray-400 text-xs px-3 py-1 rounded-full">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            )}
<div className="flex gap-3 mt-2">
  <button
    onClick={() => handleApply(saved.job?.id)}
    className="bg-gradient-to-r from-blue-500 to-purple-600
               hover:from-blue-600 hover:to-purple-700
               active:from-blue-700 active:to-purple-800
               text-white px-5 py-2 rounded-lg text-sm font-medium
               transition hover:shadow-lg hover:scale-105 duration-200 mr-2">
    Apply Now
  </button>
  <button
    onClick={() => handleUnsave(saved.job?.id)}
    className="bg-gradient-to-r from-orange-400 to-red-500
               hover:from-orange-500 hover:to-red-600
               active:from-orange-600 active:to-red-700
               text-white px-5 py-2 rounded-lg text-sm font-medium
               transition hover:shadow-lg hover:scale-105 duration-200">
    Remove
  </button>
</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedJobs;