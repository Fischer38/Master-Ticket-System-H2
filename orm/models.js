import sequelize from './database.js';
import USER from './models/USER.js';
import TICKET from './models/TICKET.js';
import TICKET_TYPE from './models/TICKET_TYPE.js';
import TICKET_COMMENT from './models/TICKET_COMMENT.js';
import TICKET_HISTORY from './models/TICKET_HISTORY.js';


export default {
    sequelize,
    USER,
    TICKET_TYPE,
    TICKET,
    TICKET_COMMENT,
    TICKET_HISTORY
};