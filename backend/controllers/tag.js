const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers
const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes
const jwt = require('jsonwebtoken');

const { Tag, Issue } = require('../models'); // Importa els models de dades
const { createItem, updateItem, deleteItem, readItem, readItems, checkToken } = require('../data');

// Operacions CRUD per als tag
router.post('/tag', async (req, res) => await createItem(req, res, Tag)); // Crea una tag
router.get('/tag', checkToken, async (req, res) => await readItems(req, res, Tag)); // Llegeix tots els tag
router.get('/tag/:id', async (req, res) => await readItem(req, res, Tag)); // Llegeix un tag específic
router.put('/tag/:id', async (req, res) => await updateItem(req, res, Tag)); // Actualitza un tag
router.delete('/tag/:id', async (req, res) => await deleteItem(req, res, Tag)); // Elimina un tag


// Endpoint per obtenir els issues per a una etiqueta
router.get('/tags/:tagtId/issues', async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.tagId, { include: Issue }); // Cerca l'etiqueta pel seu ID, incloent els issues associats
        if (!tag) {
            return res.status(404).json({ error: 'Tag no trobat' }); // Retorna error 404 si l'etiqueta no es troba
        }
        res.json(tag.issues); // Retorna els issues associats a l'etiqueta
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
    }
});


module.exports = router;