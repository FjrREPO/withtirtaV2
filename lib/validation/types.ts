import { z } from "zod";
import { 
  articleCategorySchema, 
  articleSchema, 
  categorySchema,
  mediaItemSchema
} from "./schemas";

export type ArticleSchema = z.infer<typeof articleSchema>;

export type ArticleCategorySchema = z.infer<typeof articleCategorySchema>;

export type CategorySchema = z.infer<typeof categorySchema>;

export type MediaItemSchema = z.infer<typeof mediaItemSchema>;