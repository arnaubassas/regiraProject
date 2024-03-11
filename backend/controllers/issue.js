const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers
const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes
const jwt = require('jsonwebtoken');

const { Issue, Tag, User, Project } = require('../models'); // Importa els models de dades
const { updateItem, deleteItem, readItem, readItems, checkToken } = require('../data');

function createIssue() {

}


// Operacions CRUD per als issue
router.get('/issue', checkToken, async (req, res) => await readItems(req, res, Issue)); // Llegeix tots els issue
router.get('/issue/:id', async (req, res) => await readItem(req, res, Issue)); // Llegeix un issue específic
router.put('/issue/:id', async (req, res) => await updateItem(req, res, Issue)); // Actualitza un issue
router.delete('/issue/:id', async (req, res) => await deleteItem(req, res, Issue)); // Elimina un issue

// Crea una issue
router.post('/issue', checkToken, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId); // Cerca l'usuari pel seu ID
        if (!user) {
            return res.status(500).json({ error: 'User no trobat' }); // Retorna error 500 si no es troba l'usuari
        }
        const project = await Project.findByPk(req.projectId); // Cerca l'issue pel seu ID
        if (!project) {
            return res.status(500).json({ error: 'projecte no trobat' }); // Retorna error 500 si no es troba el projecte
        }
        req.body.authorId = req.userId;// Estableix l'ID de l'usuari com a author en el cos de la petició
        req.body.projectId = req.projectId; // Estableix l'ID dl projecte en el cos de la petició
        const item = await Comment.create(req.body); // Crea un nou commentari amb les dades rebudes
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
    }
});

// Endpoint per vincular una etiqueta a un Issue
router.post('/issue/:issueId/tags/:tagId', async (req, res) => {
    try {
        const issue = await Issue.findByPk(req.params.issueId); // Cerca el issue pel seu ID
        const tag = await Tag.findByPk(req.params.tagId); // Cerca l'etiqueta pel seu ID
        if (!issue || !tag) {
            return res.status(404).json({ error: 'issue o Tag no trobats' }); // Retorna error 404 si el issue o l'etiqueta no es troben
        }
        await issue.addTag(tag); // Afegeix l'etiqueta al issue
        res.json({ message: 'Tag linkat' }); // Retorna missatge d'èxit
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
    }
});

// Endpoint per obtenir totes les etiquetes per a un Issue
router.get('/issue/:issueId/tags', async (req, res) => {
    try {
        const issue = await Issue.findByPk(req.params.issueId); // Cerca el issue pel seu ID
        if (!issue) {
            return res.status(404).json({ error: 'issue no trobat' }); // Retorna error 404 si el issue no es troba
        }
        const tags = await issue.getTags(); // Obté totes les etiquetes associades al issue
        res.json(tags); // Retorna les etiquetes
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
    }
});



module.exports = router;