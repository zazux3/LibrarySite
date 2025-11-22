const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
require('dotenv').config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/books", require("./routes/BookRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);
    

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
