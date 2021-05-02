const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv/config");


//Middlewares
app.use(cors());//this somehow makes cross-domain requests work (from other domains) (Have not understood it completely)
app.use(bodyParser.json());


//Middlewares
/*app.use("/posts", () => {
	console.log("This is a middleware running");
});*/

//also good for auth
//app.use(auth);

//routes

//Import routes
const postsRoute = require("./routes/posts");

app.use("/posts", postsRoute);

//app has the std http methods (get, post, delete, patch (and probably also put))
app.get('/', (req, res) => {
	res.send("We are on home");
});





//Connect To DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("connected to DB!"));


//listening to the server
app.listen(3000);




