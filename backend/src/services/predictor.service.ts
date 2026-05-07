import {prisma} from '../lib/prisma';
import { PredictorDTO } from '../validations/predictor.validation';

export const getAllCutoffs = async () => {
  return await prisma.cutoff.findMany({
    include: {
      course: {
        include: { college: { select: { name: true } } }
      }
    },
    take: 100 // Limit for performance
  });
};

export const predictColleges = async (data: PredictorDTO) => {
  const { rank, examName, category } = data;

  // Logic: Find courses where the user's rank is LESS THAN OR EQUAL to the closing rank
  return await prisma.cutoff.findMany({
    where: {
      examName: { equals: examName, mode: 'insensitive' },
      category: { equals: category, mode: 'insensitive' },
      closingRank: { gte: rank }, // User rank 500 is eligible if closing rank was 1000
    },
    include: {
      course: {
        include: {
          college: true,
          placements: { take: 1, orderBy: { year: 'desc' } }
        }
      }
    },
    orderBy: {
      closingRank: 'asc' // Show "hardest to get into" first
    }
  });
};
