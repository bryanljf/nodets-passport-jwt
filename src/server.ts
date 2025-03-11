import express, { urlencoded } from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes';
import passport from 'passport';
import { localStrategy } from './middlewares/libs/passport-local';
import { bearerStrategy } from './middlewares/libs/passport-bearer';
import { jwtStrategy } from './middlewares/libs/passport-jwt';

const server = express();

server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended:true }));
server.use(express.json());
server.use(express.static(path.join(__dirname, '../public')));
passport.use(localStrategy);
passport.use(bearerStrategy);
passport.use(jwtStrategy);
server.use(passport.initialize());
server.use(router);

server.listen(process.env.PORT, () => {
    console.log(`Server running on: http://localhost:${process.env.PORT}`);
});