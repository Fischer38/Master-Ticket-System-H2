import {DataTypes} from 'sequelize';
import sequelize from '../database.js';

let TICKET_TYPE = sequelize.define('TICKET_TYPE', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        size: 100
    }
})

export default TICKET_TYPE;