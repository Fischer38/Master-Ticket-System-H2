import { Router } from 'express';
import bcrypt from 'bcryptjs';

import Models from "../orm/models.js";

let router = Router();

router.get('/', (req, res) => {
    res.render('sign.ejs')
})

router.post('/signIn', async (req, res) => {
    let {username, password} = req.body;
    let user = await Models.user.findOne({where: {username}});
    if(!user) {
        return res.render('sign.ejs', {error: 'User not found'});
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {}
})

router.post('/signUp', async (req, res) => {
    let {username, email, password} = req.body;
    let user = await Models.user.findOne({where: {username}});
    if(user) {
        return res.render('register.ejs', {error: 'Username already exists'});
    }
    user = await Models.user.create({username, email, password});
    req.session.user = user;
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})


export default router;