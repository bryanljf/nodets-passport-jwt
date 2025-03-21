import { Strategy as LocalStrategy }from 'passport-local';
import { createUserToken, findUserByEmailAndPassword } from '../../services/user';
import { RequestHandler } from 'express';
import passport from 'passport';
import { TypeUser } from '../../models/User';

type LocalStrategyResponse = {
    auth: {
        token : string
    },
    user: TypeUser
}

export const localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    let user = await findUserByEmailAndPassword(email, password);
    
    if (user){
        const token = createUserToken(user);
        const response: LocalStrategyResponse = {
            auth: { token },
            user
        }
        return done(null, response);
    }else {
        return done(null, false);
    }
});

export const localStrategyAuth: RequestHandler = (req, res, next) => {
    const authRequest = passport.authenticate('local', 
        (err: any, response: LocalStrategyResponse | false) => {
            if(response){
                req.user = response.user;
                req.authInfo = response.auth;
                return next();
            }
            return res.status(401).json({ error:'Unauthorized' });
        });
    authRequest(req, res, next);
}