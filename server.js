require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cron = require('node-cron');
const scrapeAndSaveKitcoPrices = require('./scraper/kitcoScraper');


// const userRoutes = require("./router/userRoutes");
// const expenseRoutes = require("./router/expenseRoutes");
// const loanRoutes = require("./router/loanRoutes");
const kitcoRoute = require('./router/kitcoRoute');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Database Connection 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Sample Route
app.get("/", (req, res) => {
  res.send("Welcome to ByteGold");
});


// Schedule to run every hour
//schedule to run every minute for testing
cron.schedule('*/1 * * * *', () => {
// cron.schedule('0 * * * *', () => {
  console.log('🔄 Running scheduled scraping...');
  scrapeAndSaveKitcoPrices();
});

// app.use("/api/users", userRoutes);
// app.use("/api/expenses", expenseRoutes);
// app.use("/api/loan", loanRoutes);
app.use('/api/metal-prices', kitcoRoute);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
