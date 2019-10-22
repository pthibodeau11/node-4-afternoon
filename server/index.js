require("dotenv").config();
const express = require("express");
const session = require("express-session");
const checkForSession = require("./middlewares/checkForSession") //we are requiring our middleware
const app = express();
const swagController = require("./controllers/swagController")
const authController = require("./controllers/authController")
const cartController = require("./controllers/cartController")
const searchController = require("./controllers/searchController")
let { SERVER_PORT, SESSION_SECRET}


// middleware
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(checkForSession)

//Endpoints
/// Auth
app.post("/api/register", authController.register);
app.post("/api/login", authController.login);
app.post("/api/signout", authController.signout);
app.get("/api/user", authController.getUser);
/// the swag
app.get("/api/swag", swagController.read); 
/// the cart
app.post("/api/cart/checkout", cartController.checkout);
app.post("/api/cart/:id", cartController.add);
app.delete("/api/cart/:id", cartController.delete)
// Search
app.get("/api/search", searchController.search)

app.listen(SERVER_PORT, () => {`SERVER IS LISTENING ON ${SERVER_PORT}`})
