"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const authService_1 = require("../services/authService");
// Configure Passport Local Strategy
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'username',
    passwordField: 'password',
}, async (username, password, done) => {
    try {
        const user = await authService_1.AuthService.authenticate({ username, password });
        if (!user) {
            return done(null, false, { message: 'Invalid username or password' });
        }
        return done(null, {
            id: user.id,
            username: user.username,
        });
    }
    catch (err) {
        return done(err);
    }
}));
// Serialize user for session
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
// Deserialize user from session
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await authService_1.AuthService.getUserById(id);
        if (!user) {
            return done(null, false);
        }
        done(null, {
            id: user.id,
            username: user.username,
        });
    }
    catch (err) {
        done(err);
    }
});
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map