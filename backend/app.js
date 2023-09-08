const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

const allowedOrigins = ["http://localhost:5173", "http://192.168.100.21:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const errMsg =
          "La política de CORS para este sitio no permite el acceso desde el origen específico.";
        return callback(new Error(errMsg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.use(express.json());

// Creación del pool de conexiones
const pool = mysql.createPool({
  host: "mysql-60148-0.cloudclusters.net",
  port: 18705,
  user: "root",
  password: "12345678",
  database: "respaldo",
  connectionLimit: 10,
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    jwt.verify(req.token, "tu_clave_secreta", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

app.get("/api/data", verifyToken, (req, res) => {
  const sql = "SELECT * FROM usuario";
  pool.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.json(results);
  });
});
app.get("/api/nombre", (req, res) => {
  const sql =
    "SELECT * FROM nombres_sensores ORDER BY RIGHT(nombre_sensor ,4)ASC";

  pool.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

app.get("/api/sensores", (req, res) => {
  const sql = "SELECT * FROM sensores ";

  pool.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

app.post("/api/query", verifyToken, (req, res) => {
  const { sensorId, startDateTime, endDateTime } = req.body;

  const sql =
    "SELECT * FROM `sensores` " +
    "INNER JOIN nombres_sensores ON nombres_sensores.id_sensor = sensores.id_sensor " +
    "WHERE nombres_sensores.nombre_sensor = ? " +
    "AND CONCAT(fecha, ' ', hora) BETWEEN ? AND ? " +
    "ORDER BY fecha, hora ASC";

  const data = [sensorId, startDateTime, endDateTime];

  pool.query(sql, data, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

app.post("/api/extremes", verifyToken, (req, res) => {
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

  pool.query(sql, data, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.json(results[0]);
  });
});

app.post("/api/user", (req, res) => {
  const user = req.body;

  const sql = "INSERT INTO usuario SET ?";

  pool.query(sql, user, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.status(201).send("User created");
  });
});

app.post("/api/login", (req, res) => {
  const { correo, contraseña } = req.body;

  const sql = "SELECT * FROM usuario WHERE correo = ? AND contraseña = ?";

  pool.query(sql, [correo, contraseña], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    if (results.length > 0) {
      // El usuario existe, crear token
      const token = jwt.sign({ id: results[0].id }, "tu_clave_secreta", {
        expiresIn: "1h",
      });

      // Establecer la cookie HttpOnly
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });

      res.json({ token });
    } else {
      // El usuario no existe
      res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening at http://localhost:${port}`);
});
