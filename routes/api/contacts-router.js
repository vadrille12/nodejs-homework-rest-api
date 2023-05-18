const express = require("express");

const contactsControllers = require("../../controllers/contacts-controller");
const schemas = require("../../schemas/contacts-schema");
const { validateBody } = require("../../decorators");

const router = express.Router();

router.get("/", contactsControllers.listContacts);

router.get("/:contactId", contactsControllers.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsControllers.addContact
);

router.delete(
  "/:contactId",
  validateBody(schemas.contactAddSchema),
  contactsControllers.removeContact
);

router.put("/:contactId", contactsControllers.updateContact);

module.exports = router;
