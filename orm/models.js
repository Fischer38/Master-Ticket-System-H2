import sequelize from './database.js';
import user from './models/user.js';
import ticket_type from './models/ticket_type.js';
import ticket from './models/ticket.js';
import ticket_comment from './models/ticket_comment.js';
import ticket_history from './models/ticket_history.js';


export default {
    sequelize,
    user: user,
    ticket_type: ticket_type,
    ticket: ticket,
    ticket_comment: ticket_comment,
    ticket_history: ticket_history
};