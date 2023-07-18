const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: "mysql-60148-0.cloudclusters.net",
  port: 18705,
  user: "root",
  password: "12345678",
  database: "respaldo",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/api/data", (req, res) => {
  const sql = "SELECT * FROM usuario";

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get("/api/nombre", (req, res) => {
  const sql = "SELECT * FROM nombres_sensores";

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/api/sensores", (req, res) => {
  const sql = "SELECT * FROM sensores";

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/api/query", (req, res) => {
  const { sensorId, startDateTime, endDateTime } = req.body;

  const sql =
    "SELECT * FROM `sensores` " +
    "INNER JOIN nombres_sensores ON nombres_sensores.id_sensor = sensores.id_sensor " +
    "WHERE nombres_sensores.nombre_sensor = ? " +
    "AND CONCAT(fecha, ' ', hora) BETWEEN ? AND ? " +
    "ORDER BY fecha, hora ASC";

  const data = [sensorId, startDateTime, endDateTime];

  db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.post("/api/extremes", (req, res) => {
  const { sensorId, startDateTime, endDateTime } = req.body;

  const sql = `
    SELECT ROUND(MIN(temperatura),2) as minima_temperatura,
           ROUND(MAX(temperatura),2) as maxima_temperatura,
           ROUND(MIN(humedad),2) as minima_humedad,
           ROUND(MAX(humedad),2) as maxima_humedad
    FROM sensores INNER JOIN nombres_sensores ON nombres_sensores.id_sensor = sensores.id_sensor 
    WHERE nombres_sensores.nombre_sensor = ? 
      AND CONCAT(fecha, ' ', hora) BETWEEN ? AND ?
    ORDER BY fecha, hora ASC
  `;

  const data = [sensorId, startDateTime, endDateTime];

  db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.json(results[0]); // Devuelve solo el primer elemento, ya que esperamos una sola fila de resultado.
  });
});

app.post("/api/user", (req, res) => {
  const user = req.body;

  const sql = "INSERT INTO usuario SET ?";

  db.query(sql, user, (err, result) => {
    if (err) throw err;
    res.status(201).send("User created");
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
