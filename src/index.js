const app = require("./app");
const { initDb } = require("./db");

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await initDb();

    app.listen(port, "0.0.0.0", () => {
      console.log(`API running inside container on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start API:", error);
    process.exit(1);
  }
}

startServer();