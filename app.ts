import express from 'express';
import { Router } from "express"
import bodyParser from 'body-parser';
import passport from 'passport';
import eventRequest from './router/Event/eventprompt';
import signupRequest from './router/Auth/userSignup';
import passportConfig from './config/passport';
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
import rateLimit from 'express-rate-limit';


const store = new (connectPgSimple(expressSession))({
    conObject: {
        connectionString: process.env.DATABASE_URL,
    },
    tableName: 'session',
});




   const server = express();
   const allowedUrl = process.env.FRONT_API_URL || "https://orbit-front-web.fly.dev" 



    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(express.static('public'));
    server.use(cors({
        origin: allowedUrl,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }));

    // server.use(cors())

    server.use(express.json())
    // server.disable('view cache');

    server.use(
        expressSession({
            secret: `${process.env.SESSION_KEY}`,
            store: store,
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
                
            },
        })
    );

    // Rate limiter for authenticated User 
    const authlimiter = rateLimit({
        windowMs: 15 * 60 * 1000, 
        limit: 100,
        standardHeaders: 'draft-8',
        legacyHeaders: false

    })
    // Rate limiter for Unauthenticated User
    const unAuthlimiter = rateLimit({
        windowMs: 15 * 60 * 1000, 
        limit: 10,
        standardHeaders: 'draft-8',
        legacyHeaders: false

    })
    server.use(passport.initialize());
    server.use(passport.session());

    passportConfig(passport);
    initializeApp(config.firebaseConfig);
   

    // API endpoints
    server.use('/api/events', authlimiter, eventRequest);
    server.use('/api/signUpAcc',unAuthlimiter, signupRequest);
    server.use('/api/login', unAuthlimiter, loginReq);
    server.use('/api/login-token',unAuthlimiter,LoginToken)
    server.use('/api/logout', unAuthlimiter,logoutReq);
    server.use('/api/user', authlimiter, userProfilePicture);
    server.use('/user/c', authlimiter, userAuthCheck);
    server.use('/api/search', authlimiter, searchUserReq);
    server.use('/api/userTouser', authlimiter,  userFollowUser);
    server.use('/api/explore', authlimiter, exploreEvents);
    server.use('/api/JoinEvent', authlimiter, userJoinEvent);
    server.use('/api/DisplayJoinedEvent', authlimiter, displayUserJoinEvent);
    server.use('/api/searchforclosefriends', authlimiter, searchForCloseFriend);
    server.use('/api/invite', authlimiter, inviteCloseFriends);
    server.use('/api/notifications', authlimiter, userNotifications);
    server.use('/api/userInterest', authlimiter,  userInterestDatarouter)
    server.use('/api/eventCategory', authlimiter, userCategoryEventReq)
    server.use('/api/favorEventMobile',authlimiter, userFavorEventReqMob)
    server.use('/api/newExploreEventData',authlimiter, newExploreEventData)
    server.use('/api/uploadUserBackground',authlimiter, uploadUserBackground)
    server.use('/api/userData', authlimiter, UserDataMobile)
    server.use('/api/userQRRequest',authlimiter, userQRRequest)
    server.use('/api/userProfilePictureMobileUpload', authlimiter, uploadMobileUserProfilePicture);
    server.use('/api/uploadGifBgMobile', authlimiter, uploadUserGifBgMobile);

    




    const stringPort = process.env.WEB_PORT as string 
    const port: number = parseInt(stringPort, 10) 
    const host = process.env.WEB_HOST as string




    server.listen(port, host,(err?: Error) => {
        if (err) throw err;
        console.log(`Ready on http://localhost:${port}`);
    });


export default server