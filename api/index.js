import app from "../backend/server"; // Import your Express app
import { createServer } from "@vercel/node"; // Vercel's serverless adapter

module.exports = createServer(app); // Export the app as a serverless function