const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers
const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes
const jwt = require('jsonwebtoken');

const { Issue } = require('../models'); // Importa els models de dades
const { createItem, updateItem, deleteItem, readItem, readItems, checkToken } = require('../data');

// Operacions CRUD per als issue
router.post('/issue', async (req, res) => await createItem(req, res, Issue)); // Crea una etiqueta
router.get('/issue', checkToken, async (req, res) => await readItems(req, res, Issue)); // Llegeix tots els issue
router.get('/issue/:id', async (req, res) => await readItem(req, res, Issue)); // Llegeix un issue específic
router.put('/issue/:id', async (req, res) => await updateItem(req, res, Issue)); // Actualitza un issue
router.delete('/issue/:id', async (req, res) => await deleteItem(req, res, Issue)); // Elimina un issue

module.exports = router;