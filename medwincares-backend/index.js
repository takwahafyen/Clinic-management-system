const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const doctorAuthRoute = require("./routes/doctorauth");
const nurseAuthRoute = require("./routes/nurseauth");
const pharmacistAuthRoute = require("./routes/pharmacistauth");
const clientAuthRoute = require("./routes/clientauth");
const patientAuthRoute = require("./routes/patientauth");
const reportsRoute = require("./routes/reports");
const VSRoute = require("./routes/VS");
const FCRoute = require("./routes/FC");

const cors = require("cors");
const app = express();

dotenv.config();

// middleware
app.use(cors());
app.use(express.json());

// Initial connection to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  .then(() => console.log("MongoDB is connected!"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// MongoDB disconnected listener
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

// MongoDB connected listener
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

//middlewares
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
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}!`);
});
