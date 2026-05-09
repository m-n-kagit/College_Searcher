import { prisma } from '../lib/prisma';
export const getCourseById = async (id) => {
    const course = await prisma.course.findUnique({
        where: { id },
        include: { college: { select: { name: true, location: true } } }
    });
    if (!course)
        throw new Error('Course not found');
    return course;
};
export const getCoursePlacements = async (courseId) => {
    return await prisma.placement.findMany({
        where: { courseId },
        orderBy: { year: 'desc' }
    });
};
export const getCourseReviews = async (courseId) => {
    return await prisma.review.findMany({
        where: { courseId },
        include: { user: { select: { email: true } } },
        orderBy: { createdAt: 'desc' }
    });
};
export const getCourseCutoffs = async (courseId) => {
    return await prisma.cutoff.findMany({
        where: { courseId },
        orderBy: { closingRank: 'asc' }
    });
};
//# sourceMappingURL=course.service.js.map