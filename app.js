const express = require("express");
const app = express();
const sequelize = require("./SDatabase.js");
const Model = require("./sequlaize.js"); // Import the model
const cors = require("cors"); // Import the cors middleware
const { rejects } = require("assert");

app.use(express.json()); // Use JSON middleware
app.use(express.json({ extended: true })); // Use URL-encoded middleware

// Configure CORS to allow requests from any origin (for development purposes)
app.use(cors());

// Define your model and routes here

app.post("/submit", async (req, res) => {
  // Assuming your model is named "Model"
  try {
    const { name, email, time } = req.body;
    const newUser = await Model.create({ name, email, time });
    console.log("Data inserted successfully");
    res.sendStatus(200);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "An error occurred while inserting data." });
  }
});

app.get("/fetchdata", async (req, res) => {
  const { name } = req.query;

  try {
    // Assuming your model is named "Model"
    const data = await Model.findAll({
      where: {
        name: name // Filter based on the name parameter
      }
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});


app.delete("/deldata", async (req, res) => {
  console.log(req.query);
  try {
    const { name } = req.query;

    // Assuming your model is named "Model"
    const deleted = await Model.destroy({
      where: {
        name: name,
      },
    });

    if (deleted > 0) {
      console.log("Data deleted successfully");
      res.sendStatus(200);
    } else {
      console.log("Data not found");
      res.status(404).json({ error: "Data not found." });
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ error: "An error occurred while deleting data." });
  }
});

sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log("Database synchronization error:", err);
  });
