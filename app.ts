import express from 'express';
import { Router } from "express"
const router = Router()
import { Application } from 'express';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dev from 'process';
import passport from 'passport';
import eventRequest from './router/Event/eventprompt';
import signupRequest from './router/Auth/userSignup';
import passportConfig from './config/passport';
import isAuth from './Middlware/Auth/isAuth';
import loginReq from './router/Auth/userLogin';
import LoginToken from './router/Auth/loginToken'
import connectPgSimple from 'connect-pg-simple';
import cors from 'cors';
import logoutReq from './router/Auth/userLogout';
import userProfilePicture from './router/user/userInfos';
import { initializeApp } from 'firebase/app';
import config from './config/firebase';
import searchUserReq from './router/user/userSearch';
import userFollowUser from './router/user/userToUser';
import exploreEvents from './router/Event/exploreEvents'
import userJoinEvent from './router/Event/userJoinEvent';
import displayUserJoinEvent from './router/Event/displayJoinedEvents';
import searchForCloseFriend from './router/user/userClosefriends';
import inviteCloseFriends from './router/user/invitefriends';
import userNotifications from './router/user/userNotifications'; 
import userInterestDatarouter from './router/user/userInterestData'
import userCategoryEventReq from './router/Event/userCategory'
import userFavorEventReqMob from './router/Event/favorEventMobile'
import newExploreEventData from './router/Event/newExploreData'
import uploadUserBackground from './router/user/userGifbg'
import UserDataMobile from './router/user/userDataMobile'
import userQRRequest from './router/user/userQrRequest'
import expressSession from "express-session";
import uploadMobileUserProfilePicture from './router/user/userProfilePictureMobileUpload'
import uploadUserGifBgMobile from './router/user/userGifBgMobile'
import userAuthCheck from './router/Auth/userCheck'



const store = new (connectPgSimple(expressSession))({
    conObject: {
        connectionString: process.env.DATABASE_URL,
    },
    tableName: 'session',
});


// const devEnv = process.env.NODE_ENV !== 'production';
// const app = next({ dev: devEnv});
// const handle = app.getRequestHandler();

   const server = express();



    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(express.static('public'));
    server.use(cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }));
    // server.options('*', cors({
    //     origin: 'http://localhost:3000',
    //     credentials: true,
    //   }));
    server.use(express.json())
    server.disable('view cache');

    server.use(
        expressSession({
            secret: 'mysecretTestkey',
            store: store,
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
                
            },
        })
    );

    server.use(passport.initialize());
    server.use(passport.session());

    passportConfig(passport);
    initializeApp(config.firebaseConfig);
    // getStorage(fireapp)
    // getFirestore(fireapp)

    // API endpoints
    server.use('/api/events', eventRequest);
    server.use('/api/signUpAcc', signupRequest);
    server.use('/api/login', loginReq);
    server.use('/api/login-token',LoginToken)
    server.use('/api/logout', logoutReq);
    server.use('/api/user', userProfilePicture);
    server.use('/user/c', userAuthCheck);
    server.use('/api/search', searchUserReq);
    server.use('/api/userTouser', userFollowUser);
    server.use('/api/explore', exploreEvents);
    server.use('/api/JoinEvent', userJoinEvent);
    server.use('/api/DisplayJoinedEvent', displayUserJoinEvent);
    server.use('/api/searchforclosefriends', searchForCloseFriend);
    server.use('/api/invite', inviteCloseFriends);
    server.use('/api/notifications', userNotifications);
    server.use('/api/userInterest', userInterestDatarouter)
    server.use('/api/eventCategory', userCategoryEventReq)
    server.use('/api/favorEventMobile', userFavorEventReqMob)
    server.use('/api/newExploreEventData', newExploreEventData)
    server.use('/api/uploadUserBackground', uploadUserBackground)
    server.use('/api/userData', UserDataMobile)
    server.use('/api/userQRRequest', userQRRequest)
    server.use('/api/userProfilePictureMobileUpload', uploadMobileUserProfilePicture);
    server.use('/api/uploadGifBgMobile', uploadUserGifBgMobile);

    





    const port = 5000;



    server.listen(port, '::',(err?: Error) => {
        if (err) throw err;
        console.log(`Ready on http://localhost:${port}`);
    });


export default server