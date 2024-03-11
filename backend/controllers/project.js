const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers
const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes
const jwt = require('jsonwebtoken');

const { Project } = require('../models'); // Importa els models de dades
const { updateItem, deleteItem, readItem, readItems, checkToken } = require('../data');


// Operacions CRUD per als project
router.get('/project', checkToken, async (req, res) => await readItems(req, res, Project)); // Llegeix tots els projectes
router.get('/project/:id', async (req, res) => await readItem(req, res, Project)); // Llegeix un projecte específic
router.put('/project/:id', async (req, res) => await updateItem(req, res, PRoject)); // Actualitza un projecte
router.delete('/project/:id', async (req, res) => await deleteItem(req, res, Project)); // Elimina un projecte

//Crea un projecte
router.post('/project', checkToken, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId); // Cerca l'usuari pel seu ID
        if (!user) {
            return res.status(500).json({ error: 'User no trobat' }); // Retorna error 500 si no es troba l'usuari
        }
        req.body.userId = req.userId; // Estableix l'ID de l'usuari en el cos de la petició
        const item = await Project.create(req.body); // Crea un nou Projecte amb les dades rebudes
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
    }
});

module.exports = router;