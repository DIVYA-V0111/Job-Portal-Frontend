import React, { useState, useEffect } from 'react';
import { getMyApplications } from '../services/api';

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await getMyApplications();
      setApplications(response.data);
    } catch (err) {
      console.error('Failed to load applications');
    } finally {
      setLoading(false);
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
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Applications</h2>

      {loading && (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      )}

      {applications.length === 0 && !loading && (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">📋</p>
          <p className="text-gray-500">No applications yet.</p>
          <p className="text-gray-400 text-sm">
            Go to All Jobs and apply for jobs!
          </p>
        </div>
      )}

      <div className="space-y-4">
        {applications.map(app => (
          <div key={app.id}
     className="bg-white dark:bg-gray-900 border border-gray-100
                dark:border-gray-700 rounded-2xl p-6
                shadow-sm hover:shadow-md transition duration-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {app.job?.title}
                </h3>
                <p className="text-indigo-600 font-medium">{app.job?.company}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium
                               ${statusColors[app.status]}`}>
                {app.status}
              </span>
            </div>

           <div className="flex gap-4 text-sm text-gray-500 mb-3">
  <span className="flex items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-400"
         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243
               a8 8 0 1111.314 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
    {app.job?.location}
  </span>
  <span className="flex items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-400"
         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7
               a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
    </svg>
    Applied: {new Date(app.appliedDate).toLocaleDateString()}
  </span>
</div>

            {app.coverLetter && (
             <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3
                text-sm text-gray-600 dark:text-gray-400 italic">
                "{app.coverLetter}"
              </div>
            )}

            {/* Status Timeline */}
            <div className="mt-4 flex gap-2 flex-wrap">
              {['PENDING','SCREENING','SHORTLISTED',
                'INTERVIEWING','SELECTED'].map((s) => (
                <div key={s}
     className={`text-xs px-3 py-1 rounded-full font-medium
       ${app.status === s
         ? statusColors[s]
         : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                  {s}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyApplications;