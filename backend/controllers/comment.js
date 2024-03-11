const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers
const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes
const jwt = require('jsonwebtoken');

const { Comment, User, Issue } = require('../models'); // Importa els models de dades
const { updateItem, deleteItem, readItem, readItems, checkToken } = require('../data');

// Operacions CRUD per als issue
router.get('/comment', checkToken, async (req, res) => await readItems(req, res, Comment)); // Llegeix tots els comentaris
router.get('/comment/:id', async (req, res) => await readItem(req, res, Comment)); // Llegeix un comentari específic
router.put('/comment/:id', async (req, res) => await updateItem(req, res, Comment)); // Actualitza un comentari
router.delete('/comment/:id', async (req, res) => await deleteItem(req, res, Comment)); // Elimina un comentari

// Crea una commentari
router.post('/comment', checkToken, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId); // Cerca l'usuari pel seu ID
        if (!user) {
            return res.status(500).json({ error: 'User no trobat' }); // Retorna error 500 si no es troba l'usuari
        }
        const issue = await Issue.findByPk(req.userId); // Cerca l'issue pel seu ID
        if (!issue) {
            return res.status(500).json({ error: 'Issue no trobat' }); // Retorna error 500 si no es troba l'issue
        }
        req.body.userId = req.userId;// Estableix l'ID de l'usuari en el cos de la petició
        req.body.issueId = req.issueId; // Estableix l'ID de l'issue en el cos de la petició
        const item = await Comment.create(req.body); // Crea un nou commentari amb les dades rebudes
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
    }
});


module.exports = router;