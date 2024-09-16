const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Define a User schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

app.use(bodyParser.json());

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database
  const user = await User.findOne({ email, password });

  if (user) {
    // Authentication successful, send a success response
    res.json({ success: true });

    // Redirect the user to main categories page (client-side)
    // You can also send a response with a redirect URL and let the client handle the redirection
  } else {
    // Authentication failed, send an error response
    res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
