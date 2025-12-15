const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { uploadImage } = require('./imageUploder');
const app = express();

const dbconect = require("./config/dbconnector");
dbconect();

require('dotenv').config();


const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: 'http://localhost:3001', // your React app URL
    credentials: true
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));
uploadImage();

const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/likes", likeRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/users", userRoutes);
 
app.get("/", (request, response) => {
    response.send(`<h1> this is  home page</h1>`);
});

// Only start a listener locally; on Vercel we export the app as a handler.
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${process.env.PORT || PORT}`);
    });
}

module.exports = app;

