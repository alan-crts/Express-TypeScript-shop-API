import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from "passport-jwt";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(options, async (payload: JwtPayload, done: VerifiedCallback) => {
        try {
            if (payload.user) {
                return done(null, payload.user);
            }

            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    })
);