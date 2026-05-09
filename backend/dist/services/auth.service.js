import { prisma } from '../lib/prisma';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';
export const signup = async (data) => {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser)
        throw new Error('User already exists');
    const hashedPassword = await hashPassword(data.password);
    const user = await prisma.user.create({
        data: { email: data.email, password: hashedPassword },
        select: { id: true, email: true }
    });
    const token = generateToken({ userId: user.id });
    return { user, token };
};
export const login = async (data) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user)
        throw new Error('Invalid credentials');
    const isMatch = await comparePassword(data.password, user.password);
    if (!isMatch)
        throw new Error('Invalid credentials');
    const token = generateToken({ userId: user.id });
    return {
        user: { id: user.id, email: user.email },
        token
    };
};
//# sourceMappingURL=auth.service.js.map