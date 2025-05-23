import { Router } from 'express';

let router = Router();

router.get('/', (req, res) => {
    res.render('index.ejs', { username: req.session.username });
});

export default router;