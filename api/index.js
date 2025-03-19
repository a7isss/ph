import { createServer } from "@vercel/node"; // Vercel's serverless adapter

// Dynamically import the ESM module
const appPromise = import("../backend/server.js").then((module) => module.default);

export default async function handler(req, res) {
  const app = await appPromise; // Wait for the Express app to load
  const server = createServer(app); // Create the server
  return server(req, res); // Handle the request
}