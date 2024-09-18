const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // If you're using Mongoose for MongoDB

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to your MongoDB (replace with your actual connection string)
mongoose.connect("mongodb://localhost:27017/yourdbname", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your Item model (assuming you're using Mongoose)
const Item = mongoose.model(
  "Item",
  new mongoose.Schema({
    name: String,
  })
);

// Root route
app.get("/", (req, res) => {
  res.send("The World We Are Living In Is Going Insane");
});

// POST route to add a new item
app.post("/items", (req, res) => {
  const newItem = new Item({ name: req.body.name });

  newItem
    .save()
    .then(() => res.status(201).send("Item created!"))
    .catch((err) =>
      res.status(400).send("Error creating item: " + err.message)
    );
});

// Start the server
app.listen(3000, () => {
  console.log("App running on port 3000");
});
