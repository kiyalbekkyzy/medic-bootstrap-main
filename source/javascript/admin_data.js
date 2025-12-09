const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// подключение к PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "admin_data",
  password: "75554446",
  port: 5432
});

// ---------- ПАЦИЕНТЫ ----------

app.get("/patients", async (req, res) => {
  const result = await pool.query("SELECT * FROM patients ORDER BY id DESC");
  res.json(result.rows);
});

app.post("/patients", async (req, res) => {
  const { name, nationality, sex, dob } = req.body;
  await pool.query(
    "INSERT INTO patients (name, nationality, sex, dob) VALUES ($1, $2, $3, $4)",
    [name, nationality, sex, dob]
  );
  res.json({ success: true });
});

// ---------- ВРАЧИ ----------

app.get("/doctors", async (req, res) => {
  const result = await pool.query("SELECT * FROM doctors ORDER BY id DESC");
  res.json(result.rows);
});

app.post("/doctors", async (req, res) => {
  const { name, specialty, category } = req.body;
  await pool.query(
    "INSERT INTO doctors (name, specialty, category) VALUES ($1, $2, $3)",
    [name, specialty, category]
  );
  res.json({ success: true });
});

// ---------- ПРИЁМЫ ----------

app.post("/analysis/accept", async (req, res) => {
  const { patient_id, doctor_id, date } = req.body;
  await pool.query(
    "INSERT INTO accepts (patient_id, doctor_id, date) VALUES ($1, $2, $3)",
    [patient_id, doctor_id, date]
  );
  res.json({ success: true });
});

app.get("/analysis/accept", async (req, res) => {
  const result = await pool.query(`
     SELECT a.id, p.name AS patient, d.name AS doctor, a.date
     FROM accepts a
     JOIN patients p ON p.id = a.patient_id
     JOIN doctors d ON d.id = a.doctor_id
     ORDER BY a.id DESC
   `);
  res.json(result.rows);
});

// ---------- РЕЗУЛЬТАТЫ АНАЛИЗОВ ----------

app.post("/analysis/upload", async (req, res) => {
  const { accept_id, result } = req.body;
  await pool.query(
    "INSERT INTO results (accept_id, result) VALUES ($1, $2)",
    [accept_id, result]
  );
  res.json({ success: true });
});

app.get("/analysis/results", async (req, res) => {
  const result = await pool.query(`
    SELECT r.id, a.date, p.name AS patient, d.name AS doctor, r.result
    FROM results r
    JOIN accepts a ON a.id = r.accept_id
    JOIN patients p ON p.id = a.patient_id
    JOIN doctors d ON d.id = a.doctor_id
    ORDER BY r.id DESC
  `);
  res.json(result.rows);
});

app.listen(3000, () => console.log("Server started on port 3000"));
