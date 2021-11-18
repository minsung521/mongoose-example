require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const { PORT, MONGO_URI } = process.env;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose
	.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("successfully connected to mongodb"))
	.catch((e) => console.log(e));

app.use("/todos", require("./routes/todos"));

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
