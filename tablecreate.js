import {Sequelize} from 'sequelize';
import _ from 'lodash';

const Conn = new Sequelize(
  'TestSales', //database
  'postgres', //username
  'pass09876', //password
  {
    dialect: 'postgres',
    host: 'localhost'
  }
);

const Sales = Conn.define('sales', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  CustomerName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Amount: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  TDate: {
    type: Sequelize.DATE,
    allowNull: false
  },

});

// Relations

Conn.sync({ force: true });