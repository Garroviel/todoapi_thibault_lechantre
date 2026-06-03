const crypto = require("crypto");

function createTask({ title, description, status }) {
  const now = new Date();

  return {
    id: crypto.randomUUID(),
    title: title || null,
    description: description || "",
    status: status || "todo",
    createdAt: now,
    updatedAt: now,
  };
}

module.exports = { createTask };