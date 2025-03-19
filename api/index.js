import app from "../backend/server"; // Import your Express app
import { createServer } from "@vercel/node"; // Vercel's serverless adapter

export default createServer(app); // Export the app as a serverless function