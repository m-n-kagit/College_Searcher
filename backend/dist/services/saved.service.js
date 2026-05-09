import { prisma } from '../lib/prisma';
export const getSavedColleges = async (userId) => {
    // We query the SavedItem table and "include" the college details
    const savedItems = await prisma.savedItem.findMany({
        where: { userId },
        include: {
            college: {
                select: {
                    id: true,
                    name: true,
                    location: true,
                    overallRating: true,
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
    return savedItems.map(item => item.college);
};
export const saveCollege = async (userId, collegeId) => {
    // Check if college exists first
    const college = await prisma.college.findUnique({ where: { id: collegeId } });
    if (!college)
        throw new Error('College not found');
    // Create the link (@@unique constraint in schema prevents duplicates)
    return await prisma.savedItem.create({
        data: { userId, collegeId }
    });
};
export const unsaveCollege = async (userId, collegeId) => {
    // We use deleteMany because we don't have the SavedItem ID, only the composite keys
    const deleted = await prisma.savedItem.deleteMany({
        where: { userId, collegeId }
    });
    if (deleted.count === 0)
        throw new Error('Saved item not found');
    return true;
};
//# sourceMappingURL=saved.service.js.map