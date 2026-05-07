import { prisma } from '../lib/prisma.js';
export const createReview = async (userId, data) => {
    return await prisma.review.create({
        data: {
            ...data,
            userId,
        },
    });
};
export const getReviewById = async (id) => {
    const review = await prisma.review.findUnique({
        where: { id },
        include: { user: { select: { email: true } } }
    });
    if (!review)
        throw new Error('Review not found');
    return review;
};
export const deleteReview = async (id, userId) => {
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review)
        throw new Error('Review not found');
    if (review.userId !== userId)
        throw new Error('Unauthorized to delete this review');
    return await prisma.review.delete({ where: { id } });
};
//# sourceMappingURL=review.service.js.map