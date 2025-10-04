const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve all static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// ✅ Routes for each page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.get("/booking", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "booking.html"));
});

// ✅ Handle form submissions (POST requests)
app.post("/book", (req, res) => {
  const { name, phone, email, message } = req.body;
  console.log("📩 New Booking:", { name, phone, email, message });

  res.send(`
    <h2>Thank you, ${name}!</h2>
    <p>Your booking has been received. We will contact you at ${phone}${email ? " or " + email : ""}.</p>
    <a href="/">⬅ Back to Home</a>
  `);
});

// ✅ Start the server
app.listen(3000, () => {
  console.log("✅ Seanna Garden server running on http://localhost:3000");
});

module.exports = app;