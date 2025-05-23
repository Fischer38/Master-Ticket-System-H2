import {DataTypes} from 'sequelize';
import sequelize from '../database.js';

let ticket_history = sequelize.define('ticket_history', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tickets',
            key: 'id'
        }
    },
    changed_field: {
        type: DataTypes.STRING,
        allowNull: false,
        size: 100
    },
    changed_from: {
        type: DataTypes.STRING,
        allowNull: false,
        size: 100
    },
    changed_to: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    changed_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    changed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
})

export default ticket_history;