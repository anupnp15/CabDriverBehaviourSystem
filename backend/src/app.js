const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
    res.send("Cab Driver Backend Running Successfully");
});

// STATIC FILES (LOCAL UPLOADS)
app.use("/uploads", express.static("uploads"));

// ROUTES
const observationRoutes = require("./routes/observationRoutes");
app.use("/api/observations", observationRoutes);

module.exports = app;