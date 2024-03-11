// Similar CRUD operations for Issue, User, Project, Tag, and Comment...
const SECRET_KEY = "en-bryan-sen-va-a-bcn"; // Clau secreta per a la generació de JWT

const createItem = async (req, res, Model) => {
    try {
        const item = await Model.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const readItems = async (req, res, Model) => {
    try {
        const items = await Model.findAll();
        res.json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const readItem = async (req, res, Model) => {
    try {
        const item = await Model.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateItem = async (req, res, Model) => {
    try {
        const item = await Model.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        await item.update(req.body);
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteItem = async (req, res, Model) => {
    try {
        const item = await Model.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        await item.destroy();
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const checkToken = (req, res, next) => {
    const token = req.cookies?.token; // Obté el token des de la cookie de la petició
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' }); // Retorna error 401 si no hi ha cap token
    }

    try {
        const decodedToken = jwt.verify(token, SECRET_KEY); // Verifica el token utilitzant la clau secreta
        req.userId = decodedToken.userId; // Estableix l'ID d'usuari a l'objecte de la petició
        next(); // Passa al següent middleware
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' }); // Retorna error 401 si el token és invàlid
    }
};

module.exports = {
    createItem,
    updateItem,
    deleteItem,
    readItem,
    readItems,
    checkToken,
    SECRET_KEY
}  