import 'dotenv/config';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import userModel from '../models/user.model';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

const connectPassport = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID || '',
                clientSecret: GOOGLE_CLIENT_SECRET || '',
                callbackURL: GOOGLE_CALLBACK_URL
            },
            async (
                accessToken: any,
                refreshToken: any,
                profile: any,
                done: any
            ) => {
                const existUser = await userModel.findByProvider(
                    profile.id,
                    profile.provider
                );

                if (existUser) {
                    done(null, existUser);
                    return;
                }
                const newUser = await userModel.create(profile);

                return done(null, newUser);
            }
        )
    );

    passport.serializeUser(async (user: any, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (user: any, done) => {
        done(null, user);
    });
};

export default connectPassport;
