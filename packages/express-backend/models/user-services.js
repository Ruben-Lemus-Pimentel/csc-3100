import mongoose from "mongoose";
import userModel from "./user.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .catch((error) => console.log(error));

function getUsers(name, job) {
  if (name && job) {
    return findUsersByNameAndJob(name, job);
  } else if (name) {
    return findUserByName(name);
  } else if (job) {
    return findUserByJob(job);
  }

  return userModel.find();
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  return userToAdd.save();
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUsersByNameAndJob(name, job) {
  return userModel.find({ name: name, job: job });
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUsersByNameAndJob,
  deleteUserById,
};