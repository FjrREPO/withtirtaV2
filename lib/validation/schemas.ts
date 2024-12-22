import { z } from 'zod';

export const MediaTypeEnum = z.enum(['VIDEO', 'PHOTO']);

const catMedia = z.object({
  id: z.string().uuid(),
  name: z.string(),
  drivePath: z.string().url(),
  createdAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  updatedAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export const mediaItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(["PHOTO", "VIDEO"]),
  filePath: z.string().url(),
  createdAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  updatedAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  categoryId: z.string().uuid(),
  category: catMedia,
});

const medCategory = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(["PHOTO", "VIDEO"]),
  filePath: z.string().url(),
  createdAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  updatedAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  categoryId: z.string().uuid(),
});

export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  drivePath: z.string().url(),
  createdAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  updatedAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  mediaItems: z.array(medCategory),
});

const artCategory = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  author: z.string(),
  thumbnail: z.string().url(),
  published: z.boolean(),
  createdAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  updatedAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export const articleCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  updatedAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  articles: z.array(artCategory), 
});

const catArticle = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  updatedAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export const articleSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  author: z.string(),
  thumbnail: z.string().url(),
  published: z.boolean(),
  createdAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  updatedAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  categories: z.array(catArticle), 
});