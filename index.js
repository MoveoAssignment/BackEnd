const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const codeblockRoutes = require("./routes/Codeblock.routes");
const connectDB = require("./config/mongo");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(cors());
app.use("/codeblocks", codeblockRoutes);

app.listen(PORT, () => {
  console.log(`Server Running on Port: http://localhost:${PORT}`);
  connectDB();
});
