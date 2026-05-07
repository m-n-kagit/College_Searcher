import {prisma} from '../lib/prisma';
import { CreateReviewDTO } from '../validations/review.validation';

export const createReview = async (userId: string, data: CreateReviewDTO) => {
  return await prisma.review.create({
    data: {
      ...data,
      userId,
    },
  });
};

export const getReviewById = async (id: string) => {
  const review = await prisma.review.findUnique({
    where: { id },
    include: { user: { select: { email: true } } }
  });
  if (!review) throw new Error('Review not found');
  return review;
};

export const deleteReview = async (id: string, userId: string) => {
  const review = await prisma.review.findUnique({ where: { id } });
  
  if (!review) throw new Error('Review not found');
  if (review.userId !== userId) throw new Error('Unauthorized to delete this review');

  return await prisma.review.delete({ where: { id } });
};
