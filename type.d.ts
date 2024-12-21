interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  thumbnail: string;
  published: boolean;
  categories: ArticleCategory[];
  createdAt: Date;
  updatedAt: Date;
}

interface ArticleCategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ArticleFormData {
  title: string;
  content: string;
  author: string;
  thumbnail: string;
  published: boolean;
  categoryIds: string[];
}