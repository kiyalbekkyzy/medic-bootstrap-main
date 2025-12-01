
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const pool = new Pool({
  user: "postgres",       
  host: "localhost",      
  database: "hospital",   
  password: "75554446",   
  port: 5432
});


pool.connect((err, client, release) => {
  if (err) {
    return console.error('Ошибка при подключении к БД:', err.stack);
  }
  console.log('Успешное подключение к базе данных PostgreSQL!');
  release();
});


app.post("/submit", async (req, res) => {
  const { fio, email, phone, date, analysis, doctor, message } = req.body;


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




app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
