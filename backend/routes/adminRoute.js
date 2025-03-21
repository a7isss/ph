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

// Add console logs for debugging in the login route
adminRouter.post("/login", (req, res, next) => {
  next(); // Pass the request to the loginAdmin controller
}, loginAdmin);

adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.get("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailablity);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

// Add DELETE route for deleting a doctor
adminRouter.delete("/delete-doctor/:id", authAdmin, (req, res, next) => {
  console.log("DELETE /delete-doctor/:id route hit"); // Debugging
  next();
}, deleteDoctor);

export default adminRouter;