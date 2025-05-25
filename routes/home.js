import { Router } from 'express';
import bcrypt from 'bcryptjs';

import Models from "../orm/models.js";

let router = Router();

router.get('/', (req, res) => {
    if(!req.session.username) {
        return res.redirect('/sign');
    }
    res.render('home.ejs', { userid: req.session.userid, username: req.session.username, role: req.session.role })
})

router.get('/loadNav', (req, res) => {
    res.json([
        { id: 'dashboard', text: 'Dashboard' },
        { id: 'ticketTypes', text: 'Ticket Types' },
        { id: 'newTicket', text: 'Opret Ticket' },
        { id: 'ticketList', text: 'Mine Tickets' }
    ]);
})

router.get('/loadMain/:type', async (req, res) => {
    const type = req.params.type;
    console.log(type);

    switch (type) {
        case 'newTicket':
            res.render('partial/newTicket.ejs');
            break;
        case 'ticketList':
            res.render('partial/ticketList.ejs');
            break;
        default:
            res.render('partial/test.ejs');
    }
    return;

    if(req.session.role === 'admin') {
        res.render('partial/newTicket.ejs');
    }
    else {
        res.render('partial/test.ejs');
    }
})

export default router;