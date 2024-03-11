const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers
const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes
const jwt = require('jsonwebtoken');

const { User } = require('../models');// Importa els models de dades
const { SECRET_KEY } = require('../data');

router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Obté l'email i la contrasenya de la petició
    try {
        const user = await User.findOne({ where: { email } }); // Cerca l'usuari pel seu email
        if (!user) {
            return res.status(404).json({ error: 'User no trobat' }); // Retorna error 404 si l'usuari no es troba
        }
        const passwordMatch = await bcrypt.compare(password, user.password); // Compara la contrasenya proporcionada amb la contrasenya encriptada de l'usuari
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password incorrecte' }); // Retorna error 401 si la contrasenya és incorrecta
        }
        const token = jwt.sign({ userId: user.id, userName: user.name }, SECRET_KEY, { expiresIn: '2h' }); // Genera un token JWT vàlid durant 2 hores
        res.cookie('token', token, { httpOnly: false, maxAge: 7200000 }); // Estableix el token com una cookie
        res.json({ message: 'Login correcte' }); // Retorna missatge d'èxit
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
    }
});

module.exports = router; 