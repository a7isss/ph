import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors({
  origin: [
    'https://ph-hpgz.vercel.app/', // Replace with your actual frontend URL
    'https://ph-lr89.vercel.app/'    // Replace with your actual admin URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies and authorization headers
}));

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

const PORT = process.env.PORT || 4001; // Use 4001 if 4000 is in use
app.listen(PORT, () => {
  console.log(`Server started on PORT:${PORT}`);
});