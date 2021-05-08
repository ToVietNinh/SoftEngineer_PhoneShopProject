const express = require("express");
const app = express();
const config = require("config");

//Config View Engine
app.set("views", config.get("app").views_folder);
app.set("view engine", config.get("app").view_engine);

//Config Static Folder
app.use("/static", express.static(config.get("app").static_folder));
 
//Config Get Form Data
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(require("../routers/web"));

module.exports = app;
