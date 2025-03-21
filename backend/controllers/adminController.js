// Import necessary modules
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// Other admin functions...

// API to delete a doctor
const deleteDoctorAdmin = async (req, res) => {
    try {
        const { id } = req.params; // Get doctor ID from the route parameter

        // Find the doctor by ID
        const doctor = await doctorModel.findById(id);

        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        // Delete the doctor
        await doctorModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Doctor deleted successfully" });
    } catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Export all admin functions
export {
    loginAdmin,
    appointmentsAdmin,
    appointmentCancel,
    addDoctor,
    allDoctors,
    adminDashboard,
    deleteDoctorAdmin // Export the new function
};