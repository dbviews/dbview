const Sequelize = require('sequelize');
const testData = require('./testdata');

const sequelize = new Sequelize('d7ctrh5hg6aadj', 'dxrwecviorvrto', 'BDyJHAElIeyxjSLNxI1NBYu3Z4', {
  host: 'ec2-54-243-212-72.compute-1.amazonaws.com',
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'username' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  elo: {
    allowNull: true,
    defaultValue: 1200,
    type: Sequelize.INTEGER,
  },
  games: {
    allowNull: true,
    defaultValue: 0,
    type: Sequelize.INTEGER,
  },
  wins: {
    allowNull: true,
    defaultValue: 0,
    type: Sequelize.INTEGER,
  },
  league: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  imglink: {
    allowNull: true,
    type: Sequelize.STRING,
  }
});

sequelize.sync({ force: true })
  .then(() => User.bulkCreate(testData.userData))
  .then(() => sequelize.close());



