import { Router } from 'express';
import { handleSignup, handleLogin, handleLogout } from '../controller/auth.controller';
import { validate } from '../middleware/validate.middleware'; // Only one import needed
import { signupSchema, loginSchema } from '../validations/auth.validation';
const authRoutes = Router();
authRoutes.post('/signup', validate(signupSchema), handleSignup);
authRoutes.post('/login', validate(loginSchema), handleLogin);
authRoutes.post('/logout', handleLogout);
export default authRoutes;
//# sourceMappingURL=auth.routes.js.map