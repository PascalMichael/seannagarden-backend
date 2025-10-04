const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Homepage
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Seanna Garden</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; text-align: center; background: #f9f9f9; }
        header { background: #4CAF50; color: white; padding: 20px; font-size: 24px; }
        main { padding: 20px; }
        form { max-width: 400px; margin: 20px auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.2); }
        input, textarea { width: 100%; padding: 10px; margin: 8px 0; border: 1px solid #ccc; border-radius: 4px; }
        button { background: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
        button:hover { background: #45a049; }
        footer { margin-top: 30px; padding: 15px; background: #eee; }
      </style>
    </head>
    <body>
      <header>🌿 Welcome to Seanna Garden</header>
      <main>
        <h2>Book Your Visit</h2>
        <form action="/book" method="POST" onsubmit="return showConfirm(event)">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="tel" name="phone" placeholder="Phone Number" required />
          <input type="email" name="email" placeholder="Email (Optional)" />
          <textarea name="message" placeholder="Your message" required></textarea>
          <button type="submit">Submit Booking</button>
        </form>
      </main>

      <footer>
        <p>📍 Seanna Garden, Tanzania</p>
        <p>☎ 0769333441 | ✉ seanna.tanzania@gmail.com</p>
      </footer>

      <script>
        function showConfirm(event) {
          event.preventDefault();
          alert("✅ Your booking has been received. We will contact you soon via the details you provided.");
          event.target.submit();
        }
      </script>
    </body>
    </html>
  `);
});

// Handle form submission
app.post("/book", (req, res) => {
  const { name, phone, email, message } = req.body;
  console.log("📩 New Booking:", { name, phone, email, message });

  res.send(`
    <h2>Thank you, ${name}!</h2>
    <p>Your booking has been received. We will contact you at ${phone}${email ? " or " + email : ""}.</p>
    <a href="/">⬅ Back to Home</a>
  `);
});

// For Vercel deployment
app.listen(3000, () => {
  console.log("✅ Seanna Garden server running on port 3000");
});

module.exports = app;
