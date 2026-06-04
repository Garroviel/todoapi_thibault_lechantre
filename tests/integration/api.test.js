const request = require("supertest");
const app = require("../../src/app");
const { pool, initDb } = require("../../src/db");

beforeAll(async () => {
  await initDb();
  await pool.query("DELETE FROM tasks");
});

afterAll(async () => {
  await pool.end();
});

test("GET /health returns ok", async () => {
  const response = await request(app).get("/health");

  expect(response.statusCode).toBe(200);
  expect(response.body.status).toBe("ok");
});

test("POST /api/tasks creates a task", async () => {
  const response = await request(app)
    .post("/api/tasks")
    .send({
      title: "Integration test",
      description: "Create task from test",
      status: "todo",
    });

  expect(response.statusCode).toBe(201);
  expect(response.body.id).toBeDefined();
  expect(response.body.title).toBe("Integration test");
  expect(response.body.status).toBe("todo");
});

test("GET /api/tasks lists tasks", async () => {
  const response = await request(app).get("/api/tasks");

  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body.length).toBeGreaterThanOrEqual(1);
});