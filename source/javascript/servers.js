// servers.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключение к PostgreSQL
const pool = new Pool({
  user: "postgres",       // твой пользователь
  host: "localhost",      // сервер БД
  database: "hospital",   // твоя база
  password: "75554446",   // пароль к PostgreSQL
  port: 5432
});

// Проверка соединения с БД
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Ошибка при подключении к БД:', err.stack);
  }
  console.log('Успешное подключение к базе данных PostgreSQL!');
  release();
});

// Маршрут для вставки данных из формы
app.post("/submit", async (req, res) => {
  const { fio, email, phone, date, analysis, doctor, message } = req.body;

  // Валидация обязательных полей
  if (!fio || !email || !phone || !date || !analysis || !doctor) {
    return res.status(400).json({ 
      success: false, 
      error: "Отсутствуют обязательные поля: ФИО, Email, Телефон, Дата, Анализ, Врач." 
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO results (fio, email, phone, date, analysis, doctor, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [fio, email, phone, date, analysis, doctor, message]
    );

    res.status(201).json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error('Ошибка при вставке данных:', err);
    res.status(500).json({ 
      success: false, 
      error: err.message,
      stack: err.stack
    });
  }
});

// Запуск сервера
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
