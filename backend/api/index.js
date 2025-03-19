import { createServer } from "@vercel/node"; // Vercel's serverless adapter

// Dynamically import the Express app
const appPromise = import("../backend/server.js").then((module) => module.default);

export default async function handler(req, res) {
  const app = await appPromise; // Wait for the Express app to load
  const server = createServer(app); // Wrap the app in a serverless function
  return server(req, res); // Handle the request
}