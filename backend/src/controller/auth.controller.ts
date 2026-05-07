import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

const COOKIE_OPTIONS = {
  httpOnly: true, // Prevents JS access
  secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
  sameSite: 'lax' as const, // Protection against CSRF
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

export const handleSignup = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authService.signup(req.body);
    
    res.cookie('token', token, COOKIE_OPTIONS)
       .status(201)
       .json({ success: true, data: { user } });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authService.login(req.body);

    res.cookie('token', token, COOKIE_OPTIONS)
       .status(200)
       .json({ success: true, data: { user } });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const handleLogout = (req: Request, res: Response) => {
  res.clearCookie('token')
     .status(200)
     .json({ success: true, message: "Logged out successfully" });
};