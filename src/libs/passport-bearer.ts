import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { findUserByToken } from '../services/user';
import { RequestHandler } from 'express';
import passport from 'passport';
import { TypeUser } from '../models/User';

export const bearerStrategy = new BearerStrategy(async (token, done) => {
    console.log('token', token);
    const user = await findUserByToken(token);

    if(user) {
        return done(null, user);
    }else {
        return done(null, false);
    }
});

export const bearerStrategyAuth: RequestHandler = (req, res, next) => {
    const authRequest = passport.authenticate('bearer', (err:any, user: TypeUser | false) => {
        if(user){
            req.user = user;
            return next();
        }

        return res.status(401).json({ error:'Unauthorized' });
    });
    authRequest(req, res, next);
}