import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostJob from '../components/PostJob';
import MyJobs from '../components/MyJobs';
import { getMyJobs } from '../services/api';
import ThemeToggle from '../components/ThemeToggle';

const Icons = {
  jobs: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9
               a2 2 0 00-2-2z"/>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    </svg>
  ),
  post: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 4v16m8-8H4"/>
    </svg>
  ),
  logout: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6
               a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
    </svg>
  ),
};

function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState('myjobs');
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const jobs = await getMyJobs();
      setStats({
        totalJobs: jobs.data.length,
        totalApplications: 0
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
    { id: 'myjobs',  label: 'My Jobs',     icon: Icons.jobs },
    { id: 'postjob', label: 'Post New Job', icon: Icons.post },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-800">

      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-900 shadow-lg flex
                      flex-col fixed h-full z-20 border-r border-gray-200
                      dark:border-gray-700">

        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="text-white w-10 h-10 rounded-xl flex
                            items-center justify-center font-bold"
                 style={{background:
                   'linear-gradient(135deg,#0d9488,#2dd4bf)'}}>
              JP
            </div>
            <div>
              <h1 className="font-bold text-gray-800 dark:text-white">
                Job Portal
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Recruiter
              </p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700
                        bg-teal-50 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="text-white w-10 h-10 rounded-full flex
                            items-center justify-center font-bold text-sm"
                 style={{background:
                   'linear-gradient(135deg,#0d9488,#2dd4bf)'}}>
              {name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-white
                            text-sm">
                {name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400
                            truncate w-36">
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
              style={activeTab === tab.id
                ? {background:
                    'linear-gradient(135deg,#0d9488,#2dd4bf)'}
                : {}}
              className={`w-full flex items-center gap-3 px-4 py-3
                          rounded-xl text-sm font-medium transition
                          duration-200 text-left
                          ${activeTab === tab.id
                            ? 'text-white shadow-md'
                            : 'text-gray-500 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-gray-800 hover:text-teal-600 dark:hover:text-white'
                          }`}>
              <span className={activeTab === tab.id
                ? 'text-white' : 'text-teal-500 dark:text-teal-300'}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Info Card */}
        <div className="p-4 mx-4 mb-4 bg-teal-50 dark:bg-gray-800
                        rounded-xl">
          <p className="text-xs text-teal-600 font-semibold mb-1">
            Recruiter Account
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Post jobs and manage applications
          </p>
        </div>

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
      <div className="flex-1 ml-64 min-h-screen bg-gray-50
                      dark:bg-gray-800">

        {/* Gradient Header */}
        <div className="px-8 py-6"
             style={{background:
               'linear-gradient(135deg,#134e4a,#0d9488)'}}>

          {/* Welcome Row */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Good day, {name}! 👋
              </h2>
              <p className="text-sm" style={{color: '#99f6e4'}}>
                Manage your job postings
              </p>
            </div>

            {/* Tab label + Theme Toggle */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2
                              rounded-xl"
                   style={{background: 'rgba(255,255,255,0.2)'}}>
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
          <div className="grid grid-cols-2 gap-4">

            {/* Jobs Posted */}
            <div className="rounded-2xl p-4 cursor-pointer
                            transition duration-200"
                 style={{background: 'rgba(255,255,255,0.15)'}}
                 onMouseEnter={e =>
                   e.currentTarget.style.background =
                     'rgba(255,255,255,0.25)'}
                 onMouseLeave={e =>
                   e.currentTarget.style.background =
                     'rgba(255,255,255,0.15)'}
                 onClick={() => setActiveTab('myjobs')}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl"
                     style={{background: 'rgba(255,255,255,0.2)'}}>
                  <svg xmlns="http://www.w3.org/2000/svg"
                       className="w-5 h-5 text-white" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor"
                       strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16
                             a2 2 0 002-2V9a2 2 0 00-2-2z"/>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-xl">
                    {stats.totalJobs}
                  </p>
                  <p className="text-xs" style={{color: '#99f6e4'}}>
                    Jobs Posted
                  </p>
                </div>
              </div>
            </div>

            {/* Post New Job */}
            <div className="rounded-2xl p-4 cursor-pointer transition duration-200"
     style={{background: 'rgba(255,255,255,0.15)'}}
     onMouseEnter={e =>
       e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
     onMouseLeave={e =>
       e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
     onClick={() => setActiveTab('postjob')}>
  <div className="flex items-center gap-3">
    <div className="p-2 rounded-xl"
         style={{background: 'rgba(255,255,255,0.2)'}}>
      <svg xmlns="http://www.w3.org/2000/svg"
           className="w-5 h-5 text-white" fill="none"
           viewBox="0 0 24 24" stroke="currentColor"
           strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 4v16m8-8H4"/>
      </svg>
    </div>
    <div>
      <p className="text-white font-medium text-sm">Post New Job</p>
    </div>
  </div>
</div>

          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-w-5xl mx-auto">
          {activeTab === 'myjobs'  && <MyJobs />}
          {activeTab === 'postjob' && <PostJob />}
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;