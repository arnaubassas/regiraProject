const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers
const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes
const jwt = require('jsonwebtoken');

const { User } = require('../models'); // Importa els models de dades
const { updateItem, deleteItem, readItem, readItems } = require('../data');

// Operacions CRUD per als Usuaris
router.get('/user', async (req, res) => await readItems(req, res, User)); // Llegeix tots els usuaris
router.get('/user/:id', async (req, res) => await readItem(req, res, User)); // Llegeix un usuari específic
router.put('/user/:id', async (req, res) => await updateItem(req, res, User)); // Actualitza un usuari
router.delete('/user/:id', async (req, res) => await deleteItem(req, res, User)); // Elimina un usuari

module.exports = router; 