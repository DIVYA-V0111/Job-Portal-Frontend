import React, { useState, useEffect } from 'react';
import { getMyJobs, deleteJob, getJobApplications,
         updateApplicationStatus } from '../services/api';

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobApplications, setSelectedJobApplications] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    setLoading(true);
    try {
      const response = await getMyJobs();
      setJobs(response.data);
    } catch (err) {
      setMessage('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(jobId);
        setMessage('Job deleted successfully');
        fetchMyJobs();
      } catch (err) {
        setMessage('Failed to delete job');
      }
    }
  };

  const handleViewApplications = async (jobId) => {
    if (selectedJobId === jobId) {
      setSelectedJobId(null);
      setSelectedJobApplications([]);
      return;
    }
    try {
      const response = await getJobApplications(jobId);
      setSelectedJobApplications(response.data);
      setSelectedJobId(jobId);
    } catch (err) {
      setMessage('Failed to load applications');
    }
  };

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);
      setMessage('Status updated! Candidate notified via email.');
      handleViewApplications(selectedJobId);
    } catch (err) {
      setMessage('Failed to update status');
    }
  };

  const statusColors = {
    PENDING:      'bg-yellow-100 text-yellow-700',
    SCREENING:    'bg-blue-100 text-blue-700',
    SHORTLISTED:  'bg-indigo-100 text-indigo-700',
    INTERVIEWING: 'bg-purple-100 text-purple-700',
    SELECTED:     'bg-green-100 text-green-700',
    REJECTED:     'bg-red-100 text-red-700',
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Posted Jobs</h2>

      {message && (
        <div className="bg-emerald-50 text-emerald-700 px-4 py-3 rounded-lg
                        mb-4 text-sm flex justify-between items-center">
          {message}
          <button onClick={() => setMessage('')} className="font-bold text-lg">×</button>
        </div>
      )}

      {loading && (
        <div className="text-center py-8 text-gray-500">Loading jobs...</div>
      )}

      {jobs.length === 0 && !loading && (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">💼</p>
          <p className="text-gray-500">No jobs posted yet.</p>
          <p className="text-gray-400 text-sm">Click Post New Job to get started!</p>
        </div>
      )}

      <div className="space-y-4">
        {jobs.map(job => (
          <div key={job.id}
     className="bg-white dark:bg-gray-900 border border-gray-100
                dark:border-gray-700 rounded-2xl p-6 shadow-sm
                hover:shadow-md transition duration-200">
            {/* Job Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
  {job.title}</h3>
                <p className="text-emerald-600 font-medium">{job.company}</p>
              </div>
              <span className="bg-blue-100 text-blue-600 text-xs
                 px-3 py-1 rounded-full font-medium">
                {job.jobType?.replace('_', ' ')}
              </span>
            </div>

            {/* Job Details */}
            <div className="flex gap-4 text-sm text-gray-500 mb-3">
  <span className="flex items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-400"
         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243
               a8 8 0 1111.314 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
    {job.location}
  </span>
 <span className="flex items-center gap-1">
   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-400"
     viewBox="0 0 24 24" fill="currentColor">
  <path d="M13.66 7H15a1 1 0 000-2H9a1 1 0 000 2h1.07A3 3 0 0112.83 9H9a1 1 0 000
           2h3.66a3 3 0 01-2.59 1.5H9a1 1 0 00-.7 1.71l4.5 4.5a1 1 0 001.42-1.42
           L11.08 14A5 5 0 0015 11h.07a1 1 0 00-.07-2H15a1 1 0 000-2h-1.34z"/>
</svg>
    {job.salary}
  </span>
</div>

            {/* Skills */}
            {job.skillsRequired && (
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skillsRequired.split(',').map((skill, i) => (
                  <span key={i}
      className="bg-gray-100 dark:bg-gray-800 text-gray-600
                 dark:text-gray-400 text-xs px-3 py-1 rounded-full">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            )}
{/* Buttons */}
<div className="flex gap-3 mt-2">
  <button
    onClick={() => handleViewApplications(job.id)}
    className="bg-gradient-to-r from-teal-500 to-cyan-500
               hover:from-teal-600 hover:to-cyan-600
               active:from-teal-700 active:to-cyan-700
               text-white px-4 py-2 rounded-lg text-sm font-medium
               transition hover:shadow-lg hover:scale-105 duration-200 mr-2">
    {selectedJobId === job.id ? 'Hide Applications' : 'View Applications'}
  </button>

  <button
  onClick={() => handleDelete(job.id)}
  className="bg-gradient-to-r from-slate-500 to-slate-600
             hover:from-slate-600 hover:to-slate-700
             active:from-slate-700 active:to-slate-800
             text-white px-4 py-2 rounded-lg text-sm font-medium
             transition hover:shadow-lg hover:scale-105 duration-200">
  Delete Job
</button>
</div>

            {/* Applications Section */}
            {selectedJobId === job.id && (
              <div className="mt-5 border-t border-gray-100 pt-5">
                <h4 className="font-semibold text-gray-700 mb-3">
                  Applications ({selectedJobApplications.length})
                </h4>

                {selectedJobApplications.length === 0 && (
                  <div className="text-center py-6 bg-gray-50 rounded-xl">
                    <p className="text-gray-400 text-sm">No applications yet</p>
                  </div>
                )}

                <div className="space-y-3">
                  {selectedJobApplications.map(app => (
                    <div key={app.id}
                        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex
                justify-between items-start">
                      <div className="flex-1">
                        {/* Candidate Info */}
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-indigo-600 text-white w-9 h-9
                                          rounded-full flex items-center
                                          justify-center font-bold text-sm">
                            {app.candidate?.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white text-sm">
                              {app.candidate?.name}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {app.candidate?.email}
                            </p>
                          </div>
                        </div>

                        {/* Cover Letter */}
                       <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 italic">
                          "{app.coverLetter}"
                        </p>

                        {/* Status Badge */}
                        <span className={`text-xs px-3 py-1 rounded-full
                                         font-medium ${statusColors[app.status]}`}>
                          {app.status}
                        </span>
                      </div>

                      {/* Status Dropdown */}
                      <div className="ml-4">
                        <label className="block text-xs text-gray-500 mb-1">
                          Update Status
                        </label>
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleStatusUpdate(app.id, e.target.value)}
                          className="text-sm border border-gray-200 dark:border-gray-600
           rounded-lg px-3 py-2 focus:outline-none
           focus:ring-2 focus:ring-indigo-500
           bg-white dark:bg-gray-700 dark:text-white
           cursor-pointer">
                          <option value="PENDING">Pending</option>
                          <option value="SCREENING">Screening</option>
                          <option value="SHORTLISTED">Shortlisted</option>
                          <option value="INTERVIEWING">Interviewing</option>
                          <option value="SELECTED">Selected</option>
                          <option value="REJECTED">Rejected</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyJobs;