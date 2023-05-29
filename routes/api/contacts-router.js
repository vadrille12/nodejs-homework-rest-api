const express = require("express");

const contactsControllers = require("../../controllers/contacts-controller");
const { schemas } = require("../../models/contact");
const { validateBody, isValidId } = require("../../decorators");

const router = express.Router();

router.get("/", contactsControllers.getContacts);

router.get("/:contactId", isValidId, contactsControllers.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsControllers.addContact
);

router.delete("/:contactId", isValidId, contactsControllers.removeContact);

router.put("/:contactId", isValidId, contactsControllers.updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsControllers.updateFavorite
);

module.exports = router;
