import React, { useState, useEffect, useCallback } from 'react';
import { getAllJobs, applyForJob, saveJob } from '../services/api';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getAllJobs(page, 5);
      setJobs(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setMessage('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleApply = async (jobId) => {
    try {
      await applyForJob(jobId, 'I am interested in this position');
      setMessage('Applied successfully! Check your email.');
    } catch (err) {
      setMessage(err.response?.data || 'Failed to apply');
    }
  };

  const handleSave = async (jobId) => {
    try {
      await saveJob(jobId);
      setMessage('Job saved successfully!');
    } catch (err) {
      setMessage(err.response?.data || 'Failed to save job');
    }
  };

  const jobTypeColor = {
    FULL_TIME: 'bg-green-100 text-green-700',
    PART_TIME: 'bg-yellow-100 text-yellow-700',
    CONTRACT: 'bg-purple-100 text-purple-700',
    INTERNSHIP: 'bg-blue-100 text-blue-700',
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">All Jobs</h2>

      {message && (
        <div
          className="bg-indigo-50 text-indigo-700 px-4 py-3 rounded-lg
                        mb-4 text-sm flex justify-between"
        >
          {message}
          <button
            onClick={() => setMessage('')}
            className="font-bold"
          >
            ×
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center py-8 text-gray-500">
          Loading jobs...
        </div>
      )}

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border border-gray-100 dark:border-gray-700 rounded-xl p-5
                hover:shadow-md transition duration-200 hover:border-indigo-200
                bg-white dark:bg-gray-900"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {job.title}
                </h3>

                <p className="text-indigo-600 font-medium">
                  {job.company}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium
                               ${jobTypeColor[job.jobType]}`}
              >
                {job.jobType?.replace('_', ' ')}
              </span>
            </div>

            <div className="flex gap-4 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243
               a8 8 0 1111.314 0z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                {job.location}
              </span>

              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-indigo-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.66 7H15a1 1 0 000-2H9a1 1 0 000 2h1.07A3 3 0 0112.83 9H9a1 1 0 000
           2h3.66a3 3 0 01-2.59 1.5H9a1 1 0 00-.7 1.71l4.5 4.5a1 1 0 001.42-1.42
           L11.08 14A5 5 0 0015 11h.07a1 1 0 00-.07-2H15a1 1 0 000-2h-1.34z" />
                </svg>

                {job.salary}
              </span>

              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                {job.experienceRequired}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.skillsRequired?.split(',').map((skill, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => handleApply(job.id)}
                className="bg-gradient-to-r from-blue-500 to-purple-600
               hover:from-blue-600 hover:to-purple-700
               active:from-blue-700 active:to-purple-800
               text-white px-5 py-2 rounded-lg text-sm font-medium
               transition hover:shadow-lg hover:scale-105 duration-200 mr-2"
              >
                Apply Now
              </button>

              <button
                onClick={() => handleSave(job.id)}
                className="border-2 border-purple-500 text-purple-500
               hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600
               hover:text-white hover:border-transparent
               active:from-blue-700 active:to-purple-800
               px-5 py-2 rounded-lg text-sm font-medium
               transition hover:shadow-lg hover:scale-105 duration-200"
              >
                Save Job
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="px-5 py-2.5 rounded-lg
               bg-gradient-to-r from-blue-500 to-purple-600
               hover:from-blue-600 hover:to-purple-700
               text-white text-sm font-medium
               disabled:opacity-40 disabled:cursor-not-allowed
               disabled:from-gray-400 disabled:to-gray-500
               transition shadow-md hover:shadow-lg"
        >
          Previous
        </button>

        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Page {page + 1} of {totalPages}
        </span>

        <button
          disabled={page === totalPages - 1}
          onClick={() => setPage(page + 1)}
          className="px-5 py-2.5 rounded-lg
               bg-gradient-to-r from-blue-500 to-purple-600
               hover:from-blue-600 hover:to-purple-700
               text-white text-sm font-medium
               disabled:opacity-40 disabled:cursor-not-allowed
               disabled:from-gray-400 disabled:to-gray-500
               transition shadow-md hover:shadow-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default JobList;