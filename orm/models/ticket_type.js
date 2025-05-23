import {DataTypes} from 'sequelize';
import sequelize from '../database.js';

let ticket_type = sequelize.define('ticket_type', {
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

export default ticket_type;