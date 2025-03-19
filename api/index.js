import { createServer } from "@vercel/node"; // Vercel's serverless adapter

const appPromise = import("../backend/server.js").then((module) => module.default);

export default async function handler(req, res) {
  const app = await appPromise;
  const server = createServer(app);
  return server(req, res);
}