const express = require("express");
const env = require("dotenv");
const { connectMongoDB } = require("./config/db");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/error");

const app = express();

app.use(express.json());

env.config();

connectMongoDB();

app.use(
  cors({
    origin: "https://mern-stack-tech-courses-frontend.vercel.app",
  })
);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/courses", require("./routes/courseRoutes"));

app.use("/api/reviews", require("./routes/reviewRoutes"));

app.use("/api/lessons", require("./routes/lessonRoutes"));

app.use("/api/categories", require("./routes/categoryRoutes"));

// error handler middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
