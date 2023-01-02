// packages
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectDatabase } from "./util/db.js";
import { SECRETS } from "./util/config.js";


config();
const app = express()
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//endpoint shows Server Running
app.get("/", (req, res) => {
  res.json(`Server Connected to DB and Running : ${new Date().toLocaleString()}`);
});


// Connect to the database before listening
connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  })
})
// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}...`);
// })