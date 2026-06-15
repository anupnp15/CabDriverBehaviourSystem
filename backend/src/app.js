const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// STATIC FILES (LOCAL UPLOADS)
app.use("/uploads", express.static("uploads"));

// ROUTES
const observationRoutes = require("./routes/observationRoutes");
app.use("/api/observations", observationRoutes);

module.exports = app;