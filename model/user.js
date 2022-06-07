module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
      'user',
      {
        name: {
          type: Sequelize.STRING,
          field: 'name'
        },
        email: {
          type: Sequelize.STRING,
          field: 'email'
        }
      },
      {
        underscored: true,
        freezeTableName: true,
        timestamps: false
      }
    );
    return User;
  };
 
 