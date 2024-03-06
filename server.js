const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios");
const coinremitter = require("coinremitter-api");

const cors = require("cors");
const PORT = process.env.PORT || 7200;

const { default: mongoose } = require("mongoose");
require("dotenv").config();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

const URI = process.env.MONGO_URL;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })
  .then(() => {
    console.log("Database Connected");
    const obj = new coinremitter("YOUR_API_KEY", "PASSWORD", "BTC");
    app.get("/api/data", async (req, res) => {
      try {
        obj.getCoinRate(function (err, response) {
          if (err) {
            console.error("Error fetching data:", err);
            res.status(500).json({ error: "Failed to fetch data" });
          } else {
            console.log(response);
            res.json(response); // Send the response from Coinremitter API
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
      }
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
