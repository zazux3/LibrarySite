const express = require('express');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/books", require("./routes/BookRoutes"));
app.use(errorHandler);
    

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
