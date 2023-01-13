// packages
import express from "express";
import fileUpload from 'express-fileupload';
import expressListRoutes from "express-list-routes";
import { config } from "dotenv";
import cors from "cors";
import { connectDatabase } from "./util/db.js";
import { SECRETS } from "./util/config.js";

config();
const app = express()
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
  cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://test-bk-admin.vercel.app'] })
);

//endpoint shows Server Running
app.get("/", (req, res) => {
  res.json(`Server Connected to DB and Running : ${new Date().toLocaleString()}`);
});

//Auth Routes
// app.post("/signup", userModel, signup);
// app.put("/forgotPassword", forgotPassword);
// app.put("/changePassword", userModel, adminProtect, changeUserPassword);
// app.post("/admin-signup", userModel, employerSignUp);
// app.post("/signin", userModel, signin);
// app.post("/admin-signin", userModel, adminSignin);

//User
import userRoute from "./resources/user/userRoute.js";
app.use("/", userRoute);

//Book
import bookRoute from "./resources/book/bookRoute.js";
app.use("/", bookRoute);

// Connect to the database before listening
connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  })
  expressListRoutes(app);
})