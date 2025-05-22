import {DataTypes} from 'sequelize';
import sequelize from '../database.js';

let TICKET_COMMENT = sequelize.define('TICKET_COMMENT', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TICKET',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'USER',
        }
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        size: 1000
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
})

export default TICKET_COMMENT;