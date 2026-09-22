const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const doctorAuthRoute = require("./routes/doctorauth");
const nurseAuthRoute = require("./routes/nurseauth");
const pharmacistAuthRoute = require("./routes/pharmacistauth");
const clientAuthRoute = require("./routes/clientauth");
const patientAuthRoute = require("./routes/patientauth");
const reportsRoute = require("./routes/reports");
const VSRoute = require("./routes/VS");
const FCRoute = require("./routes/FC");

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// health check (used by deployment platforms to verify the service is up)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// routes
app.use("/doctor", doctorAuthRoute);
app.use("/nurse", nurseAuthRoute);
app.use("/pharmacist", pharmacistAuthRoute);

app.use("/patientauth", patientAuthRoute);
app.use("/patients", reportsRoute);
app.use("/patients", VSRoute);

app.use("/clientauth", clientAuthRoute);
app.use("/client", FCRoute);

// error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

module.exports = app;
