import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile, changePassword } from '../services/api';

function Profile() {
  const [profile, setProfile] = useState({
    name: '', email: '', phone: '', location: '', skills: ''
  });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setProfile(response.data);
    } catch (err) {
      console.error('Failed to load profile');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(profile);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await changePassword(oldPassword, newPassword);
      setMessage('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      setMessage(err.response?.data || 'Failed to change password');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Profile</h2>

      {message && (
        <div className="bg-indigo-50 text-indigo-700 px-4 py-3 rounded-lg
                        mb-4 text-sm flex justify-between items-center">
          {message}
          <button onClick={() => setMessage('')} className="font-bold text-lg">
            ×
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100
                dark:border-gray-700 rounded-2xl p-6 shadow-sm">
  <h3 className="font-bold text-gray-700 dark:text-white mb-4
                 flex items-center gap-2">
    👤 Update Profile</h3>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200
                             focus:outline-none focus:ring-2 focus:ring-indigo-500
                             focus:border-transparent transition"
                  value={profile.name || ''}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200
                             focus:outline-none focus:ring-2 focus:ring-indigo-500
                             focus:border-transparent transition"
                  value={profile.email || ''}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200
                             focus:outline-none focus:ring-2 focus:ring-indigo-500
                             focus:border-transparent transition"
                  placeholder="Phone number"
                  value={profile.phone || ''}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200
                             focus:outline-none focus:ring-2 focus:ring-indigo-500
                             focus:border-transparent transition"
                  placeholder="Your city"
                  value={profile.location || ''}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills
                <span className="text-gray-400 font-normal ml-1">
                  (comma separated)
                </span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-indigo-500
                           focus:border-transparent transition"
                placeholder="Java, Spring Boot, MySQL"
                value={profile.skills || ''}
                onChange={(e) => setProfile({...profile, skills: e.target.value})}
              />
              {/* Skills Preview */}
              {profile.skills && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.skills.split(',').map((skill, i) => (
                    <span key={i}
      className="bg-indigo-50 dark:bg-gray-800 text-indigo-600
                 dark:text-indigo-400 text-xs px-3 py-1
                 rounded-full font-medium">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
  type="submit"
  disabled={loading}
  className="bg-gradient-to-r from-blue-500 to-purple-600
             hover:from-blue-600 hover:to-purple-700
             active:from-blue-700 active:to-purple-800
             text-white px-6 py-3 rounded-xl font-medium
             transition hover:shadow-lg hover:scale-105 duration-200
             disabled:opacity-50 disabled:cursor-not-allowed
             disabled:hover:scale-100">
  {loading ? 'Saving...' : 'Save Profile'}
</button>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100
                dark:border-gray-700 rounded-2xl p-6 shadow-sm">
  <h3 className="font-bold text-gray-700 dark:text-white mb-4
                 flex items-center gap-2">
    🔒 Change Password</h3>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700
                  dark:text-gray-300 mb-1">
                  Old Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200
                             focus:outline-none focus:ring-2 focus:ring-indigo-500
                             focus:border-transparent transition"
                  placeholder="Current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                 className="w-full px-4 py-3 rounded-xl border border-gray-200
           dark:border-gray-600 dark:bg-gray-800 dark:text-white
           focus:outline-none focus:ring-2 focus:ring-indigo-500
           focus:border-transparent transition"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <button
  type="submit"
  className="bg-gradient-to-r from-rose-400 to-red-500
             hover:from-rose-500 hover:to-red-600
             active:from-rose-600 active:to-red-700
             text-white px-6 py-3 rounded-xl font-medium
             transition hover:shadow-lg hover:scale-105 duration-200">
  Change Password
</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;