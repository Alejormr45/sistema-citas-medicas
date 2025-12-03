require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// --------------------- REGISTRO ---------------------
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const exists = await db.get(
      "SELECT * FROM users WHERE email = ?",
      email
    );

    if (exists) {
      return res.status(409).json({ error: "Email ya registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      name,
      email,
      hashedPassword
    );

    const token = jwt.sign(
      { id: result.lastID, email },
      process.env.JWT_SECRET || "hola",
      { expiresIn: "2h" }
    );

    return res.json({
      id: result.lastID,
      name,
      email,
      token
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
});

// --------------------- LOGIN ---------------------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.get("SELECT * FROM users WHERE email = ?", email);

    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "2h" }
    );

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
});

// --------------------- PROFILE ---------------------
app.get("/profile", async (req, res) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "Token requerido" });

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "hola");

    const user = await db.get("SELECT id, name, email FROM users WHERE id = ?", decoded.id);

    return res.json(user);

  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
});

// --------------------- RUN ---------------------
app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
