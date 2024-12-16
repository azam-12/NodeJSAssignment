const express = require("express");
const categoryRouter = require("./routes/category");
const bookRouter = require("./routes/book");
const cors = require("cors");
const { BASE_URL } = require("./utils/constants");
require("dotenv").config();

const app = express();


app.use(express.json());

app.use(cors({
  origin: BASE_URL,               // Frontend URL
  methods: ["GET", "POST"],       // Allowed methods
  credentials: true,  
}));

app.listen(process.env.PORT, () => {
    console.log("Listening at port 8800...");
})


app.use("/", categoryRouter);
app.use("/", bookRouter);
