const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}!`);
});
