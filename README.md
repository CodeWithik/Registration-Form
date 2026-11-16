# Student Registration System

A beginner-friendly full-stack project using React, Express, Node.js, MongoDB Atlas and Vercel.

## Features
- Student registration form: name, email, phone and course
- Express API with basic server-side validation
- MongoDB Atlas storage
- Duplicate email protection
- Vercel serverless API deployment

## 1. Requirements
- Node.js LTS and npm
- MongoDB Atlas account
- Git and a GitHub account
- Vercel account

## 2. Install and run locally

```bash
npm install
```

Copy `.env.example` to `.env` and replace the sample connection string with your MongoDB Atlas connection string:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/student_registration?retryWrites=true&w=majority
PORT=5000
```

Do not commit `.env` to GitHub. If your password contains special characters, URL-encode them.

Start the frontend and backend:

```bash
npm run dev
```

Open http://localhost:5173

The Vite development server forwards `/api` requests to Express on port 5000.

## 3. MongoDB Atlas setup
1. Create a free cluster in MongoDB Atlas.
2. In Database Access, create a database user and password.
3. In Network Access, add the IP address of the machine running the backend for local testing.
4. Choose Connect > Drivers and copy the Node.js connection string.
5. Put the connection string in `.env` as `MONGODB_URI`.
6. The database `student_registration` and `students` collection are created when the first registration is saved.

For a quick classroom test only, Atlas Network Access can temporarily use `0.0.0.0/0`. This permits connection attempts from any public IP; it does not replace database authentication. Restrict access for production wherever possible.

## 4. Deploy to Vercel
1. Push the complete project to a GitHub repository.
2. Sign in to Vercel and choose Add New > Project.
3. Import the GitHub repository.
4. Keep the project root as the repository root.
5. Vercel should detect Vite. Build command: `npm run build`; output directory: `dist`.
6. In Vercel Project Settings > Environment Variables, add:
   - Name: `MONGODB_URI`
   - Value: your complete Atlas connection string
   - Environment: Production (also add Preview if needed)
7. Deploy, or redeploy after adding the environment variable.

The `api/index.js` file exposes the Express app as a Vercel Function. `vercel.json` routes `/api/*` requests to that function. The React app calls `/api/students` using a relative URL, so it works on the same Vercel domain.

## 5. Test the API
Open:

`https://YOUR-VERCEL-DOMAIN/api/health`

Expected response:

```json
{
  "success": true,
  "message": "Student Registration API is running."
}
```

Then submit the registration form. Check Atlas > Database > Browse Collections > `student_registration` > `students`.

## Project structure

```text
student-registration-system/
├── api/
│   └── index.js
├── server/
│   ├── models/
│   │   └── Student.js
│   ├── app.js
│   ├── db.js
│   └── index.js
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

## Packages used
- `react`, `react-dom`: frontend
- `express`: backend API
- `dotenv`: load local `.env` variables during development
- `mongoose`: MongoDB object modelling
- `vite`, `@vitejs/plugin-react`: frontend development/build
- `nodemon`: restart local backend during development
- `concurrently`: run frontend and backend together

## Important
- Never put `MONGODB_URI` in React code or any `VITE_` variable.
- Never upload `.env` to GitHub.
- Do not use `0.0.0.0/0` as a permanent production security setting.
- This is a learning starter project, not a production-ready admissions platform. Add authentication, rate limiting, stronger validation and privacy controls before real student-data use.
