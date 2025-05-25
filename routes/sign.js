import { Router } from 'express';
import bcrypt from 'bcryptjs';

import Models from "../orm/models.js";

let router = Router();

router.get('/', (req, res) => {
    if(req.session.username) {
        return res.redirect('/home');
    }
    res.render('sign.ejs')
})

router.post('/signIn', async (req, res) => {
    let {user, pass} = req.body;

    if(!user || !pass) {
        return res.status(400).json({message: 'Missing username or password'});
    }

    let userDB = await Models.user.findOne({where: {username: user}});
    if(!userDB) {
        return res.status (404).json({message: 'User not found'});
    }

    let isMatch = await bcrypt.compare(pass, userDB.password);

    if(!isMatch) {
        return res.status(401).json({message: 'Wrong password'});
    }

    req.session.userid = userDB.id;
    req.session.username = userDB.username;
    req.session.role = userDB.role;

    return res.status(200).json({message: 'Sign in successful'});
})

router.post('/signUp', async (req, res) => {
    let {user, email, pass, passRepeat} = req.body;

    if(!user || !email || !pass || !passRepeat) {
        return res.status(400).json({message: 'Missing username, email, password or confirm password'});
    }

    if(user.length <= 3) {
        return res.status(400).json({message: 'Username must be at least 3 characters long'});
    }

    let userDB = await Models.user.findOne({where: {username: user}});
    if(userDB) {
        return res.status(400).json({message: 'Username already exists'});
    }

    if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return res.status(400).json({message: 'Invalid email'});
    }

    let emailDB = await Models.user.findOne({where: {email: email}});
    if(emailDB) {
        return res.status(400).json({message: 'Email already exists'});
    }

    if(pass.length < 8) {
        return res.status(400).json({message: 'Password must be at least 8 characters long'});
    }

    if(pass.match(/[a-z]/i) === null) {
        return res.status(400).json({message: 'Password must contain at least one lowercase letter'});
    }

    if(pass.match(/[A-Z]/i) === null) {
        return res.status(400).json({message: 'Password must contain at least one uppercase letter'});
    }

    if(pass.match(/[a-zA-Z]/i) === null) {
        return res.status(400).json({message: 'Password must contain at least one letter'});
    }

    if(pass.match(/[0-9]/i) === null) {
        return res.status(400).json({message: 'Password must contain at least one number'});
    }

    if(pass !== passRepeat) {
        return res.status(400).json({message: 'Passwords do not match'});
    }

    let hashedPass = await bcrypt.hash(pass, 10);
    await Models.user.create({username: user, email: email, password: hashedPass, role: 'user'});

    req.session.userid = userDB.id;
    req.session.username = userDB.username;
    req.session.role = userDB.role;

    return res.status(201).json({message: 'Sign up successful'});
})

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})


export default router;