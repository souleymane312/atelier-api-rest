const express = require("express");
 const mongoose = require("mongoose");
  const dotenv = require("dotenv"); 
  const User = require("./models/User"); 
  dotenv.config({  path: "./config/.env" });
   const app = express();
    app.use(express.json());
    mongoose  .connect(process.env.MONGO_URI)
      .then(() => {    console.log("MongoDB connecté");  

      });

      app.post("/users", async (req, res) => {  const user = await User.create(req.body);   res.json(user); });

      app.get("/users", async (req, res) => {  const users = await User.find();   res.json(users); });

      app.put("/users/:id", async (req, res) => {  const user = await User.findByIdAndUpdate(    req.params.id,    req.body,    { new: true }  );   res.json(user); });

      app.delete("/users/:id", async (req, res) => {  await User.findByIdAndDelete(req.params.id);   res.json({    message: "Utilisateur supprimé"  }); });

      app.listen(3000, () => { console.log("Serveur démarré"); 
      });