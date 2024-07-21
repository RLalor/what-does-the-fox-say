"use strict";
import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000; // PORT FOR VERCEL DEPLOYMENT
// const port = 3000; LOCAL USE PORT

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    try {
      const response = await axios.get("https://evilinsult.com/generate_insult.php");
      const result = response.data;
      res.render("index.ejs", {
        data: result });
      console.log(result);
    } catch (error) {
      console.error("Failed to make request:" , error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
  });

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

// uses https://evilinsult.com/api/