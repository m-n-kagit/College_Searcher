import {prisma} from '../lib/prisma';

export const compareColleges = async (collegeIds: string[]) => {
  if (!collegeIds || collegeIds.length === 0) {
    throw new Error('No college IDs provided for comparison');
  }

  return await prisma.college.findMany({
    where: {
      id: { in: collegeIds },
      isActive: true,
    },
    include: {
      courses: {
        where: { isActive: true },
        include: {
          placements: {
            orderBy: { year: 'desc' },
            take: 1, // Get the latest placement data for comparison
          },
        },
      },
    },
  });
};
