import {DataTypes} from 'sequelize';
import sequelize from '../database.js';

let ticket = sequelize.define('ticket', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ticket_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ticket_types',
            key: 'id'
        }
    },
    assigned_user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
        size: 100
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        size: 1000
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
    },
    status: {
        type: DataTypes.ENUM('open', 'closed', 'in progress'),
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
})

export default ticket;