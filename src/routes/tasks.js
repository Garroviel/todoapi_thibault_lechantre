const express = require("express");
const { pool } = require("../db");
const { createTask } = require("../models/task");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    const task = createTask({ title, description, status });

    const result = await pool.query(
      `
      INSERT INTO tasks (id, title, description, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING
        id,
        title,
        description,
        status,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      `,
      [
        task.id,
        task.title,
        task.description,
        task.status,
        task.createdAt,
        task.updatedAt,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        title,
        description,
        status,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM tasks
      ORDER BY created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        title,
        description,
        status,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM tasks
      WHERE id = $1
      `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    const result = await pool.query(
      `
      UPDATE tasks
      SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        status = COALESCE($3, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING
        id,
        title,
        description,
        status,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      `,
      [title, description, status, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING id",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;