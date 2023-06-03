const express = require("express");

const contactsControllers = require("../../controllers/contacts-controller");
const { schemas } = require("../../models/contact");
const { validateBody, isValidId, authenticate } = require("../../decorators");

const router = express.Router();

router.get("/", authenticate, contactsControllers.getContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactsControllers.getContactById
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactAddSchema),
  contactsControllers.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsControllers.removeContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  contactsControllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsControllers.updateFavorite
);

module.exports = router;
