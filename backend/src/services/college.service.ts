import {prisma} from '../lib/prisma';
import { CollegeQueryDTO } from '../validations/college.validation';

export const getAllColleges = async (query: CollegeQueryDTO) => {
  const { name, location, minFees, maxFees, page, limit } = query;
  const skip = (page - 1) * limit;

  // Build the filter object dynamically
  const where: any = { isActive: true };

  if (name) where.name = { contains: name, mode: 'insensitive' };
  if (location) where.location = { contains: location, mode: 'insensitive' };
  
  // Filtering based on nested course fees
  if (minFees || maxFees) {
    where.courses = {
      some: {
        fees: {
          gte: minFees || 0,
          lte: maxFees || 2147483647, // Max Int
        },
      },
    };
  }

  const [colleges, total] = await Promise.all([
    prisma.college.findMany({
      where,
      skip,
      take: limit,
      include: {
        courses: { select: { name: true, fees: true } } // Preview of courses
      },
      orderBy: { overallRating: 'desc' },
    }),
    prisma.college.count({ where }),
  ]);

  return {
    colleges,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getCollegeById = async (id: string) => {
  const college = await prisma.college.findUnique({
    where: { id },
    include: {
      courses: {
        include: { placements: true, cutoffs: true }
      },
      reviews: { take: 5, orderBy: { createdAt: 'desc' } }
    },
  });

  if (!college) throw new Error('College not found');
  return college;
};

export const searchColleges = async (name: string) => {
  return await prisma.college.findMany({
    where: {
      name: { contains: name, mode: 'insensitive' },
      isActive: true,
    },
    select: { id: true, name: true, location: true }, // Lightweight for search bar
    take: 10,
  });
};

export const getCoursesByCollegeId = async (collegeId: string) => {
  return await prisma.course.findMany({
    where: { collegeId, isActive: true },
    include: { placements: true }, // Include stats for comparison
  });
};

export const getReviewsByCollegeId = async (collegeId: string) => {
  return await prisma.review.findMany({
    where: { collegeId },
    include: { 
      user: { select: { email: true } },
      course: { select: { name: true } } 
    },
    orderBy: { createdAt: 'desc' },
  });
};
