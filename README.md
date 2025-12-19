# BlogHubb – Full Stack Blog Application

BlogHubb is a full-stack blogging platform where users can sign up, log in, create posts, like and comment on posts, and browse detailed blog content.  
This project includes both the **React frontend** and the **Node/Express + MongoDB backend** in a single repository.

> Original inspiration and structure from [BlogHubb](https://github.com/krishna23810/BlogHubb).

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Starts the React app in development mode at `http://localhost:3000`.

### `npm run server`

Runs the backend server in development mode from the `server` folder:

```bash
cd server && npm run dev
```

### `npm run dev`

Runs both the **client** and **server** in development using `concurrently`:

- `client`: `npm start`
- `server`: `npm run server`

### `npm run build`

Builds the React app for production to the `build` folder. It bundles React in production mode and optimizes the build for best performance.

### `npm test`

Launches the test runner for the frontend in watch mode.

You can also run backend tests (if added) from the `server` folder:

```bash
cd server
npm test
```

---

## Tech Stack

- **Frontend**
  - React (Create React App)
  - React Router (`react-router-dom`)
  - React Hook Form (`react-hook-form`)
  - Axios (via centralized `apiConnector`)
  - React Hot Toast

- **Backend**
  - Node.js
  - Express
  - MongoDB + Mongoose
  - JWT (`jsonwebtoken`)
  - Bcrypt (`bcrypt`)
  - Cloudinary (`cloudinary`)
  - File upload (`express-fileupload`)
  - Cookies (`cookie-parser`)
  - CORS (`cors`)

---

## Project Structure

```text
.
├── public/                 # CRA static assets
├── src/                    # React frontend source
│   ├── apiconnector.js     # Axios instance & helper
│   ├── App.js              # Routes definition
│   ├── components/
│   │   └── userSeterForm.jsx
│   ├── pages/
│   │   ├── home.jsx
│   │   ├── deshboard.jsx
│   │   ├── detailpage.jsx
│   │   ├── CreatePostPage.jsx
│   │   ├── login.jsx
│   │   └── signup.jsx
│   └── ...
├── server/                 # Backend API
│   ├── config/
│   │   └── dbconnector.js  # Mongo connection
│   ├── controller/
│   │   ├── userHandler.js
│   │   ├── postHandler.js
│   │   ├── commentHandler.js
│   │   └── likeHandler.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── user.js
│   │   ├── post.js
│   │   ├── comments.js
│   │   ├── likes.js
│   │   └── validation.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── postRoutes.js
│   │   ├── commentRoutes.js
│   │   └── likeRoutes.js
│   ├── imageUploder.js
│   ├── server.js
│   └── vercel.json
├── package.json            # Root (frontend + dev scripts)
├── server/package.json     # Backend dependencies & scripts
├── tailwind.config.js
└── README.md
```

---

## Environment Variables

Create a `.env` file (usually in the `server` folder) with:

```env
PORT=3000                           # or any free port
HOST=<your_mongodb_connection_uri>  # MongoDB URI
JWT_SECRET=<your_jwt_secret>

FRONTEND_URL=http://localhost:3000  # React dev server URL

Cloudname=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

NODE_ENV=development
```

For the frontend, create a `.env` file in the project root with:

```env
REACT_APP_API_URL=http://localhost:3000/api/v1
```

Make sure:

- `REACT_APP_API_URL` points to the backend URL (with `/api/v1` prefix).
- `FRONTEND_URL` matches where the frontend is actually running (for CORS).

---

## Running the App

### Development

From the project root:

```bash
# install dependencies
npm install

# install backend dependencies
cd server
npm install
cd ..

# run both client & server
npm run dev
```

Or run separately:

```bash
# frontend only
npm start

# backend only
cd server
npm run dev
```

### Production Build

```bash
npm run build
```

This creates an optimized production build of the React app in the `build/` folder.

To run the backend in production:

```bash
cd server
npm start
```

---

## Frontend Routes

Defined in `src/App.js`:

- `/` – Home page (all posts)
- `/deshboard` – Dashboard page
- `/signup` – User registration
- `/login` – User login
- `/post/:id` – Post detail page
- `/create` – Create new post

---

## API Overview

All backend routes are prefixed with `/api/v1` (configured in `server/server.js`):

- **Users**: `/api/v1/users`
- **Posts**: `/api/v1/posts`
- **Comments**: `/api/v1/comments`
- **Likes**: `/api/v1/likes`

Check `server/routes/*.js` and `server/controller/*.js` for exact handlers.

---

## Deployment

You can deploy:

- **Frontend** – using the `build/` folder on platforms like Vercel or Netlify.
- **Backend** – on platforms like Render, Railway, or Vercel (there is a `vercel.json` under `server/`).

Remember to:

- Set all necessary environment variables on the hosting provider.
- Update `REACT_APP_API_URL` in the frontend to point to the deployed backend.
- Update `FRONTEND_URL` for the backend to point to the deployed frontend URL.

---

## License

This project is intended for learning and demonstration.  
Feel free to adapt and extend it for your own use.
