var express = require('express');
var router = express.Router();

const { getContacts } = require('../controllers/contacts/getContacts');
const { validateEmail } = require('../controllers/contacts/validateEmail');
const { addContact } = require('../controllers/contacts/addContact');
const { updateContact } = require('../controllers/contacts/updateContact');
const { deleteContact } = require('../controllers/contacts/deleteContact');

router.post('/contacts/getContacts', getContacts);
router.get('/contacts/validateEmail', validateEmail);
router.post('/contacts/addContact', addContact);
router.put('/contacts/updateContact', updateContact);
router.delete('/contacts/deleteContact', deleteContact);

module.exports = router;
