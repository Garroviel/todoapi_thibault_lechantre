const crypto = require("crypto");

function createTask({ title, description, status }) {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    title: title || "",
    description,
    status: status || "todo",
    createdAt: now,
    updatedAt: now,
  };
}

module.exports = { createTask };