module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define(
      'address',
      {
        address: {
          type: Sequelize.STRING,
          field: 'address'
        },
        user_id: {
            type: Sequelize.INTEGER,
            field: 'user_id'
        }
      },
      {
        underscored: true,
        freezeTableName: true,
        timestamps: false
      }
    );
    return Address;
  };
 
 