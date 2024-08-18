const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "not provided"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "not provided"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    // NOTE: this is important; a job should be assigned to a user, by their id
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User", // referring to the User model
      required: [true, "not provided"],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
