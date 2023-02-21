const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./routes/router")
const authRouter = require("./routes/auth")
require("dotenv").config();

mongoose.set('strictQuery', false)

//App
const app = express();

//database connection
// mongoose.connect(process.env.DATABASE_CLOUD, { useNewUrlParser: true }).then(() => console.log("Database connection established in Cloud !!")).catch((e) => console.log("Error connecting to database: ", e))
mongoose.connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true}).then(() => console.log("Database connection established in Local !!")).catch((e) => console.log("Error connecting to database: ", e))

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

//cors
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middleware
app.use('/api', blogRouter)
app.use('/auth', authRouter)

//port
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
})
