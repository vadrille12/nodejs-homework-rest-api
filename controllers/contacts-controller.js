const fs = require("fs/promises");
const path = require("path");

const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers");

const { controllerWrapper } = require("../decorators");

const moviesPath = path.resolve("public", "avatars");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip: 2,
    limit: 2,
  }).populate("owner", "name email");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id "${contactId}" not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { path: oldPath, filename } = req.path;
  const newPath = path.join(moviesPath, filename);
  await fs.rename(oldPath, newPath);
  const poster = path.join("avatars", filename);
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, poster, owner });

  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id "${contactId}" not found`);
  }
  res.json({ message: "Delete success" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id "${contactId}" not found`);
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id "${contactId}" not found`);
  }

  res.json(result);
};

module.exports = {
  getContacts: controllerWrapper(getContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  removeContact: controllerWrapper(removeContact),
  updateContact: controllerWrapper(updateContact),
  updateFavorite: controllerWrapper(updateFavorite),
};
