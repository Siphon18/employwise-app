EmployWise Front End Assignment
A React application that integrates with the Reqres API to perform basic user management functions: Login, List Users, Edit Users, Delete Users, and Update User Avatars (simulated). The application features a modern UI using Tailwind CSS.

Table of Contents
Features

Prerequisites

Getting Started

Installation

Running Locally

Project Structure

Usage

Login

Users List

Edit User

Delete User

Avatar Updates

Scripts

Additional Notes

License

Features
Login Page

Uses POST /api/login from Reqres.

Email: eve.holt@reqres.in

Password: cityslicka

Stores token in localStorage.

Private Routes

Users can only access /users or /edit/:id if they have a valid token in localStorage.

Otherwise, they are redirected to the /login page.

List All Users

Fetches paginated user data from GET /api/users?page={page}.

Displays first name, last name, and avatar.

Pagination buttons to move between pages.

Edit User

Uses PUT /api/users/{id} to simulate updates.

Allows changing first name, last name, email, and avatar (locally).

Delete User

Uses DELETE /api/users/{id} to remove a user.

Updates local state to reflect deletion immediately.

Modern UI

Built with Tailwind CSS for a responsive and clean design.

Password visibility toggle (eye icon) on the login page.

Subtle animations and hover effects.

Prerequisites
Node.js (v14 or higher recommended)

npm or yarn (for package management)

Getting Started
Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/employwise-app.git
cd employwise-app
Install dependencies:

bash
Copy
Edit
npm install
or

bash
Copy
Edit
yarn
Configure Tailwind CSS (if not already done):

Check that tailwind.config.js has the correct content paths (e.g., ./src/**/*.{js,jsx,ts,tsx}).

Verify that @tailwind base; @tailwind components; @tailwind utilities; are added to src/index.css.

Running Locally
Start the development server:

bash
Copy
Edit
npm start
This should open the app in your browser at http://localhost:3000.

Project Structure
pgsql
Copy
Edit
employwise-app/
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── index.html
└── src/
    ├── App.js
    ├── index.js
    ├── index.css
    └── components/
        ├── Login.js
        ├── UsersList.js
        └── EditUser.js
App.js: Defines the main routes and private route logic.

Login.js: Handles user authentication and token storage.

UsersList.js: Displays a paginated list of users and handles deletion.

EditUser.js: Allows editing user details and changing avatar.

Usage
Login
Navigate to /login.

Enter the email: eve.holt@reqres.in and password: cityslicka.

Upon success, the token is stored in localStorage and you’re redirected to /users.

Users List
Lists users in a responsive grid.

Each user shows an avatar, name, and buttons to Edit or Delete.

Pagination controls to move between pages.

Edit User
Updates user details via PUT /api/users/{id}.

Change First Name, Last Name, Email, and Avatar.

Avatar Update is simulated locally; the new avatar is stored in localStorage and displayed on the Users List page.

Delete User
Removes a user via DELETE /api/users/{id}.

The user is also removed from the local state to update the UI immediately.

Avatar Updates
Since Reqres doesn’t store avatars, we save the updated avatar in localStorage.

If a user has a locally updated avatar, it overrides the default one from the API.

Scripts
npm start: Starts the development server on http://localhost:3000.

npm run build: Builds the application for production.

npm test: Runs any tests (if configured).

Additional Notes
Token Expiration: Reqres tokens do not expire by default. If you want to handle expiration, you’ll need to implement custom logic.

Hosting: You can deploy this project to services like Vercel, Netlify, or Heroku.

License
This project is open-source for demonstration and educational purposes. Use it as a reference or a starting point for your own projects.

