# Job-Portal-Frontend

![React](https://img.shields.io/badge/React-18-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8)
![Axios](https://img.shields.io/badge/Axios-Latest-purple)
![ReactRouter](https://img.shields.io/badge/ReactRouter-6-red)

A modern, responsive Job Portal frontend built with React.js and Tailwind CSS.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React.js 18 | Frontend Framework |
| Tailwind CSS | Styling |
| Axios | API Calls |
| React Router DOM | Navigation |
| Context API | Theme Management |

---

## Features

### Candidate
- Register and Login
- Forgot Password with OTP (3 step flow)
- View all jobs with pagination
- Apply for jobs with cover letter
- Save and unsave jobs
- View my applications with status tracking
- Upload, download and delete resume (PDF)
- View recommended jobs based on skills
- Update profile and skills
- Change password
- Dark and Light theme toggle

### Recruiter
- Register and Login
- Post new jobs
- View all posted jobs
- View applications for each job
- Update application status
- Delete jobs
- Email notifications on status change
- Dark and Light theme toggle

---

## Project Structure
job-portal-frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── ForgotPassword.js
│   │   ├── CandidateDashboard.js
│   │   └── RecruiterDashboard.js
│   ├── components/
│   │   ├── JobList.js
│   │   ├── MyApplications.js
│   │   ├── SavedJobs.js
│   │   ├── RecommendedJobs.js
│   │   ├── ResumeUpload.js
│   │   ├── Profile.js
│   │   ├── MyJobs.js
│   │   ├── PostJob.js
│   │   └── ThemeToggle.js
│   ├── services/
│   │   └── api.js
│   ├── context/
│   │   └── ThemeContext.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

---

## Pages and Routes

| Route | Page | Access |
|-------|------|--------|
| / | Login | Public |
| /login | Login | Public |
| /register | Register | Public |
| /forgot-password | Forgot Password | Public |
| /candidate-dashboard | Candidate Dashboard | CANDIDATE only |
| /recruiter-dashboard | Recruiter Dashboard | RECRUITER only |

---

## Application Status Flow
PENDING → SCREENING → SHORTLISTED → INTERVIEWING → SELECTED
→ REJECTED

---

## API Services

All API calls are defined in src/services/api.js

### Auth APIs
loginUser(data)
registerUser(data)
forgotPassword(email)
verifyOtp(email, otp)
resetPassword(email, otp, newPassword)

### Job APIs
getAllJobs(page, size)
getJobById(id)
createJob(data)
updateJob(id, data)
deleteJob(id)
searchJobs(keyword)
getMyJobs()

### Application APIs
applyForJob(jobId, coverLetter)
getMyApplications()
getJobApplications(jobId)
updateApplicationStatus(applicationId, status)

### Resume APIs
uploadResume(formData)
downloadResume()
deleteResume()

### Profile APIs
getProfile()
updateProfile(data)
changePassword(oldPassword, newPassword)

### Saved Job APIs
saveJob(jobId)
unsaveJob(jobId)
getSavedJobs()

### Recommended Job APIs
getRecommendedJobs()

---

## Setup Instructions

### Prerequisites
Node.js v18+
npm v9+
Backend running at http://localhost:8080

### Steps

1. Clone the repository

```bash
git clone https://github.com/DIVYA-V0111/Job-Portal-Frontend.git
```

2. Go into project folder

```bash
cd job-portal-frontend
```

3. Install dependencies
```bash
npm install
```

4. Update API URL in `src/services/api.js`

```js
const API_URL = 'http://localhost:8080/api';
```;

5. Start the application
```bash
npm start
```

6. Open browser at

```text
http://localhost:3000
```

---

## Color Theme

### Candidate Dashboard
Sidebar  → White (light mode) / Dark gray (dark mode)
Header   → Cyan to Blue gradient
Active   → Blue to Purple gradient

### Recruiter Dashboard
Sidebar  → White (light mode) / Dark gray (dark mode)
Header   → Dark Teal to Teal gradient
Active   → Teal gradient

---

## Dark and Light Theme

- Click the moon icon in the header to switch to dark mode
- Click the sun icon to switch back to light mode
- Theme preference is saved in localStorage
- Automatically applied on next visit

---

## Backend Repository
https://github.com/DIVYA-V0111/Job-Portal-Application

Make sure the backend is running before starting the frontend.

---

## Developer
Name   : Divya Venkatesh
Email  : divyavenkatesh91080@gmail.com
GitHub : github.com/DIVYA-V0111

---

## License

This project is built for educational purposes.