// 📁 models/Loan.js
const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  personName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["due", "paid"],
    default: "due",
  },
  type: {
    type: String,
    enum: ["give", "take"],
    required: true,
  },
});

module.exports = mongoose.model("Loan", loanSchema);