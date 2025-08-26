// api/index.js
const app = require("../app"); // Import your Express app
const serverless = require("serverless-http"); // Wrapper for Vercel

module.exports = (req, res) => {
  const handler = serverless(app);
  return handler(req, res);
};
