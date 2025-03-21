// Import necessary modules
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// API to log in an admin
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Find the admin by email
        const admin = await userModel.findOne({ email, role: "admin" });

        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error("Error logging in admin:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

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

// API to cancel an appointment
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        // Validate input
        if (!appointmentId) {
            return res.status(400).json({ success: false, message: "Appointment ID is required" });
        }

        // Find the appointment by ID
        const appointment = await appointmentModel.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        // Cancel the appointment
        await appointmentModel.findByIdAndDelete(appointmentId);

        res.status(200).json({ success: true, message: "Appointment canceled successfully" });
    } catch (error) {
        console.error("Error canceling appointment:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// API to delete a doctor
const deleteDoctor = async (req, res) => {
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

// API to get all appointments
const appointmentsAdmin = async (req, res) => {
    try {
        // Fetch all appointments from the database
        const appointments = await appointmentModel.find();

        res.status(200).json({
            success: true,
            data: appointments,
        });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Admin dashboard function
const adminDashboard = async (req, res) => {
    try {
        // Example: Fetch some statistics or data for the admin dashboard
        const totalDoctors = await doctorModel.countDocuments();
        const totalAppointments = await appointmentModel.countDocuments();
        const totalUsers = await userModel.countDocuments();

        res.status(200).json({
            success: true,
            data: {
                totalDoctors,
                totalAppointments,
                totalUsers,
            },
        });
    } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// API to get all doctors
const allDoctors = async (req, res) => {
    try {
        // Fetch all doctors from the database
        const doctors = await doctorModel.find();

        res.status(200).json({
            success: true,
            data: doctors,
        });
    } catch (error) {
        console.error("Error fetching all doctors:", error);
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
    deleteDoctor
};