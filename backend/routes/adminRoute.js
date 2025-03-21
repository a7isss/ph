import express from 'express';
import {
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  addDoctor,
  allDoctors,
  adminDashboard,
} from '../controllers/adminController.js';
import { changeAvailablity, deleteDoctor } from '../controllers/doctorController.js'; // Import deleteDoctor
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';

const adminRouter = express.Router();

// Debugging: Log route registration
console.log("Admin routes initialized");

// Login route
adminRouter.post("/login", (req, res, next) => {
  console.log("POST /login route hit"); // Debugging
  next(); // Pass the request to the loginAdmin controller
}, loginAdmin);

// Add doctor route
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), (req, res, next) => {
  console.log("POST /add-doctor route hit"); // Debugging
  next();
}, addDoctor);

// Get all appointments route
adminRouter.get("/appointments", authAdmin, (req, res, next) => {
  console.log("GET /appointments route hit"); // Debugging
  next();
}, appointmentsAdmin);

// Cancel appointment route
adminRouter.post("/cancel-appointment", authAdmin, (req, res, next) => {
  console.log("POST /cancel-appointment route hit"); // Debugging
  next();
}, appointmentCancel);

// Get all doctors route
adminRouter.get("/all-doctors", authAdmin, (req, res, next) => {
  console.log("GET /all-doctors route hit"); // Debugging
  next();
}, allDoctors);

// Change availability route
adminRouter.post("/change-availability", authAdmin, (req, res, next) => {
  console.log("POST /change-availability route hit"); // Debugging
  next();
}, changeAvailablity);

// Admin dashboard route
adminRouter.get("/dashboard", authAdmin, (req, res, next) => {
  console.log("GET /dashboard route hit"); // Debugging
  next();
}, adminDashboard);

// Delete doctor route
adminRouter.delete("/delete-doctor/:id", authAdmin, (req, res, next) => {
  console.log("DELETE /delete-doctor/:id route hit"); // Debugging
  next();
}, deleteDoctor);

export default adminRouter;