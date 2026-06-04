const { createTask } = require("../../src/models/task");

test("createTask creates a task with default status", () => {
  const task = createTask({
    title: "Test",
    description: "Unit test task",
  });

  expect(task.id).toBeDefined();
  expect(task.title).toBe("Test");
  expect(task.description).toBe("Unit test task");
  expect(task.status).toBe("todo");
  expect(task.createdAt).toBeDefined();
  expect(task.updatedAt).toBeDefined();
});