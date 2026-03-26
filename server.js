const express = require("express");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ================= DATABASE =================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb"
});

db.connect(err => {
  if (err) console.error("❌ DB Error:", err);
  else console.log("✅ MySQL Connected");
});

// ================= EMAIL SETUP =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hiranwathi1@gmail.com", // Your sender email [cite: 1]
    pass: "dygbgsxbnfysjzkp" // Your App Password [cite: 1]
  }
});

// ================= AUTHENTICATION =================

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err) => {
    if (err) return res.status(400).send("User already exists");
    res.send("User added");
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE username=? AND password=?", [username, password], (err, result) => {
    if (result.length > 0) res.json({ message: "Login successful" });
    else res.json({ message: "Invalid credentials" });
  });
});

// ================= ACADEMIC INQUIRY HANDLER =================

app.post("/send-order", async (req, res) => {
  const { name, phone, order } = req.body;

  try {
    await transporter.sendMail({
      from: "hiranwathi1@gmail.com",
      to: "hiranwathi1@gmail.com", // Your primary academic email
      subject: `🎓 ACADEMIC INQUIRY: ${name}`,
      text: `Sender: ${name}\nContact: ${phone}\n\nInquiry Details:\n${order}\n\nSent: ${new Date().toLocaleString()}`
    });

    console.log("✅ Academic Email Sent");
    res.send("Message Sent Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Email transmission failed.");
  }
});

// ================= ROUTES =================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ================= START SERVER =================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Academic Portal Live → http://localhost:${PORT}`);
});