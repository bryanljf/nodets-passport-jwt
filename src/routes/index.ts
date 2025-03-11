import Router from 'express';
import { localStrategyAuth } from '../libs/passport-local';
import { bearerStrategyAuth } from '../libs/passport-bearer';
import { jwtStrategyAuth } from '../libs/passport-jwt';

const router = Router();

router.post('/login', localStrategyAuth, async (req, res) => {
    res.json({
        user: req.user,
        auth: req.authInfo
    });
});

router.get('/private', bearerStrategyAuth, async (req, res) => {
    res.json({ msg:'OK' });
});

router.get('/privatejwt', jwtStrategyAuth, async (req, res) => {
    res.json({ msg:'Acessou o JWT' });
});

export default router;