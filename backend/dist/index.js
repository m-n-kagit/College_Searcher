import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// ----------------------
// Middlewares
// ----------------------
app.use(express.json());
app.use(cookieParser()); // for cookie-based auth
app.use(cors({
    origin: process.env.FRONTEND_URL, // e.g. http://localhost:3000
    credentials: true, // required for cookies
}));
// ----------------------
// Routes
// ----------------------
// import routes from "./routes";
import authRoutes from "./routes/auth.routes";
import collegeRouter from "./routes/college.routes";
import courseRouter from "./routes/course.routes";
import reviewRouter from "./routes/review.routes";
import savedRoutes from './routes/saved.routes';
import compareRoutes from './routes/compare.routes';
import predictorRoutes from './routes/predictor.routes';
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/colleges', collegeRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/saved', savedRoutes);
app.use('/api/v1/compare', compareRoutes);
app.use("/api/v1/predictor", predictorRoutes);
// ----------------------
// Health check route
// ----------------------
app.get("/", (req, res) => {
    res.send("Server is running ");
});
// ----------------------
// Error handler (basic version)
// ----------------------
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: "Internal Server Error",
    });
});
// ----------------------
// Start server
// ----------------------
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export default app;
//# sourceMappingURL=index.js.map