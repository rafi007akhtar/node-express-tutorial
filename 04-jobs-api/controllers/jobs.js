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
  const { id } = request.params;
  const { userId } = request.user;
  const job = await Job.findOne({ _id: id, createdBy: userId });
  if (!job) {
    throw new NotFoundError("Job not found");
  }
  res.status(StatusCodes.OK).json({ job });
}

async function updateJob(request, res) {
  const { id } = request.params;
  const { userId } = request.user;
  const { company, position } = request.body;
  if (!company && !position) {
    throw new BadRequestError("Please provide either company or position");
  }

  const job = await Job.findOneAndUpdate(
    { _id: id, createdBy: userId },
    request.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!job) {
    throw new NotFoundError("Job not found");
  }

  res.status(StatusCodes.OK).json({ job });
}

async function deleteJob(request, res) {
  try {
    const { id } = request.params;
    const { userId } = request.user;
    const job = await Job.findOneAndDelete({ _id: id, createdBy: userId });
    if (!job) {
      throw new NotFoundError("No job with given id exists");
    }
    res.status(StatusCodes.OK).send(`Job with id ${id} successfully deleted`);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: e.toString() });
  }
}

module.exports = { createJob, getAllJobs, getJob, updateJob, deleteJob };
