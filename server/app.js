import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

// to import routes files to make route
import userRoutes from './routes/user.routes.js'
import feedbackRoutes from './routes/feedback.routes.js'
import certificateRoutes from './routes/certificate.routes.js'
import servicesRoutes from './routes/services.routes.js'
import teamRoutes from './routes/team.routes.js'
import testimonialRoutes from './routes/testimonial.routes.js'
import resultRoutes from './routes/result.routes.js'
import quizRoutes from './routes/quiz.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js';
import careerRoutes from './routes/career.routes.js'
import applicationRoutes from './routes/application.routes.js';
dotenv.config()

const app = express();
app.use(cookieParser());
// Configure CORS to allow credentials (cookies) from the frontend


app.use(
    cors({
        origin: [process.env.PORTAL_PORT, process.env.ADMIN_PORT, "http://localhost:5173/"],

        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// to connect DB 
connectDB();
//  to check route;
app.use('/api', userRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', certificateRoutes);
app.use('/api', servicesRoutes)
app.use('/api', teamRoutes)
app.use('/api', testimonialRoutes);
app.use('/api', resultRoutes);
app.use('/api', quizRoutes)
app.use('/api', dashboardRoutes);
app.use('/api', careerRoutes);
app.use('/api', applicationRoutes);

app.get('/', (req, res) => {
    res.send("Backend API is running");
})




const PORT = process.env.PORT || 5000;



// to create a server
app.listen(5000, "0.0.0.0", () => {
    console.log("Server running on http://localhost:5000");
});