const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers
const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes
const jwt = require('jsonwebtoken');

const { User } = require('../models'); // Importa els models de dades

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body; // Obté el nom, email i contrasenya de la petició
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, i password requerits' }); // Retorna error 400 si no es proporcionen el nom, email o contrasenya
        }
        const existingUser = await User.findOne({ where: { email } }); // Comprova si l'email ja està registrat
        if (existingUser) {
            return res.status(400).json({ error: 'Email ja existeix' }); // Retorna error 400 si l'email ja està registrat
        }
        const user = await User.create({ name, email, password }); // Crea l'usuari amb les dades proporcionades
        res.status(201).json(user); // Retorna l'usuari creat amb el codi d'estat 201 (Creat)
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
    }
});


module.exports = router; 