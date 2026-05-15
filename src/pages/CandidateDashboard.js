import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JobList from '../components/JobList';
import MyApplications from '../components/MyApplications';
import SavedJobs from '../components/SavedJobs';
import Profile from '../components/Profile';
import RecommendedJobs from '../components/RecommendedJobs';
import ResumeUpload from '../components/ResumeUpload';
import { getAllJobs, getMyApplications,
         getSavedJobs, getRecommendedJobs } from '../services/api';
import ThemeToggle from '../components/ThemeToggle';

const Icons = {
  jobs: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    </svg>
  ),
  recommended: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806
               3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806
               3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946
               3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946
               3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806
               3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806
               3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946
               3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946
               3.42 3.42 0 013.138-3.138z"/>
    </svg>
  ),
  applications: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7
               a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2
               M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
    </svg>
  ),
  saved: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
    </svg>
  ),
  resume: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414
               A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 13h6M9 17h4"/>
    </svg>
  ),
  profile: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0z
               M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  ),
  logout: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7
               m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7
               a3 3 0 013-3h4a3 3 0 013 3v1"/>
    </svg>
  ),
};

function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState('jobs');
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  const [stats, setStats] = useState({
    totalJobs: 0,
    appliedJobs: 0,
    savedJobs: 0,
    recommendedJobs: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [jobs, applications, saved] = await Promise.all([
        getAllJobs(0, 100),
        getMyApplications(),
        getSavedJobs(),
      ]);
      let recommendedCount = 0;
      try {
        const recommended = await getRecommendedJobs();
        recommendedCount = recommended.data.length;
      } catch (err) {
        recommendedCount = 0;
      }
      setStats({
        totalJobs: jobs.data.totalElements,
        appliedJobs: applications.data.length,
        savedJobs: saved.data.length,
        recommendedJobs: recommendedCount
      });
    } catch (err) {
      console.error('Failed to load stats');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const tabs = [
    { id: 'jobs',         label: 'All Jobs',        icon: Icons.jobs },
    { id: 'recommended',  label: 'Recommended',     icon: Icons.recommended },
    { id: 'applications', label: 'My Applications', icon: Icons.applications },
    { id: 'saved',        label: 'Saved Jobs',       icon: Icons.saved },
    { id: 'resume',       label: 'My Resume',        icon: Icons.resume },
    { id: 'profile',      label: 'Profile',          icon: Icons.profile },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
<div className="w-64 bg-white dark:bg-gray-900 shadow-lg flex flex-col
                fixed h-full z-20 border-r border-gray-100
                dark:border-gray-700">

  {/* Logo */}
  <div className="p-6 border-b border-gray-100 dark:border-gray-700">
    <div className="flex items-center gap-3">
      <div className="bg-indigo-600 text-white w-10 h-10 rounded-xl
                      flex items-center justify-center font-bold">
        JP
      </div>
      <div>
        <h1 className="font-bold text-gray-800 dark:text-white">
          Job Portal
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Candidate
        </p>
      </div>
    </div>
  </div>

  {/* User Info */}
  <div className="p-4 border-b border-gray-100 dark:border-gray-700
                  bg-indigo-50 dark:bg-gray-800">
    <div className="flex items-center gap-3">
      <div className="bg-indigo-600 text-white w-10 h-10 rounded-full
                      flex items-center justify-center font-bold text-sm">
        {name?.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className="font-semibold text-gray-800 dark:text-white text-sm">
          {name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-36">
          {email}
        </p>
      </div>
    </div>
  </div>

  

  {/* Navigation */}
  <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    text-sm font-medium transition duration-200 text-left
                    ${activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600'
                    }`}>
        <span className={activeTab === tab.id
          ? 'text-white' : 'text-indigo-400'}>
          {tab.icon}
        </span>
        {tab.label}
      </button>
    ))}
  </nav>

  {/* Logout */}
  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
  <button
    onClick={handleLogout}
    className="w-full flex items-center gap-3 px-4 py-3
               rounded-xl text-sm font-medium
               text-gray-700 dark:text-gray-300
               hover:bg-gray-100 dark:hover:bg-gray-800
               transition duration-200">
    <span className="text-gray-700 dark:text-gray-300">{Icons.logout}</span>
    Logout
  </button>
</div>
</div>

      {/* Main Content */}
<div className="flex-1 ml-64 min-h-screen bg-gray-50 dark:bg-gray-800">

        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600
                        to-blue-500 px-8 py-6">

          {/* Welcome Row */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Good day, {name}! 👋
              </h2>
              <p className="text-indigo-200 text-sm">
                Find your dream job today
              </p>
            </div>
            
             {/* Tab label + Theme Toggle */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white bg-opacity-20
                              px-4 py-2 rounded-xl">
                <span className="text-white">
                  {tabs.find(t => t.id === activeTab)?.icon}
                </span>
                <span className="text-white font-medium text-sm">
                  {tabs.find(t => t.id === activeTab)?.label}
                </span>
              </div>
              <ThemeToggle />
            </div>
          
          </div>

          

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4">

            {/* Total Jobs */}
            <div className="bg-white bg-opacity-20 rounded-2xl p-4
                            hover:bg-opacity-30 transition duration-200
                            cursor-pointer"
                 onClick={() => setActiveTab('jobs')}>
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-30 p-2 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg"
                       className="w-5 h-5 text-white" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0
                             002-2V9a2 2 0 00-2-2z"/>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-xl">
                    {stats.totalJobs}
                  </p>
                  <p className="text-indigo-200 text-xs">Total Jobs</p>
                </div>
              </div>
            </div>

            {/* Applied Jobs */}
            <div className="bg-white bg-opacity-20 rounded-2xl p-4
                            hover:bg-opacity-30 transition duration-200
                            cursor-pointer"
                 onClick={() => setActiveTab('applications')}>
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-30 p-2 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg"
                       className="w-5 h-5 text-white" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0
                             002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0
                             002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-xl">
                    {stats.appliedJobs}
                  </p>
                  <p className="text-indigo-200 text-xs">Applied Jobs</p>
                </div>
              </div>
            </div>

            {/* Saved Jobs */}
            <div className="bg-white bg-opacity-20 rounded-2xl p-4
                            hover:bg-opacity-30 transition duration-200
                            cursor-pointer"
                 onClick={() => setActiveTab('saved')}>
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-30 p-2 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg"
                       className="w-5 h-5 text-white" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-xl">
                    {stats.savedJobs}
                  </p>
                  <p className="text-indigo-200 text-xs">Saved Jobs</p>
                </div>
              </div>
            </div>

            {/* Recommended */}
            <div className="bg-white bg-opacity-20 rounded-2xl p-4
                            hover:bg-opacity-30 transition duration-200
                            cursor-pointer"
                 onClick={() => setActiveTab('recommended')}>
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-30 p-2 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg"
                       className="w-5 h-5 text-white" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0
                             001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0
                             001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0
                             00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0
                             00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42
                             0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0
                             00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42
                             0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0
                             00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-xl">
                    {stats.recommendedJobs}
                  </p>
                  <p className="text-indigo-200 text-xs">Recommended</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'jobs'         && <JobList />}
          {activeTab === 'recommended'  && <RecommendedJobs />}
          {activeTab === 'applications' && <MyApplications />}
          {activeTab === 'saved'        && <SavedJobs />}
          {activeTab === 'resume'       && <ResumeUpload />}
          {activeTab === 'profile'      && <Profile />}
        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;