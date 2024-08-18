const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { BadRequestError, NotFoundError } = require("../errors");

async function createJob(request, res) {
  request.body.createdBy = request.user.userId;
  const job = await Job.create(request.body);
  res.status(StatusCodes.CREATED).json({ job });
}

async function getAllJobs(request, res) {
  const jobs = await Job.find({ createdBy: request.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

async function getJob(request, res) {
  res.send("TODO");
}

async function updateJob(request, res) {
  res.send("TODO");
}

async function deleteJob(request, res) {
  res.send("TODO");
}

module.exports = { createJob, getAllJobs, getJob, updateJob, deleteJob };
