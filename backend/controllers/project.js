const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers
const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes
const jwt = require('jsonwebtoken');

const { Project } = require('../models'); // Importa els models de dades
const { createItem, updateItem, deleteItem, readItem, readItems, checkToken } = require('../data');


// Operacions CRUD per als project
router.post('/project', async (req, res) => await createItem(req, res, Project)); // Crea una tag
router.get('/project', checkToken, async (req, res) => await readItems(req, res, Project)); // Llegeix tots els projectes
router.get('/project/:id', async (req, res) => await readItem(req, res, Project)); // Llegeix un projecte específic
router.put('/project/:id', async (req, res) => await updateItem(req, res, PRoject)); // Actualitza un projecte
router.delete('/project/:id', async (req, res) => await deleteItem(req, res, Project)); // Elimina un projecte

module.exports = router;