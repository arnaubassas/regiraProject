const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers
const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes
const jwt = require('jsonwebtoken');

const { Tag } = require('../models'); // Importa els models de dades
const { createItem, updateItem, deleteItem, readItem, readItems, checkToken } = require('../data');

// Operacions CRUD per als tag
router.post('/tag', async (req, res) => await createItem(req, res, Tag)); // Crea una tag
router.get('/tag', checkToken, async (req, res) => await readItems(req, res, Tag)); // Llegeix tots els tag
router.get('/tag/:id', async (req, res) => await readItem(req, res, Tag)); // Llegeix un tag específic
router.put('/tag/:id', async (req, res) => await updateItem(req, res, Tag)); // Actualitza un tag
router.delete('/tag/:id', async (req, res) => await deleteItem(req, res, Tag)); // Elimina un tag

module.exports = router;