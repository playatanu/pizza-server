import 'dotenv/config';
import passport, { Profile } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import userModel, { IProvider, IUser } from '../models/user.model';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

const connectPassport = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: GOOGLE_CALLBACK_URL
            },
            async (
                accessToken: string,
                refreshToken: string,
                profile: Profile,
                done: CallableFunction
            ) => {
                const user = googleToUser(profile);

                const provider: IProvider = user.providers[0];

                const existUser = await userModel.findByProvider(provider);

                if (existUser) {
                    done(null, existUser.id);
                    return;
                }

                const newUser = await userModel.create(user);

                return done(null, newUser.id);
            }
        )
    );

    passport.serializeUser(async (id: object, done) => {
        done(null, id);
    });

    passport.deserializeUser(async (id: IUser, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const googleToUser = (profile: Profile | any): IUser => {
    return <IUser>{
        name: profile.displayName,
        photo: profile.photos[0].value,
        providers: [{ id: profile.id, name: profile.provider }]
    };
};

export default connectPassport;
