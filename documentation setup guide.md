Project Setup Guide on GitHub

This guide explains how to review, navigate, and run the backend application directly from GitHub resources.

---

## 1. Repository Location
The project source code is hosted at:
https://github.com/zazux3/LibrarySite

This repository contains backend logic, routes, authentication middleware, controllers, and configuration files.

---

## 2. Main Code Structure
Key folders and their purpose:

 /routes  
Contains API route definitions.  
Example routes:
- userRoutes.js
- bookRoutes.js
- infoRoutes.js 

/controllers  
Contains functions executed when routes are hit.

/middleware  
Contains reusable validation and error handlers.

/models  
Contains database schema definitions.

/config  
Contains database configuration files.

Info Route  
File added:  
routes/infoRoutes.js

Purpose:
- Provides /api/info endpoint
- Shows application status, version, and uptime
- Helps testers check backend without logging in

Pull request reference:
*PR #2 - "add info routes feature"*

---

## 4. How to Track Updates in GitHub
You can verify work through:

### ✔ Pull Requests  
Example:
- “add info routes feature” → merged into main

### ✔ Commit History  
Shows detailed changes and their authors

To view:
Click *Code → Commits*

---

## 5. How to Validate Project
From GitHub you can:

Check routes exist  
Navigate to /routes folder
Confirm files and logic  
Example validation:
Personal contribution file exists → infoRoutes.js
Confirm documentation inclusion  
This file helps evaluation and onboarding


## 6. Why This Document Matters
This guide is provided to:

✔ Help the professor evaluate contribution  
✔ Show where new features were added  
✔ Make backend easier to review  
✔ Support other team members during final submission

---
