// Import necessary modules
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// Other admin functions...
// API to add a new doctor
const addDoctor = async (req, res) => {
    try {
        const { name, specialty, email, password } = req.body;

        // Validate input
        if (!name || !specialty || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if the email is already in use
        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ success: false, message: "Doctor with this email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new doctor
        const newDoctor = await doctorModel.create({
            name,
            specialty,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ success: true, message: "Doctor added successfully", doctor: newDoctor });
    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
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
    addDoctor, // Ensure this is included
    allDoctors,
    adminDashboard,
    deleteDoctorAdmin
};