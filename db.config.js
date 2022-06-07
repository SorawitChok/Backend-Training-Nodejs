const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hodtraining', 'root', '', {
   host: 'localhost',
   dialect: 'mysql'
});

const db = {}
db.Sequelize = sequelize

db.User = require('./model/user.js')(sequelize,Sequelize)
db.Address = require('./model/address.js')(sequelize,Sequelize)

db.Address.belongsTo(db.User)
db.User.hasMany(db.Address)

module.exports = db
