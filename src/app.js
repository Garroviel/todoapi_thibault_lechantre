const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const taskRoutes = require("./routes/tasks");
const errorHandler = require("./middleware/errorHandler");
const { client, httpRequests } = require("./monitoring");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequests.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });
  });

  next();
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

app.get("/config", (req, res) => {
  const port = process.env.PORT || 3000;
  const apiKey = process.env.API_KEY;
  const environment = process.env.NODE_ENV || "development";

  res.json({
    port,
    hasApiKey: !!apiKey,
    environment,
    message: `Running in ${environment} mode`,
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

module.exports = app;