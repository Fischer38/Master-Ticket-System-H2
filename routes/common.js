import { Router } from 'express';

let router = Router();

router.get('/', (req, res) => {
    res.render('index.ejs', { userid: req.session.userid, username: req.session.username, role: req.session.role });
});

export default router;