import React, { useState } from 'react';
import { createJob } from '../services/api';

function PostJob() {
  const [formData, setFormData] = useState({
    title: '', description: '', company: '',
    location: '', salary: '', experienceRequired: '',
    skillsRequired: '', jobType: 'FULL_TIME'
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createJob(formData);
      setMessage('Job posted successfully! Candidates will be notified.');
      setFormData({
        title: '', description: '', company: '',
        location: '', salary: '', experienceRequired: '',
        skillsRequired: '', jobType: 'FULL_TIME'
      });
    } catch (err) {
      setMessage(err.response?.data || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Post New Job</h2>

      {message && (
        <div className="bg-emerald-50 text-emerald-700 px-4 py-3 rounded-lg
                        mb-4 text-sm flex justify-between items-center">
          {message}
          <button onClick={() => setMessage('')} className="font-bold text-lg">
            ×
          </button>
        </div>
      )}

     <div className="bg-white dark:bg-gray-900 border border-gray-100
                dark:border-gray-700 rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                className="w-full px-4 py-3 rounded-xl border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-emerald-500
                           focus:border-transparent transition"
                placeholder="eg: Java Developer"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                name="company"
                className="w-full px-4 py-3 rounded-xl border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-emerald-500
                           focus:border-transparent transition"
                placeholder="eg: TCS"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              className="w-full px-4 py-3 rounded-xl border border-gray-200
                         focus:outline-none focus:ring-2 focus:ring-emerald-500
                         focus:border-transparent transition"
              placeholder="Job description..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                className="w-full px-4 py-3 rounded-xl border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-emerald-500
                           focus:border-transparent transition"
                placeholder="eg: Bangalore"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                className="w-full px-4 py-3 rounded-xl border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-emerald-500
                           focus:border-transparent transition"
                placeholder="eg: 5-8 LPA"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience Required
              </label>
              <input
                type="text"
                name="experienceRequired"
                className="w-full px-4 py-3 rounded-xl border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-emerald-500
                           focus:border-transparent transition"
                placeholder="eg: 2-3 years"
                value={formData.experienceRequired}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <select
                name="jobType"
                className="w-full px-4 py-3 rounded-xl border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-emerald-500
                           focus:border-transparent transition"
                value={formData.jobType}
                onChange={handleChange}>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills Required
            </label>
            <input
              type="text"
              name="skillsRequired"
              className="w-full px-4 py-3 rounded-xl border border-gray-200
                         focus:outline-none focus:ring-2 focus:ring-emerald-500
                         focus:border-transparent transition"
              placeholder="eg: Java, Spring Boot, MySQL"
              value={formData.skillsRequired}
              onChange={handleChange}
            />
            {formData.skillsRequired && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skillsRequired.split(',').map((skill, i) => (
                 <span key={i}
      className="bg-blue-50 dark:bg-gray-800 text-blue-500
                 dark:text-blue-400 text-xs px-3 py-1
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
 className="w-full bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500
           hover:from-teal-600 hover:via-cyan-600 hover:to-emerald-600
           active:from-teal-700 active:via-cyan-700 active:to-emerald-700
           text-white py-3 rounded-xl font-semibold
           transition hover:shadow-lg hover:scale-105 duration-200
           disabled:opacity-50 disabled:cursor-not-allowed
           disabled:hover:scale-100">
{loading ? (
  'Posting...'
) : (
  <span className="flex items-center justify-center gap-2">
    <span className="text-inherit text-lg font-semibold">+</span>
    Post Job
  </span>
)}
</button>
        </form>
      </div>
    </div>
  );
}

export default PostJob;