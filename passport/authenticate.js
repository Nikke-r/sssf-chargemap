import passport from "./strategies.js";
import jwt from 'jsonwebtoken';

export const login = (req, res) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('local', { session: false }, async (error, user, info) => {
            try {
                if (error || !user) reject(info.message);

                req.login(user, { session: false }, async error => {
                    if (error) reject(error);

                    const token = jwt.sign(user, process.env.JWT_SECRET);

                    resolve({ user, token });
                })
            } catch (error) {
                reject({ message: error.message });
            }
        })(req, res);
    });
};

export const checkAuthentication = (req, res) => {
    return new Promise((resolve, _) => {
        passport.authenticate('jwt', (error, user) => {
            if (error || !user) resolve(false);

            resolve(user);
        })(req, res);
    });
};