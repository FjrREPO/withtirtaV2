import { z } from 'zod';

export const MediaTypeEnum = z.enum(['VIDEO', 'PHOTO']);

export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  drivePath: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const mediaItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  type: MediaTypeEnum,
  filePath: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
  categoryId: z.string().uuid(),
});

export const articleCategorySchema = z.object({
  id: z.string().cuid(), 
  name: z.string().min(1, 'Category name is required'),
  createdAt: z.date(),
  updatedAt: z.date(),
  articles: z.array(z.object({
    id: z.string().cuid(),
  })).optional(),
});

export const articleSchema = z.object({
  id: z.string().cuid().optional(),  
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
  thumbnail: z.string().url().optional(),
  published: z.boolean().default(false),
  categories: z.array(
    z.object({
      categoryId: z.string().cuid(), 
      category: articleCategorySchema.optional(),  
    })
  ).min(1, 'At least one category is required'),
  createdAt: z.date(),
  updatedAt: z.date(),
});