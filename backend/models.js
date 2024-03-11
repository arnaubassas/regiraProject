const Sequelize = require('sequelize'); // Importa la llibreria Sequelize

const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes

const sequelize = new Sequelize('regiraproject', 'root', 'admin', {
    //host: 'localhost',
    host: 'localhost',
    port: 3308, //IP de la base de dades
    dialect: 'mysql' // connectem a mysql
});

// Es defineix el model de issues
const Issue = sequelize.define('issue', {
    title: {
        type: Sequelize.STRING,
        allowNull: false // No es permet valor nul per al nom
    },
    desc: {
        type: Sequelize.STRING,
        allowNull: true // Es permet valor nul per a la descripció
    },
    issue_type: {
        type: Sequelize.ENUM('bug', 'story', 'task'), // Només es permeten aquests valors
        allowNull: false // No es permet valor nul per al tipus
    },
    priority: {
        type: Sequelize.ENUM('high', 'mid', 'low'), // Només es permeten aquests valors
        allowNull: false // No es permet valor nul per al tipus
    },
    state: {
        type: Sequelize.ENUM('backlog', 'in progress', 'review', 'testing', 'done', 'wont to do'), // Només es permeten aquests valors
        allowNull: false // No es permet valor nul per al tipus
    },
});

// Es defineix el model de projectes
const Project = sequelize.define('project', {
    name: {
        type: Sequelize.STRING,
        allowNull: false // No es permet valor nul per al nom
    },
    desc: {
        type: Sequelize.STRING,
        allowNull: true // Es permet valor nul per a la descripció
    },
    active: {
        type: Sequelize.BOOLEAN, // Només es permeten aquests valors
        allowNull: false // No es permet valor nul per al tipus
    },
});

// Es defineix el model de projectes
const Comment = sequelize.define('comment', {
    title: {
        type: Sequelize.STRING,
        allowNull: false // No es permet valor nul per al nom
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: true // Es permet valor nul per a la descripció
    },
});

// Es defineix el model de Tag
const Tag = sequelize.define('tag', {
    name: {
        type: Sequelize.STRING,
        unique: true, // El nom del tag ha de ser únic
        allowNull: false // No es permet valor nul per al nom
    }
});

// Es defineix el model d'usuari
const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false // No es permet valor nul per al nom
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false, // No es permet valor nul per a l'email
        unique: true // L'email ha de ser únic
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false // No es permet valor nul per a la contrasenya
    }
});


// hook per encriptar la contrasenya abans de desar un nou usuari
User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Encripta la contrasenya amb bcrypt
    user.password = hashedPassword;
});

Tag.belongsToMany(Issue, { through: 'tag_issue' }); // Relació de molts a molts entre Tag i issue
Issue.belongsToMany(Tag, { through: 'tag_issue' }); // Relació de molts a molts entre issue i Tag

User.hasMany(Project); // Un usuari pot tenir molts projectes
Project.belongsTo(User); // Un Project pertany a un únic usuari

User.hasMany(Comment); // Un usuari pot tenir molts commentaris
Comment.belongsTo(User); // Un comment   pertany a un únic usuari

Project.hasMany(Issue); // Un projecte pot tenir molts issues
Issue.belongsTo(Project); // Un Issue pertany a un únic projecte

Issue.hasMany(Comment); // Un issue pot tenir molts comment
Comment.belongsTo(Issue); // Un comment pertany a un únic issue

Issue.belongsTo(User, { as: 'author' });
Issue.belongsTo(User, { as: 'assignee' });

async function iniDB() {
    await sequelize.sync({ force: true });
}

// iniDB();

// Exporta els models per a poder ser utilitzats en altres parts de l'aplicació
module.exports = {
    Project,
    Issue,
    Comment,
    Tag,
    User
};
