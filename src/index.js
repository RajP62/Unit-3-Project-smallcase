const express = require("express");
const app = express();
const path = require("path");
const smallcaseController = require("./controllers/smallcase.controller");
const blogController = require('./controllers/blog.controller');
const investmentStrategyController = require("./controllers/investmentstrategy.controller");
const tagController = require("./controllers/tag.controller");
const typeController = require("./controllers/type.controller");

const { register, login } = require("./controllers/auth.controller");

app.use(express.json());


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use("/blog", blogController)

app.post("/register",register);

app.use("/smallcase",smallcaseController)
app.post("/login", login);
app.use("/investmentStrategy",investmentStrategyController);
app.use("/tags", tagController);
app.use("/types", typeController);

module.exports = app;